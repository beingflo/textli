import React, { ReactNode } from 'react';
import Tippy from '@tippyjs/react';

type Props = {
  children: ReactNode;
  color?: string;
};

export const InfoTooltip = ({ children, color }: Props): JSX.Element => (
  <Tippy
    content={
      <div
        className={`max-w-xs rounded-md border border-${
          color ?? 'black'
        } bg-white p-1`}
      >
        {children}
      </div>
    }
  >
    <div
      className={`ml-1.5 flex h-5 w-5 cursor-default items-center justify-center rounded-full border text-${
        color ?? 'black'
      } border-${color ?? 'black'} text-sm font-semibold`}
    >
      !
    </div>
  </Tippy>
);
