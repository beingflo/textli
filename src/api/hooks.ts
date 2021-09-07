import { handleException } from '.';
import { decrypt_note, encrypt_note, KeyMaterial } from '../components/crypto';
import { getMetadata } from '../components/util';
import { useAppDispatch } from '../context';
import { setCurrentNote, useCurrentNote } from '../context/currentNoteReducer';
import { useAppEditor } from '../context/editorReducer';
import { setNoteList } from '../context/noteListReducer';
import { setNoteStatus, useNoteStatus } from '../context/noteStatusReducer';
import { NoteListItem, NoteListItemDto, NoteStatus } from '../types';
import { get_note, get_notes, save_note, update_note } from './note_api';

export const useGetNote = (): ((id: string) => Promise<void>) => {
  const dispatch = useAppDispatch();
  const editor = useAppEditor();

  return async (id: string) => {
    setNoteStatus(NoteStatus.INPROGRESS, dispatch);
    const note = await get_note(id).catch(handleException);
    setNoteStatus(NoteStatus.SYNCED, dispatch);

    if (!note) {
      return;
    }

    const key: KeyMaterial = JSON.parse(note?.key);

    const decrypted_note = await decrypt_note(
      key,
      note?.metadata,
      note?.content
    );

    const parsedMetadata = JSON.parse(decrypted_note?.metadata ?? '');

    setCurrentNote(
      {
        key,
        id: note?.id,
        created_at: note?.created_at,
        modified_at: note?.modified_at,
        public: note?.public,
        metadata: parsedMetadata,
        content: decrypted_note?.content ?? '',
      },
      dispatch
    );
    editor?.commands.focus();
  };
};

export const useSaveNote = (): (() => Promise<void>) => {
  const dispatch = useAppDispatch();
  const getNoteList = useGetNoteList();
  const editor = useAppEditor();
  const noteStatus = useNoteStatus();
  const currentNote = useCurrentNote();

  return async () => {
    editor?.commands?.focus();

    const content = editor?.getHTML() ?? '';
    const metadata = getMetadata(content);

    // No changes to be saved
    if (noteStatus === NoteStatus.SYNCED) {
      return;
    }

    const encrypted_note = await encrypt_note(content, metadata);

    const request = {
      metadata: encrypted_note?.encrypted_metadata,
      key: JSON.stringify(encrypted_note?.key),
      public: false,
      content: encrypted_note?.encrypted_content,
    };

    setNoteStatus(NoteStatus.INPROGRESS, dispatch);

    if (!currentNote) {
      // New note
      const result = await save_note(request).catch((error) => {
        setNoteStatus(NoteStatus.SYNCED, dispatch);
        handleException(error);
      });
      if (result) {
        setCurrentNote(
          {
            content,
            metadata: JSON.parse(metadata),
            key: encrypted_note?.key,
            public: false,
            ...result,
          },
          dispatch
        );
      }
    } else {
      // Existing note
      const result = await update_note(currentNote?.id ?? '', request).catch(
        (error) => {
          setNoteStatus(NoteStatus.SYNCED, dispatch);
          handleException(error);
        }
      );

      if (result) {
        setCurrentNote(
          {
            created_at: currentNote?.created_at,
            content,
            metadata: JSON.parse(metadata),
            key: encrypted_note?.key,
            public: currentNote?.public,
            ...result,
          },
          dispatch
        );
      }
    }
    // TODO put result into list so it doesn't have to be refetched
    getNoteList();
    setNoteStatus(NoteStatus.SYNCED, dispatch);
  };
};

export const useGetNoteList = (): (() => Promise<void>) => {
  const dispatch = useAppDispatch();

  return async () => {
    const encrypted_notes = await get_notes().catch(handleException);

    if (!encrypted_notes) {
      return;
    }

    const notes = await Promise.all(
      encrypted_notes.map(
        async (note: NoteListItemDto): Promise<NoteListItem> => {
          const key = JSON.parse(note?.key);
          const decrypted_note = await decrypt_note(key, note?.metadata);

          const parsedMetadata = JSON.parse(decrypted_note?.metadata ?? '');

          return {
            key,
            id: note?.id,
            created_at: note?.created_at,
            modified_at: note?.modified_at,
            public: note?.public,
            metadata: parsedMetadata,
          };
        }
      )
    );

    const sortedNotes = notes?.sort((a, b) => {
      const dateA = new Date(a?.modified_at);
      const dateB = new Date(b?.modified_at);

      if (dateA < dateB) {
        return 1;
      } else if (dateA > dateB) {
        return -1;
      }
      return 0;
    });

    setNoteList(sortedNotes, dispatch);
  };
};
