import { useAtom } from 'jotai';
import React from 'react';
import { getNoteStatusState } from './state';
import { CheckIcon, EditIcon } from '../icons';
import { NoteStatus as Status } from '../types';
import { NoteStatusSpinner } from './Spinner';

export const NoteStatus = (): React.ReactElement => {
  const [status] = useAtom(getNoteStatusState);

  if (status === Status.INPROGRESS) {
    return (
      <div className="fixed bottom-1 right-1 text-xs flex">
        <NoteStatusSpinner />
      </div>
    );
  }

  if (status === Status.SYNCED) {
    return (
      <div className="fixed bottom-1 right-1 text-xs flex">
        <CheckIcon className="h-4 w-4 text-green-600" />
      </div>
    );
  }

  return (
    <div className="fixed bottom-1 right-1 text-xs flex">
      <EditIcon className="h-4 w-4" />
    </div>
  );
};
