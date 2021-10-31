import { useAtom } from 'jotai';
import React from 'react';
import { delete_share, list_shares } from '../../../api/share_api';
import { getNoteListState, sharesState } from '../../state';
import { AddIcon, ClockIcon } from '../../../icons';
import { NoteListItem, Share } from '../../../types';

export const Shares = (): React.ReactElement => {
  const [shares, setShares] = useAtom(sharesState);
  const [noteList] = useAtom(getNoteListState);

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
        list_shares(setShares);
      });
    },
    []
  );

  return (
    <>
      <ul className="space-y-4">
        {getSharesInfo?.map((share: any) => (
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
                  <ClockIcon className="h-4 w-4 self-center" />
                  <span className="text-gray-500">
                    {share?.expires_at
                      ? new Date(share?.expires_at).toLocaleDateString()
                      : 'Never'}
                  </span>
                </div>
              </div>
              <button
                onClick={() => revoke_share(share?.token)}
                className="text-yellow-400"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Shares;
