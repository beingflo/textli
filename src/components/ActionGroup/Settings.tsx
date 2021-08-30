import { Dialog, Tab, Transition } from '@headlessui/react';
import React from 'react';
import { get_deleted_notes } from '../../api/note_api';
import { useUserInfo } from '../../context/userInfoReducer';
import {
  BinIcon,
  CashIcon,
  CloseIcon,
  EyeIcon,
  KeyIcon,
  LinkIcon,
  UsersIcon,
} from '../../icons';
import { DeletedNote } from '../../types';

export type Props = {
  showSettings: boolean;
  setShowSettings: (show: boolean) => void;
};

export const Settings = ({
  showSettings,
  setShowSettings,
}: Props): React.ReactElement => {
  const userInfo = useUserInfo();

  const balance = parseFloat(userInfo?.balance ?? '0').toFixed(2);
  const balance_days = parseFloat(userInfo?.remaining_days ?? '0');
  const remaining_weeks = (balance_days / 7).toFixed(2);

  const [deletedNotes, setDeletedNotes] = React.useState([]);
  React.useEffect(() => get_deleted_notes(setDeletedNotes), [setDeletedNotes]);

  const getProcessedNotes = React.useMemo(() => {
    const parsedNotes = deletedNotes?.map((note: DeletedNote) => ({
      ...note,
      ...JSON.parse(note?.metainfo),
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

  return (
    <Transition show={showSettings} as={React.Fragment}>
      <Dialog
        onClose={() => setShowSettings(false)}
        className="fixed z-10 inset-0 overflow-y-auto"
      >
        <div className="flex md:items-center justify-center min-h-screen">
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
            <div className="relative p-6 bg-white border border-gray-300 border-dashed shadow-lg rounded mx-auto max-w-sm min-w-sm sm:min-w-lg sm:max-w-lg lg:min-w-3xl lg:max-w-3xl my-8">
              <div className="flex flex-row justify-between">
                <Dialog.Title className="text-2xl font-bold highlight inline">
                  Settings
                </Dialog.Title>

                <button onClick={() => setShowSettings(false)}>
                  <CloseIcon className="h-6 w-6" />
                </button>
              </div>

              <Tab.Group vertical>
                <div className="flex flex-row mt-8">
                  <Tab.List className="flex flex-col w-max md:whitespace-nowrap space-y-4">
                    <Tab as={React.Fragment}>
                      {({ selected }) => (
                        <button className="flex">
                          <CashIcon className="h-5 w-5 mr-2 self-center" />
                          <span className={selected ? 'highlight' : ''}>
                            Balance
                          </span>
                        </button>
                      )}
                    </Tab>
                    <Tab as={React.Fragment}>
                      {({ selected }) => (
                        <button className="flex">
                          <LinkIcon className="h-5 w-5 mr-2 self-center" />
                          <span className={selected ? 'highlight' : ''}>
                            Shares
                          </span>
                        </button>
                      )}
                    </Tab>
                    <Tab as={React.Fragment}>
                      {({ selected }) => (
                        <button className="flex">
                          <EyeIcon className="h-5 w-5 mr-2 self-center" />
                          <span className={selected ? 'highlight' : ''}>
                            Publications
                          </span>
                        </button>
                      )}
                    </Tab>
                    <Tab as={React.Fragment}>
                      {({ selected }) => (
                        <button className="flex">
                          <BinIcon className="h-5 w-5 mr-2 self-center" />
                          <span className={selected ? 'highlight' : ''}>
                            Bin
                          </span>
                        </button>
                      )}
                    </Tab>
                    <Tab as={React.Fragment}>
                      {({ selected }) => (
                        <button className="flex">
                          <KeyIcon className="h-5 w-5 mr-2 self-center" />
                          <span className={selected ? 'highlight' : ''}>
                            Workspaces
                          </span>
                        </button>
                      )}
                    </Tab>
                    <Tab as={React.Fragment}>
                      {({ selected }) => (
                        <button className="flex">
                          <UsersIcon className="h-5 w-5 mr-2 self-center" />
                          <span className={selected ? 'highlight' : ''}>
                            User settings
                          </span>
                        </button>
                      )}
                    </Tab>
                  </Tab.List>
                  <Tab.Panels className="flex-grow ml-8 min-w-0">
                    <Tab.Panel className="flex flex-col h-full">
                      <div className="flex justify-between">
                        <span className="">Balance</span>
                        <div>
                          <span className="mr-1 text-xs text-gray-600">
                            CHF
                          </span>
                          <span className="font-bold">{balance}</span>
                        </div>
                      </div>
                      <div className="mt-2 flex justify-between">
                        <span>Remaining weeks</span>
                        <span className="font-bold">{remaining_weeks}</span>
                      </div>
                      <div className="mt-6 p-1 text-yellow-500">
                        If your account is two weeks overdraft it will enter
                        read-only mode!
                      </div>
                      <button className="mt-auto ml-auto p-2 rounded-md bg-green-600 text-white font-semibold hover:scale-105 active:scale-100 transition">
                        Top up balance
                      </button>
                    </Tab.Panel>
                    <Tab.Panel>Content 2</Tab.Panel>
                    <Tab.Panel>Content 3</Tab.Panel>
                    <Tab.Panel>
                      <ul className="space-y-4">
                        {getProcessedNotes?.map((note: any) => (
                          <li key={note?.id} className="flex flex-col">
                            <span className="truncate font-semibold">
                              {note?.title}
                            </span>
                            <div className="flex justify-between">
                              <span className="text-gray-500">
                                {new Date(
                                  note?.deleted_at
                                ).toLocaleDateString()}
                              </span>
                              <button className="text-yellow-400">
                                Recover
                              </button>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </Tab.Panel>
                    <Tab.Panel>Content 5</Tab.Panel>
                    <Tab.Panel>Content 6</Tab.Panel>
                  </Tab.Panels>
                </div>
              </Tab.Group>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Settings;
