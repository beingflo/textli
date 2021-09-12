import React from 'react';
import { delete_share, list_shares } from '../../../api/share_api';
import { useAppDispatch } from '../../../context';
import { useNoteList } from '../../../context/noteListReducer';
import { useShares } from '../../../context/sharesReducer';
import { NoteListItem, Share } from '../../../types';

export const Shares = (): React.ReactElement => {
  const dispatch = useAppDispatch();
  const shares = useShares();
  const noteList = useNoteList();

  const getSharesInfo = React.useMemo(() => {
    const matchedShares = shares.map((share: Share) => {
      const title = noteList.find(
        (note: NoteListItem) => note?.id === share?.note
      )?.metadata?.title;

      return { ...share, title };
    });

    return matchedShares;
  }, [shares, noteList]);

  const revoke_share = React.useCallback(
    (token: string) => {
      delete_share(token).then(() => {
        list_shares(dispatch);
      });
    },
    [dispatch]
  );

  return (
    <>
      <ul className="space-y-4">
        {getSharesInfo?.map((share: any) => (
          <li key={share?.token} className="flex flex-col">
            <span className="truncate font-semibold">{share?.title}</span>
            <div className="flex justify-between">
              <span className="text-gray-500">
                {new Date(share?.created_at).toLocaleDateString()}
              </span>
              <button
                onClick={() => revoke_share(share?.token)}
                className="text-yellow-400"
              >
                Revoke
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Shares;
