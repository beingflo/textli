import React from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { CloseIcon, SmileIcon } from '../../icons';

export type Props = {
  showTrends: boolean;
  setShowTrends: (show: boolean) => void;
};

export const Trends = ({
  showTrends,
  setShowTrends,
}: Props): React.ReactElement => {
  return (
    <Transition show={showTrends} as={React.Fragment} appear>
      <Dialog
        onClose={() => setShowTrends(false)}
        className="fixed z-10 inset-0 overflow-y-auto"
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
          ></Transition.Child>
          <div className="relative p-6 bg-white border border-gray-300 border-dashed shadow-lg rounded mx-auto max-w-sm min-w-sm sm:min-w-lg sm:max-w-lg lg:min-w-xl lg:max-w-xl sm:my-6">
            <div className="flex flex-row justify-between">
              <Dialog.Title className="text-2xl font-bold highlight inline">
                Trends
              </Dialog.Title>

              <button onClick={() => setShowTrends(false)}>
                <CloseIcon className="h-6 w-6" />
              </button>
            </div>
            <div className="flex flex-row gap-1 pt-8">
              <div>Coming soon</div>
              <SmileIcon className="w-6 h-6" />
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Trends;
