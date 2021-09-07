import { handleException } from '.';
import { decrypt_note, KeyMaterial } from '../components/crypto';
import { useAppDispatch } from '../context';
import { setCurrentNote } from '../context/currentNoteReducer';
import { useAppEditor } from '../context/editorReducer';
import { setNoteList } from '../context/noteListReducer';
import { setNoteStatus } from '../context/noteStatusReducer';
import { NoteListItem, NoteListItemDto, NoteStatus } from '../types';
import { get_note, get_notes } from './note_api';

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
