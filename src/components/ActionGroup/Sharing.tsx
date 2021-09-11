import { Dialog, Transition } from '@headlessui/react';
import React from 'react';
import { create_share } from '../../api/share_api';
import { useCurrentNote } from '../../context/currentNoteReducer';
import { useShares } from '../../context/sharesReducer';
import { CheckIcon, CloseIcon, CopyIcon } from '../../icons';
import { Share } from '../../types';

export type Props = {
  showSharing: boolean;
  setShowSharing: (show: boolean) => void;
};

export const Sharing = ({
  showSharing,
  setShowSharing,
}: Props): React.ReactElement => {
  const currentNote = useCurrentNote();
  const shares = useShares();
  const [shareToken, setShareToken] = React.useState('');
  const [showClipboardConfirm, setShowClipboardConfirm] = React.useState(false);

  React.useEffect(() => {
    const share = shares.find(
      (share: Share) => share?.note === currentNote?.id
    );
    if (share) {
      setShareToken(share?.token);
    }
  }, [shares, currentNote]);

  const createShare = React.useCallback(() => {
    const func = async () => {
      if (showSharing && currentNote?.id) {
        const share = await create_share({
          note: currentNote?.id,
          expires_in: undefined,
        });
        setShareToken(share?.token);
      }
    };
    func();
  }, [currentNote, showSharing]);

  const copyToClipboard = React.useCallback(() => {
    navigator.clipboard.writeText(shareToken).then(() => {
      setShowClipboardConfirm(true);
      setTimeout(() => setShowClipboardConfirm(false), 1000);
    });
  }, [shareToken]);

  return (
    <Transition show={showSharing} as={React.Fragment} appear>
      <Dialog
        onClose={() => setShowSharing(false)}
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
                  Share
                </Dialog.Title>

                <button onClick={() => setShowSharing(false)}>
                  <CloseIcon className="h-6 w-6" />
                </button>
              </div>
              <div className="mt-8 flex flex-row justify-between bg-gray-100 p-4 rounded-md">
                <input
                  value={shareToken}
                  readOnly
                  className="outline-none bg-gray-100 w-4/5 truncate"
                />
                <div className="relative">
                  <button
                    onClick={copyToClipboard}
                    className="hover:scale-105 active:scale-100"
                  >
                    <CopyIcon className="h-6 w-6" />
                  </button>
                  <Transition
                    show={showClipboardConfirm}
                    enter="transition-opacity ease-linear duration-75"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity ease-linear duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    className="absolute top-0.5 right-6"
                  >
                    <CheckIcon className="h-4 w-4 text-green-600" />
                  </Transition>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Sharing;
