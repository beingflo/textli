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
  const [userInfo] = useAtom(getUserInfoState);

  const [shareLink, setShareLink] = React.useState('');
  const share_url = import.meta.env.VITE_SHARE_URL;

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
        await create_share({
          note: currentNote?.id,
          expires_in: expiration?.expires_in,
        });
        list_shares(setShares);
      }
    };

    func();
  }, [currentNote, showSharing, expiration]);

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
        className='fixed inset-0 z-20 overflow-y-auto'
      >
        <div className='flex justify-center'>
          <Transition.Child
            enter='transition-opacity ease-linear duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='transition-opacity ease-linear duration-300'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Dialog.Overlay className='fixed inset-0 bg-gray-400 opacity-40' />
          </Transition.Child>
          <Transition.Child
            enter='transition-opacity ease-linear duration-150'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='transition-opacity ease-linear duration-75'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='relative mx-auto my-4 min-w-sm max-w-sm rounded border border-gray-600 bg-white p-6 shadow-lg sm:min-w-lg sm:max-w-lg lg:min-w-xl lg:max-w-xl'>
              <div className='flex flex-row justify-between'>
                <Dialog.Title className='highlight inline text-2xl font-bold'>
                  Share
                </Dialog.Title>

                <button
                  onClick={() => setShowSharing(false)}
                  className='outline-none'
                >
                  <CloseIcon className='h-6 w-6' />
                </button>
              </div>
              <div className='mt-8'>
                {share ? (
                  <>
                    <div className='flex flex-row justify-between'>
                      {share.expires_at ? (
                        <span>Share expires at</span>
                      ) : (
                        <span>Share expires</span>
                      )}
                      <span className='font-medium'>
                        {share?.expires_at
                          ? new Date(share?.expires_at).toLocaleString()
                          : 'Never'}
                      </span>
                    </div>
                    <div className='mt-4 flex flex-row justify-between rounded-md bg-gray-100 p-4'>
                      <input
                        value={shareLink}
                        readOnly
                        className='w-4/5 truncate bg-gray-100 outline-none'
                      />
                      <div className='relative'>
                        <button
                          onClick={copyToClipboard}
                          className='hover:scale-105 active:scale-100'
                        >
                          <CopyIcon className='h-6 w-6' />
                        </button>
                        <button
                          onClick={() => window.open(shareLink)}
                          className='pl-2 hover:scale-105 active:scale-100'
                        >
                          <ExternalLinkIcon className='h-6 w-6' />
                        </button>
                        <Transition
                          show={showClipboardConfirm}
                          enter='transition-opacity ease-linear duration-75'
                          enterFrom='opacity-0'
                          enterTo='opacity-100'
                          leave='transition-opacity ease-linear duration-300'
                          leaveFrom='opacity-100'
                          leaveTo='opacity-0'
                          className='absolute top-0.5 right-[3.75rem]'
                        >
                          <CheckIcon className='h-5 w-5 text-green-600' />
                        </Transition>
                      </div>
                    </div>
                    <div className='flex flex-row justify-end'>
                      <button
                        onClick={handleDeleteShare}
                        className='mt-8 rounded-md bg-gray-800 p-2 text-white shadow-md transition'
                      >
                        Delete share
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className='flex flex-row justify-between'>
                      <span className='inline-flex self-center'>
                        Expire share in
                      </span>
                      <Listbox value={expiration} onChange={setExpiration}>
                        <div className='relative mt-1 w-1/2'>
                          <Listbox.Button className='relative w-full cursor-default rounded-md bg-gray-50 py-2 pl-3 pr-10 text-left shadow-md focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm'>
                            <span className='block truncate'>
                              {expiration.value}
                            </span>
                            <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
                              <SelectorIcon
                                className='h-5 w-5 text-gray-400'
                                aria-hidden='true'
                              />
                            </span>
                          </Listbox.Button>
                          <Transition
                            as={Fragment}
                            leave='transition ease-in duration-100'
                            leaveFrom='opacity-100'
                            leaveTo='opacity-0'
                          >
                            <Listbox.Options className='absolute z-10 mt-1 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg sm:text-sm'>
                              {expirationOptions.map((option) => (
                                <Listbox.Option
                                  key={option?.id}
                                  className={({ active }) =>
                                    `${active ? 'bg-yellow-100' : 'bg-white'}
                              relative cursor-default select-none py-2 pl-10 pr-4`
                                  }
                                  value={option}
                                >
                                  {({ selected }) => (
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
                                        <span className='absolute inset-y-0 left-0 flex items-center pl-3 text-yellow-500'>
                                          <CheckIcon
                                            className='h-5 w-5'
                                            aria-hidden='true'
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
                    <div className='flex flex-row justify-end'>
                      <button
                        onClick={handleCreateShare}
                        className='mt-8 rounded-md bg-gray-800 p-2 text-white shadow-md transition'
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
