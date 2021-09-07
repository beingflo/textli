import { handleException } from '.';
import { decrypt_note, encrypt_note, KeyMaterial } from '../components/crypto';
import { getMetadata, sortDeletedNotes, sortNotes } from '../components/util';
import { useAppDispatch } from '../context';
import { setCurrentNote, useCurrentNote } from '../context/currentNoteReducer';
import { useAppEditor } from '../context/editorReducer';
import { addToNoteList, setNoteList } from '../context/noteListReducer';
import { setNoteStatus, useNoteStatus } from '../context/noteStatusReducer';
import { setStatus } from '../context/statusReducer';
import {
  DeletedNoteListItem,
  DeletedNoteListItemDto,
  NoteListItem,
  NoteListItemDto,
  NoteStatus,
  Status,
} from '../types';
import {
  get_deleted_notes,
  get_note,
  get_notes,
  save_note,
  update_note,
} from './note_api';

export const useGetNote = (): ((id: string) => Promise<void>) => {
  const dispatch = useAppDispatch();
  const editor = useAppEditor();

  return async (id: string) => {
    setNoteStatus(NoteStatus.INPROGRESS, dispatch);
    const noteDto = await get_note(id).catch(handleException);
    setNoteStatus(NoteStatus.SYNCED, dispatch);

    if (!noteDto) {
      return;
    }

    const key: KeyMaterial = JSON.parse(noteDto?.key);

    const decrypted_note = await decrypt_note(
      key,
      noteDto?.metadata,
      noteDto?.content
    );

    const parsedMetadata = JSON.parse(decrypted_note?.metadata ?? '');

    const note = {
      key,
      id: noteDto?.id,
      created_at: noteDto?.created_at,
      modified_at: noteDto?.modified_at,
      public: noteDto?.public,
      metadata: parsedMetadata,
      content: decrypted_note?.content ?? '',
    };

    setCurrentNote(note, dispatch);
    addToNoteList(note, dispatch);

    editor?.commands.focus();
  };
};

export const useSaveNote = (): (() => Promise<void>) => {
  const dispatch = useAppDispatch();
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
        const note = {
          content,
          metadata: JSON.parse(metadata),
          key: encrypted_note?.key,
          public: false,
          ...result,
        };
        setCurrentNote(note, dispatch);
        addToNoteList(note, dispatch);
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
        const note = {
          created_at: currentNote?.created_at,
          content,
          metadata: JSON.parse(metadata),
          key: encrypted_note?.key,
          public: currentNote?.public,
          ...result,
        };
        setCurrentNote(note, dispatch);
        addToNoteList(note, dispatch);
      }
    }
    setNoteStatus(NoteStatus.SYNCED, dispatch);
  };
};

export const useGetNoteList = (): (() => Promise<void>) => {
  const dispatch = useAppDispatch();

  return async () => {
    const encrypted_notes = await get_notes().catch((error) => {
      handleException(error);
      setStatus(Status.REDIRECT, dispatch);
    });

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

    const sortedNotes = sortNotes(notes);

    setNoteList(sortedNotes, dispatch);
  };
};

export const useGetDeletedNoteList = (): ((
  setDeletedNotes: (notes: Array<DeletedNoteListItem>) => void
) => Promise<void>) => {
  return async (
    setDeletedNotes: (notes: Array<DeletedNoteListItem>) => void
  ) => {
    const encrypted_notes = await get_deleted_notes().catch(handleException);

    if (!encrypted_notes) {
      return;
    }

    const notes = await Promise.all(
      encrypted_notes.map(
        async (note: DeletedNoteListItemDto): Promise<DeletedNoteListItem> => {
          const key = JSON.parse(note?.key);
          const decrypted_note = await decrypt_note(key, note?.metadata);

          const parsedMetadata = JSON.parse(decrypted_note?.metadata ?? '');

          return {
            key,
            id: note?.id,
            created_at: note?.created_at,
            modified_at: note?.modified_at,
            deleted_at: note?.deleted_at,
            public: note?.public,
            metadata: parsedMetadata,
          };
        }
      )
    );

    const sortedNotes = sortDeletedNotes(notes);
    setDeletedNotes(sortedNotes);
  };
};
