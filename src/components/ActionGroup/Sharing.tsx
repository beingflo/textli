import { Dialog, Listbox, Transition } from '@headlessui/react';
import React, { Fragment } from 'react';
import { create_share, delete_share, list_shares } from '../../api/share_api';
import { getCurrentNoteState, getUserInfoState, sharesState } from '../state';
import {
  CheckIcon,
  CloseIcon,
  CopyIcon,
  ExternalLinkIcon,
  SelectorIcon,
} from '../../icons';
import { Share } from '../../types';
import { exportKey, string2arrayBuffer, unwrap_note_key } from '../crypto';
import { useAtom } from 'jotai';

export type Props = {
  showSharing: boolean;
  setShowSharing: (show: boolean) => void;
};

const expirationOptions = [
  { id: 0, value: 'No expiration', expires_in: undefined },
  { id: 1, value: '1 hour', expires_in: 1 },
  { id: 2, value: '1 day', expires_in: 24 },
  { id: 3, value: '1 week', expires_in: 168 },
  { id: 4, value: '1 month', expires_in: 720 },
  { id: 5, value: '1 year', expires_in: 8760 },
];

export const Sharing = ({
  showSharing,
  setShowSharing,
}: Props): React.ReactElement => {
  const [currentNote] = useAtom(getCurrentNoteState);
  const [shares, setShares] = useAtom(sharesState);
  const [share, setShare] = React.useState<Share>();
  const [showClipboardConfirm, setShowClipboardConfirm] = React.useState(false);
  const [expiration, setExpiration] = React.useState(expirationOptions[3]);
  const [published, setPublished] = React.useState(false);
  const [userInfo] = useAtom(getUserInfoState);

  const [shareLink, setShareLink] = React.useState('');
  const share_url = import.meta.env.VITE_SHARE_URL;

  React.useEffect(() => {
    if (published) {
      setExpiration(expirationOptions[0]);
    }
  }, [published, setExpiration]);

  React.useEffect(() => {
    const share = shares.find(
      (share: Share) => share?.note === currentNote?.id
    );
    if (share) {
      setShare(share);
    }
  }, [shares, currentNote]);

  React.useEffect(() => {
    const func = async () => {
      if (!currentNote?.key?.wrapped_key || !userInfo) {
        return '';
      }
      const url = share_url;
      const rawKey = await unwrap_note_key(
        string2arrayBuffer(currentNote?.key?.wrapped_key),
        userInfo?.username
      );
      const key = await exportKey(rawKey);

      setShareLink(`${url}/note/${share?.token}#${key}`);
    };

    func();
  }, [currentNote, share, share_url]);

  const handleCreateShare = React.useCallback(() => {
    const func = async () => {
      if (showSharing && currentNote?.id && userInfo) {
        let key = undefined;
        if (published) {
          const rawKey = await unwrap_note_key(
            string2arrayBuffer(currentNote?.key?.wrapped_key),
            userInfo?.username
          );
          key = await exportKey(rawKey);
        }

        await create_share({
          note: currentNote?.id,
          expires_in: expiration?.expires_in,
          public: key,
        });
        list_shares(setShares);
      }
    };

    func();
  }, [currentNote, showSharing, expiration, published]);

  const handleDeleteShare = React.useCallback(() => {
    const func = async () => {
      if (share) {
        delete_share(share?.token).then(() => {
          setShare(undefined);
          list_shares(setShares);
        });
      }
    };
    func();
  }, [share]);

  const copyToClipboard = React.useCallback(() => {
    navigator.clipboard.writeText(shareLink).then(() => {
      setShowClipboardConfirm(true);
      setTimeout(() => setShowClipboardConfirm(false), 1000);
    });
  }, [shareLink]);

  return (
    <Transition show={showSharing} as={React.Fragment} appear>
      <Dialog
        onClose={() => setShowSharing(false)}
        className="fixed z-20 inset-0 overflow-y-auto"
      >
        <div className="flex justify-center">
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
            <div className="relative p-6 bg-white border border-gray-300 border-dashed shadow-lg rounded mx-auto max-w-sm min-w-sm sm:min-w-lg sm:max-w-lg lg:min-w-xl lg:max-w-xl my-4">
              <div className="flex flex-row justify-between">
                <Dialog.Title className="text-2xl font-bold highlight inline">
                  Share
                </Dialog.Title>

                <button onClick={() => setShowSharing(false)}>
                  <CloseIcon className="h-6 w-6" />
                </button>
              </div>
              <div className="mt-8">
                {share ? (
                  <>
                    <div className="flex flex-row justify-between">
                      {share.expires_at ? (
                        <span>Share expires at</span>
                      ) : (
                        <span>Share expires</span>
                      )}
                      <span className="font-medium">
                        {share?.expires_at
                          ? new Date(share?.expires_at).toLocaleString()
                          : 'Never'}
                      </span>
                    </div>
                    {share?.public && (
                      <div className="flex flex-row mt-2 text-red-400 font-medium">
                        This note is published on your profile!
                      </div>
                    )}
                    <div className="mt-4 flex flex-row justify-between bg-gray-100 p-4 rounded-md">
                      <input
                        value={shareLink}
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
                        <button
                          onClick={() => window.open(shareLink)}
                          className="pl-2 hover:scale-105 active:scale-100"
                        >
                          <ExternalLinkIcon className="h-6 w-6" />
                        </button>
                        <Transition
                          show={showClipboardConfirm}
                          enter="transition-opacity ease-linear duration-75"
                          enterFrom="opacity-0"
                          enterTo="opacity-100"
                          leave="transition-opacity ease-linear duration-300"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                          className="absolute top-1 right-16"
                        >
                          <CheckIcon className="h-4 w-4 text-green-600" />
                        </Transition>
                      </div>
                    </div>
                    <div className="flex flex-row justify-end">
                      <button
                        onClick={handleDeleteShare}
                        className="mt-8 p-2 bg-gray-600 text-white rounded-md shadow-md transition hover:bg-gray-500 active:bg-gray-600"
                      >
                        Delete share
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex flex-row justify-between mb-4">
                      <span className="inline-flex self-center">
                        Publish note
                      </span>
                      <div className="w-1/2">
                        <input
                          type="checkbox"
                          checked={published}
                          onChange={(event) =>
                            setPublished(event.target.checked)
                          }
                          className="rounded-sm outline-none focus:ring-0 text-red-500 self-center"
                        />
                      </div>
                    </div>
                    <div className="flex flex-row justify-between">
                      <span className="inline-flex self-center">
                        Expire share in
                      </span>
                      <Listbox
                        value={expiration}
                        onChange={setExpiration}
                        disabled={published}
                      >
                        <div className="relative mt-1 w-1/2">
                          <Listbox.Button className="relative disabled:opacity-50 disabled:cursor-not-allowed w-full py-2 pl-3 pr-10 text-left bg-gray-50 shadow-md rounded-md cursor-default focus:outline-none sm:text-sm">
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
                                          selected
                                            ? 'font-medium'
                                            : 'font-normal'
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
                    <div className="flex flex-row justify-end">
                      <button
                        onClick={handleCreateShare}
                        className="mt-8 p-2 bg-gray-800 text-white rounded-md shadow-md transition hover:bg-gray-700 active:bg-gray-800"
                      >
                        Create share
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Sharing;
