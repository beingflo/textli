import React, { ReactNode } from 'react';
import Tippy from '@tippyjs/react';
import clsx from 'clsx';

type Props = {
  children: ReactNode;
  contentClassName?: string;
  anchorClassName?: string;
};

export const InfoTooltip = ({
  children,
  contentClassName,
  anchorClassName,
}: Props): JSX.Element => (
  <Tippy
    content={
      <div
        className={clsx(
          'max-w-xs rounded-md border border-black bg-white p-1 text-black',
          contentClassName
        )}
      >
        {children}
      </div>
    }
  >
    <div
      className={clsx(
        'ml-1.5 flex h-5 w-5 cursor-default items-center justify-center rounded-full border border-black text-sm font-semibold text-black',
        anchorClassName
      )}
    >
      !
    </div>
  </Tippy>
);
