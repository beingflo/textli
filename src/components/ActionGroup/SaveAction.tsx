import { Transition } from '@headlessui/react';
import React from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { useSaveNote } from '../../api/hooks';
import { CheckIcon, SaveIcon } from '../../icons';

export const SaveAction = (): React.ReactElement => {
  const saveNote = useSaveNote();

  const [showSaveConfirm, setShowSaveConfirm] = React.useState(false);

  const handleSave = () => {
    saveNote();
    setShowSaveConfirm(true);
    setTimeout(() => setShowSaveConfirm(false), 2000);
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
      <button onClick={handleSave}>
        <SaveIcon className="h-7 w-7 sm:w-6 sm:h-6 text-gray-700 hover:-translate-x-0.5 transform transition active:scale-90" />
      </button>
      <Transition
        show={showSaveConfirm}
        enter="transition-opacity ease-linear duration-75"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity ease-linear duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        className="absolute sm:top-0.5 sm:right-8"
      >
        <CheckIcon className="h-5 w-5 text-green-600" />
      </Transition>
    </div>
  );
};
