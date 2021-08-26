import React from 'react';
import { useNoteStatus } from '../context/noteStatusReducer';
import { NoteStatus as Status } from '../types';
import { NoteStatusSpinner } from './Spinner';

export const NoteStatus = (): React.ReactElement => {
  const status = useNoteStatus();

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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 text-green-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>
    );
  }

  return (
    <div className="fixed bottom-1 right-1 text-xs flex">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 20h9"></path>
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
      </svg>
    </div>
  );
};
