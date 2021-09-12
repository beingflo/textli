import { Dialog, Listbox, Transition } from '@headlessui/react';
import React, { Fragment } from 'react';
import { create_share } from '../../api/share_api';
import { useCurrentNote } from '../../context/currentNoteReducer';
import { useShares } from '../../context/sharesReducer';
import { CheckIcon, CloseIcon, CopyIcon, SelectorIcon } from '../../icons';
import { Share } from '../../types';

export type Props = {
  showSharing: boolean;
  setShowSharing: (show: boolean) => void;
};

const expirationOptions = [
  { id: 0, value: 'No expiration' },
  { id: 1, value: '1 hour' },
  { id: 2, value: '1 day' },
  { id: 3, value: '1 week' },
  { id: 4, value: '1 month' },
  { id: 5, value: '1 year' },
];

export const Sharing = ({
  showSharing,
  setShowSharing,
}: Props): React.ReactElement => {
  const currentNote = useCurrentNote();
  const shares = useShares();
  const [shareToken, setShareToken] = React.useState('');
  const [showClipboardConfirm, setShowClipboardConfirm] = React.useState(false);
  const [expiration, setExpiration] = React.useState(expirationOptions[3]);

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
              <div className="mt-8">
                <div className="flex flex-row justify-between">
                  <span className="inline-flex self-center">
                    Share expires in
                  </span>
                  <Listbox value={expiration} onChange={setExpiration}>
                    <div className="relative mt-1">
                      <Listbox.Button className="relative w-48 py-2 pl-3 pr-10 text-left bg-gray-50 shadow-md rounded-md cursor-default focus:outline-none sm:text-sm">
                        <span className="block truncate">
                          {expiration.value}
                        </span>
                        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                          <SelectorIcon
                            className="w-5 h-5 text-gray-400"
                            aria-hidden="true"
                          />
                        </span>
                      </Listbox.Button>
                      <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <Listbox.Options className="absolute z-10 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg sm:text-sm">
                          {expirationOptions.map((option) => (
                            <Listbox.Option
                              key={option?.id}
                              className={({ active }) =>
                                `${active ? 'bg-yellow-100' : 'bg-white'}
                              cursor-default select-none relative py-2 pl-10 pr-4`
                              }
                              value={option}
                            >
                              {({ selected, active }) => (
                                <>
                                  <span
                                    className={`${
                                      selected ? 'font-medium' : 'font-normal'
                                    } block truncate`}
                                  >
                                    {option?.value}
                                  </span>
                                  {selected ? (
                                    <span
                                      className={`${
                                        active
                                          ? 'text-amber-600'
                                          : 'text-amber-600'
                                      }
                                absolute inset-y-0 left-0 flex items-center pl-3`}
                                    >
                                      <CheckIcon
                                        className="w-5 h-5"
                                        aria-hidden="true"
                                      />
                                    </span>
                                  ) : null}
                                </>
                              )}
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </Transition>
                    </div>
                  </Listbox>
                </div>
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
