import React, { ReactNode } from 'react';
import Tippy from '@tippyjs/react';
import clsx from 'clsx';

type Props = {
  children: ReactNode;
  textColor?: string;
  borderColor?: string;
};

export const InfoTooltip = ({
  children,
  textColor,
  borderColor,
}: Props): JSX.Element => (
  <Tippy
    content={
      <div
        className={clsx(
          'max-w-xs rounded-md border bg-white p-1',
          borderColor ? borderColor : 'border-black'
        )}
      >
        {children}
      </div>
    }
  >
    <div
      className={clsx(
        'ml-1.5 flex h-5 w-5 cursor-default items-center justify-center rounded-full border text-sm font-semibold',
        textColor ?? 'text-black',
        borderColor ?? 'border-black'
      )}
    >
      !
    </div>
  </Tippy>
);
