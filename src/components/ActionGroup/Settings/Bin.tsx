import React from 'react';
import { useGetDeletedNoteList, useGetNoteList } from '../../../api/hooks';
import { undelete_note } from '../../../api/note_api';
import { BinIcon, FrownIcon, RefreshIcon } from '../../../icons';
import { NoteListItem } from '../../../types';

export const Bin = (): React.ReactElement => {
  const getNoteList = useGetNoteList();
  const getDeletedNoteList = useGetDeletedNoteList();

  const [deletedNotes, setDeletedNotes] = React.useState<Array<NoteListItem>>(
    []
  );

  React.useEffect(() => {
    getDeletedNoteList(setDeletedNotes);
  }, [setDeletedNotes]);

  const recover_note = (id: string) => {
    undelete_note(id).then(() => {
      getDeletedNoteList(setDeletedNotes);
      getNoteList();
    });
  };

  return (
    <>
      <ul className="space-y-4">
        {deletedNotes?.length === 0 ? (
          <div className="flex flex-col items-center text-gray-600">
            <FrownIcon className="w-10 h-10" />
            <div>Nothing here</div>
          </div>
        ) : (
          deletedNotes?.map((note: any) => (
            <li key={note?.id} className="flex flex-col">
              <span className="truncate font-semibold">
                {note?.metadata.title}
              </span>
              <div className="flex justify-between">
                <div className="flex flex-row space-x-1">
                  <BinIcon className="h-4 w-4 self-center" />
                  <span className="text-gray-500">
                    {new Date(note?.deleted_at).toLocaleDateString()}
                  </span>
                </div>
                <button onClick={() => recover_note(note?.id)}>
                  <RefreshIcon className="w-4 h-4" />
                </button>
              </div>
            </li>
          ))
        )}
      </ul>
    </>
  );
};

export default Bin;
