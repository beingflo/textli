import { Listbox, Transition } from '@headlessui/react';
import { get } from 'idb-keyval';
import { useAtom } from 'jotai';
import React, { Fragment } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { useSaveNote } from '../../api/hooks';
import { getCurrentNoteState } from '../context';
import { CheckIcon, ChevronLeftIcon, SaveIcon } from '../../icons';

export const SaveAction = (): React.ReactElement => {
  const saveNote = useSaveNote();
  const [currentNote] = useAtom(getCurrentNoteState);

  const [showSaveConfirm, setShowSaveConfirm] = React.useState(false);

  const [workspaces, setWorkspaces] = React.useState([]);

  const [selectedWorkspace, setSelectedWorkspace] =
    React.useState<{ name: string; key: CryptoKey; default: boolean }>();

  React.useEffect(() => {
    const savedWorkspace = workspaces?.find(
      (workspace: any) => workspace?.name === currentNote?.workspace
    );
    const defaultWorkspace = workspaces?.find(
      (workspace: any) => workspace?.default
    );

    if (savedWorkspace) {
      setSelectedWorkspace(savedWorkspace);
    } else {
      setSelectedWorkspace(defaultWorkspace);
    }
  }, [workspaces, currentNote]);

  React.useMemo(() => {
    get('workspaces').then(setWorkspaces);
  }, []);

  const handleSave = () => {
    if (selectedWorkspace) {
      saveNote(selectedWorkspace);
      console.log('Saving with', selectedWorkspace?.name);
      setShowSaveConfirm(true);
      setTimeout(() => setShowSaveConfirm(false), 1000);
    }
  };

  useHotkeys(
    'command+s,ctrl+s',
    (event: KeyboardEvent) => {
      handleSave();
      event.preventDefault();
    },
    { enableOnContentEditable: true },
    [handleSave]
  );

  return (
    <div className="relative">
      <Listbox value={selectedWorkspace} onChange={setSelectedWorkspace}>
        <Listbox.Button>
          <ChevronLeftIcon className="h-4 w-4 absolute top-1 right-6 text-gray-500" />
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute top-0 right-full mr-8 p-1 -mt-3 space-y-2 bg-white rounded-md shadow-lg">
            {workspaces?.map((workspace: any) => (
              <Listbox.Option
                key={workspace?.name}
                className={({ active, selected }) =>
                  `${active ? 'bg-yellow-100' : 'bg-white'} ${
                    selected ? 'font-semibold' : ''
                  } cursor-default select-none relative p-2 rounded-md text-sm`
                }
                value={workspace}
              >
                {workspace?.name}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </Listbox>
      <button onClick={handleSave}>
        <SaveIcon className="text-gray-700 hover:-translate-x-0.5 transform transition active:scale-90" />
      </button>
      <Transition
        show={showSaveConfirm}
        enter="transition-opacity ease-linear duration-75"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity ease-linear duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        className="absolute top-1 right-10"
      >
        <CheckIcon className="h-4 w-4 text-green-600" />
      </Transition>
    </div>
  );
};
