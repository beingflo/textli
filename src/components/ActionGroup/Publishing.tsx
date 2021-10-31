import { Dialog, Transition } from '@headlessui/react';
import { useAtom } from 'jotai';
import React from 'react';
import { create_share, delete_share, list_shares } from '../../api/share_api';
import { getCurrentNoteState, sharesState } from '../context';
import { CloseIcon } from '../../icons';
import { Share } from '../../types';
import { exportKey, string2arrayBuffer, unwrap_note_key } from '../crypto';

export type Props = {
  showPublishing: boolean;
  setShowPublishing: (show: boolean) => void;
};

export const Publishing = ({
  showPublishing,
  setShowPublishing,
}: Props): React.ReactElement => {
  const [shares, setShares] = useAtom(sharesState);
  const [currentNote] = useAtom(getCurrentNoteState);

  const isShared = React.useMemo(
    () => shares.some((share: Share) => share.note === currentNote?.id),
    [shares, currentNote]
  );

  const isPublished = React.useMemo(
    () =>
      shares.some(
        (share: Share) => share.note === currentNote?.id && share.public
      ),
    [shares, currentNote]
  );

  const handlePublish = React.useCallback(() => {
    const publicShare = async () => {
      if (currentNote) {
        const rawKey = await unwrap_note_key(
          string2arrayBuffer(currentNote?.key?.wrapped_key)
        );
        const key = await exportKey(rawKey?.key);

        create_share({ note: currentNote?.id, public: key }).then(() =>
          list_shares(setShares)
        );
      }
    };

    if (isShared) {
      const share = shares.find(
        (share: Share) => share.note === currentNote?.id
      );
      if (share) {
        delete_share(share?.token).then(publicShare);
        return;
      }
    }
    publicShare();
  }, [isShared, shares, currentNote]);

  const handleUnpublish = React.useCallback(() => {
    const share = shares.find((share: Share) => share.note === currentNote?.id);
    if (share) {
      delete_share(share?.token).then(() => list_shares(setShares));
    }
  }, [isShared, shares, currentNote]);

  return (
    <Transition show={showPublishing} as={React.Fragment} appear>
      <Dialog
        onClose={() => setShowPublishing(false)}
        className="fixed z-10 inset-0 overflow-y-auto"
      >
        <div className="flex justify-center min-h-screen">
          <Transition.Child
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-200 opacity-30" />
          </Transition.Child>
          <Transition.Child
            enter="transition-opacity ease-linear duration-150"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-75"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="relative p-6 bg-white border border-gray-300 border-dashed shadow-lg rounded mx-auto max-w-sm min-w-sm sm:min-w-lg sm:max-w-lg lg:min-w-xl lg:max-w-xl sm:my-6">
              <div className="flex flex-row justify-between">
                <Dialog.Title className="text-2xl font-bold highlight inline">
                  Publish
                </Dialog.Title>

                <button onClick={() => setShowPublishing(false)}>
                  <CloseIcon className="h-6 w-6" />
                </button>
              </div>
              <div className="mt-8 text-red-500">
                Publications are visible to anyone who knows your username. Make
                sure you are ready for everyone to see this!
              </div>
              {isShared && !isPublished && (
                <div className="mt-4 text-gray-700">
                  This note is currently shared, it will be re-shared to allow
                  public access.
                </div>
              )}
              <div className="flex flex-row justify-end">
                {isPublished ? (
                  <button
                    onClick={handleUnpublish}
                    className="mt-8 p-2 bg-red-600 text-white rounded-md shadow-md transition hover:scale-105 active:scale-100"
                  >
                    Unpublish
                  </button>
                ) : (
                  <button
                    onClick={handlePublish}
                    className="mt-8 p-2 bg-green-600 text-white rounded-md shadow-md transition hover:scale-105 active:scale-100"
                  >
                    Publish
                  </button>
                )}
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Publishing;
