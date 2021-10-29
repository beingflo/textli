import { useAtom } from 'jotai';
import React from 'react';
import { delete_share, list_shares } from '../../../api/share_api';
import { sharesState, useAppDispatch } from '../../../context';
import { useNoteList } from '../../../context/noteListReducer';
import { AddIcon, EditIcon } from '../../../icons';
import { NoteListItem, Share } from '../../../types';

export const Publications = (): React.ReactElement => {
  const dispatch = useAppDispatch();
  const [shares, setShares] = useAtom(sharesState);
  const noteList = useNoteList();

  const getPublicationsInfo = React.useMemo(() => {
    const matchedPubs = shares
      .filter((share: Share) => share?.public)
      .map((share: Share) => {
        const note = noteList.find(
          (note: NoteListItem) => note?.id === share?.note
        );

        return {
          ...share,
          title: note?.metadata?.title,
          modified_at: note?.modified_at,
        };
      });

    return matchedPubs;
  }, [shares, noteList]);

  const unpublish = React.useCallback(
    (token: string) => {
      delete_share(token).then(() => {
        list_shares(setShares);
      });
    },
    [dispatch]
  );

  return (
    <>
      <ul className="space-y-4">
        {getPublicationsInfo?.map((share: any) => (
          <li key={share?.token} className="flex flex-col">
            <span className="truncate font-semibold">{share?.title}</span>
            <div className="flex justify-between">
              <div className="flex flex-col md:flex-row md:space-x-4">
                <div className="flex flex-row space-x-0.5">
                  <AddIcon className="h-4 w-4 self-center" />
                  <span className="text-gray-500">
                    {new Date(share?.created_at).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex flex-row space-x-1">
                  <EditIcon className="h-4 w-4 self-center" />
                  <span className="text-gray-500">
                    {share?.modified_at
                      ? new Date(share?.modified_at).toLocaleDateString()
                      : 'Never'}
                  </span>
                </div>
              </div>
              <button
                onClick={() => unpublish(share?.token)}
                className="text-yellow-400"
              >
                Unpublish
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Publications;
