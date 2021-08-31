import { Dialog, Tab, Transition } from '@headlessui/react';
import React from 'react';
import {
  get_deleted_notes,
  get_notes,
  undelete_note,
} from '../../../api/note_api';
import { delete_share, list_shares } from '../../../api/share_api';
import { useAppDispatch } from '../../../context';
import { useNoteList } from '../../../context/noteListReducer';
import { useShares } from '../../../context/sharesReducer';
import {
  BinIcon,
  CashIcon,
  CloseIcon,
  DataIcon,
  EyeIcon,
  KeyIcon,
  LinkIcon,
  UsersIcon,
} from '../../../icons';
import {
  DeletedNote,
  NoteListEntry,
  ParsedNoteListEntry,
  Share,
} from '../../../types';
import { Balance } from './Balance';

export type Props = {
  showSettings: boolean;
  setShowSettings: (show: boolean) => void;
};

export const Settings = ({
  showSettings,
  setShowSettings,
}: Props): React.ReactElement => {
  const dispatch = useAppDispatch();
  const shares = useShares();
  const noteList = useNoteList();

  const [deletedNotes, setDeletedNotes] = React.useState([]);
  React.useEffect(() => get_deleted_notes(setDeletedNotes), [setDeletedNotes]);

  const getSharesInfo = React.useMemo(() => {
    const parsedNotes = noteList?.map((note: NoteListEntry) => ({
      ...note,
      ...JSON.parse(note?.metainfo),
    }));

    const matchedShares = shares.map((share: Share) => {
      const title = parsedNotes.find(
        (note: ParsedNoteListEntry) => note?.id === share?.note_token
      )?.title;

      return { ...share, title };
    });

    return matchedShares;
  }, [shares, noteList]);

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

  const recover_note = React.useCallback(
    (id: string) => {
      const success = () => {
        get_deleted_notes(setDeletedNotes);
        get_notes(dispatch);
      };
      undelete_note(id, success);
    },
    [setDeletedNotes, dispatch]
  );

  const revoke_share = React.useCallback(
    (token: string) => {
      const success = () => {
        list_shares(dispatch);
      };
      delete_share(token, success);
    },
    [dispatch]
  );

  return (
    <Transition show={showSettings} as={React.Fragment}>
      <Dialog
        onClose={() => setShowSettings(false)}
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
            <div className="relative p-6 bg-white border border-gray-300 border-dashed shadow-lg rounded mx-auto max-w-sm min-w-sm sm:min-w-lg sm:max-w-lg lg:min-w-3xl lg:max-w-3xl sm:my-6">
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
                    <Tab as={React.Fragment}>
                      {({ selected }) => (
                        <button className="flex">
                          <DataIcon className="h-5 w-5 mr-2 self-center" />
                          <span className={selected ? 'highlight' : ''}>
                            Export
                          </span>
                        </button>
                      )}
                    </Tab>
                  </Tab.List>
                  <Tab.Panels className="flex-grow ml-8 min-w-0">
                    <Tab.Panel className="flex flex-col h-full">
                      <Balance />
                    </Tab.Panel>
                    <Tab.Panel>
                      <ul className="space-y-4">
                        {getSharesInfo?.map((share: any) => (
                          <li key={share?.token} className="flex flex-col">
                            <span className="truncate font-semibold">
                              {share?.title}
                            </span>
                            <div className="flex justify-between">
                              <span className="text-gray-500">
                                {new Date(
                                  share?.created_at
                                ).toLocaleDateString()}
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
                    </Tab.Panel>
                    <Tab.Panel>Coming soon :)</Tab.Panel>
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
                              <button
                                onClick={() => recover_note(note?.id)}
                                className="text-yellow-400"
                              >
                                Recover
                              </button>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </Tab.Panel>
                    <Tab.Panel>Coming soon :)</Tab.Panel>
                    <Tab.Panel>
                      <div className="flex flex-col">
                        <span className="font-semibold">Change password</span>
                        <span className="font-semibold text-red-500 mt-4">
                          Delete account
                        </span>
                      </div>
                    </Tab.Panel>
                    <Tab.Panel>Coming soon :)</Tab.Panel>
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
