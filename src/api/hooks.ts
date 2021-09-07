import { handleException } from '.';
import { decrypt_note } from '../components/crypto';
import { useAppDispatch } from '../context';
import { setCurrentNote } from '../context/currentNoteReducer';
import { useAppEditor } from '../context/editorReducer';
import { setNoteStatus } from '../context/noteStatusReducer';
import { NoteStatus } from '../types';
import { get_note } from './note_api';

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

    const decrypted_note = await decrypt_note(
      note?.key,
      note?.metadata,
      note?.content
    );

    setCurrentNote({ ...note, ...decrypted_note }, dispatch);
    editor?.commands.focus();
  };
};
