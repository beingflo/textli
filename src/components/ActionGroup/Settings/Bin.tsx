import React from 'react';
import {
  get_deleted_notes,
  get_notes,
  undelete_note,
} from '../../../api/note_api';
import { useAppDispatch } from '../../../context';
import { DeletedNote } from '../../../types';

export const Bin = (): React.ReactElement => {
  const dispatch = useAppDispatch();

  const [deletedNotes, setDeletedNotes] = React.useState([]);
  React.useEffect(() => get_deleted_notes(setDeletedNotes), [setDeletedNotes]);

  const getProcessedNotes = React.useMemo(() => {
    const parsedNotes = deletedNotes?.map((note: DeletedNote) => ({
      ...note,
      ...JSON.parse(note?.metadata),
    }));

    return parsedNotes.sort((a: any, b: any) => {
      const dateA = new Date(a.deleted_at);
      const dateB = new Date(b.deleted_at);

      if (dateA < dateB) {
        return 1;
      } else if (dateA > dateB) {
        return -1;
      }
      return 0;
    });
  }, [deletedNotes]);

  const recover_note = React.useCallback(
    (id: string) => {
      const success = () => {
        get_deleted_notes(setDeletedNotes);
        get_notes(dispatch);
      };
      undelete_note(id, success);
    },
    [setDeletedNotes, dispatch]
  );

  return (
    <>
      <ul className="space-y-4">
        {getProcessedNotes?.map((note: any) => (
          <li key={note?.id} className="flex flex-col">
            <span className="truncate font-semibold">{note?.title}</span>
            <div className="flex justify-between">
              <span className="text-gray-500">
                {new Date(note?.deleted_at).toLocaleDateString()}
              </span>
              <button
                onClick={() => recover_note(note?.id)}
                className="text-yellow-400"
              >
                Recover
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Bin;
