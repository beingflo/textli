import React from 'react';

export const SaveIcon = ({
  className,
}: {
  className?: string;
}): React.ReactElement => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
      <polyline points="17 21 17 13 7 13 7 21"></polyline>
      <polyline points="7 3 7 8 15 8"></polyline>
    </svg>
  );
};

export const CheckIcon = ({
  className,
}: {
  className?: string;
}): React.ReactElement => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 13l4 4L19 7"
      />
    </svg>
  );
};

export const NewIcon = ({
  className,
}: {
  className?: string;
}): React.ReactElement => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
      <polyline points="14 2 14 8 20 8"></polyline>
      <line x1="12" y1="18" x2="12" y2="12"></line>
      <line x1="9" y1="15" x2="15" y2="15"></line>
    </svg>
  );
};

export const BinIcon = ({
  className,
}: {
  className?: string;
}): React.ReactElement => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <polyline points="3 6 5 6 21 6"></polyline>
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
      <line x1="10" y1="11" x2="10" y2="17"></line>
      <line x1="14" y1="11" x2="14" y2="17"></line>
    </svg>
  );
};

export const MoreIcon = ({
  className,
}: {
  className?: string;
}): React.ReactElement => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="1"></circle>
      <circle cx="19" cy="12" r="1"></circle>
      <circle cx="5" cy="12" r="1"></circle>
    </svg>
  );
};

export const LinkIcon = ({
  className,
}: {
  className?: string;
}): React.ReactElement => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
    </svg>
  );
};

export const SettingsIcon = ({
  className,
}: {
  className?: string;
}): React.ReactElement => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <line x1="4" y1="21" x2="4" y2="14"></line>
      <line x1="4" y1="10" x2="4" y2="3"></line>
      <line x1="12" y1="21" x2="12" y2="12"></line>
      <line x1="12" y1="8" x2="12" y2="3"></line>
      <line x1="20" y1="21" x2="20" y2="16"></line>
      <line x1="20" y1="12" x2="20" y2="3"></line>
      <line x1="1" y1="14" x2="7" y2="14"></line>
      <line x1="9" y1="8" x2="15" y2="8"></line>
      <line x1="17" y1="16" x2="23" y2="16"></line>
    </svg>
  );
};

export const LogoutIcon = ({
  className,
}: {
  className?: string;
}): React.ReactElement => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
      <polyline points="16 17 21 12 16 7"></polyline>
      <line x1="21" y1="12" x2="9" y2="12"></line>
    </svg>
  );
};

export const EditIcon = ({
  className,
}: {
  className?: string;
}): React.ReactElement => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 20h9"></path>
      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
    </svg>
  );
};

export const ArrowLeftIcon = ({
  className,
}: {
  className?: string;
}): React.ReactElement => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M11 17l-5-5m0 0l5-5m-5 5h12"
      />
    </svg>
  );
};

export const SearchIcon = ({
  className,
}: {
  className?: string;
}): React.ReactElement => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  );
};

export const ArrowRightIcon = ({
  className,
}: {
  className?: string;
}): React.ReactElement => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13 7l5 5m0 0l-5 5m5-5H6"
      />
    </svg>
  );
};

export const CashIcon = ({
  className,
}: {
  className?: string;
}): React.ReactElement => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
      />
    </svg>
  );
};

export const KeyIcon = ({
  className,
}: {
  className?: string;
}): React.ReactElement => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
      />
    </svg>
  );
};

export const EyeIcon = ({
  className,
}: {
  className?: string;
}): React.ReactElement => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
      />
    </svg>
  );
};

export const UsersIcon = ({
  className,
}: {
  className?: string;
}): React.ReactElement => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
      />
    </svg>
  );
};

export const ClearIcon = ({
  className,
}: {
  className?: string;
}): React.ReactElement => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
};

export const CloseIcon = ({
  className,
}: {
  className?: string;
}): React.ReactElement => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
};

export const DataIcon = ({
  className,
}: {
  className?: string;
}): React.ReactElement => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="22" y1="12" x2="2" y2="12"></line>
      <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path>
      <line x1="6" y1="16" x2="6.01" y2="16"></line>
      <line x1="10" y1="16" x2="10.01" y2="16"></line>
    </svg>
  );
};

export const CopyIcon = ({
  className,
}: {
  className?: string;
}): React.ReactElement => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
      />
    </svg>
  );
};

export const SelectorIcon = ({
  className,
}: {
  className?: string;
}): React.ReactElement => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 9l4-4 4 4m0 6l-4 4-4-4"
      />
    </svg>
  );
};

export const ClockIcon = ({
  className,
}: {
  className?: string;
}): React.ReactElement => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
};

export const ChevronLeftIcon = ({
  className,
}: {
  className?: string;
}): React.ReactElement => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 19l-7-7 7-7"
      />
    </svg>
  );
};

export const AddIcon = ({
  className,
}: {
  className?: string;
}): React.ReactElement => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
      />
    </svg>
  );
};

export const StarIcon = ({
  className,
}: {
  className?: string;
}): React.ReactElement => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
      />
    </svg>
  );
};

export const FilledStarIcon = ({
  className,
}: {
  className?: string;
}): React.ReactElement => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
};

export const ExternalLinkIcon = ({
  className,
}: {
  className?: string;
}): React.ReactElement => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
      />
    </svg>
  );
};

export const FrownIcon = ({
  className,
}: {
  className?: string;
}): React.ReactElement => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
};

export const SmileIcon = ({
  className,
}: {
  className?: string;
}): React.ReactElement => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
};

export const RefreshIcon = ({
  className,
}: {
  className?: string;
}): React.ReactElement => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
      />
    </svg>
  );
};

export const PieChartIcon = ({
  className,
}: {
  className?: string;
}): React.ReactElement => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      width="24"
      height="24"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
      />
    </svg>
  );
};

export const SadIcon = ({
  className,
}: {
  className?: string;
}): React.ReactElement => {
  return (
    <svg
      version="1.1"
      viewBox="400 250 400 700"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        <path d="m504.84 846.6c-9.8398-8.0391-19.078-15.121-27.961-22.801-14.617-11.578-27.578-25.102-38.52-40.199-3.7188-5.6406-9-10.32-13.199-15.719v-0.003906c-3.8594-4.418-7.1641-9.2969-9.8398-14.52-11.824-25.77-22.004-52.262-30.48-79.32-6.5508-25.582-10.57-51.75-12-78.117-1.3359-20.367-0.36719-40.816 2.8789-60.961 3.2969-22.172 9.4258-43.832 18.242-64.441 16.664-35.535 39.496-67.836 67.438-95.398 7.0898-8.2734 16.18-14.594 26.402-18.359 13.906-4.7461 27.359-10.73 40.199-17.883 24.145-13.695 52.82-16.988 79.441-9.1172 16.012 4.2227 31.602 9.9258 46.559 17.039 14.641 7.8008 29.762 15 45 21.48 28.672 13.051 52.906 34.199 69.719 60.84 22.875 35.359 39.895 74.18 50.402 114.96 0.72266 1.8281 1.2852 3.7148 1.6797 5.6406 3.6211 24.199 5.5859 48.617 5.8789 73.082-0.88281 34.215-4.8984 68.277-12 101.76-8.457 34.484-23.359 67.055-43.918 96-7.3359 9.3477-16.129 17.453-26.043 24-7.6914 4.5898-15.711 8.6016-24 12-44.879 22.922-93.121 20.398-141.12 17.762h0.003906c-10.156-2.1953-19.996-5.6602-29.281-10.32-14.641-5.5195-29.16-11.281-45.48-17.398zm75.121 9.9609h54.359v-0.003906c23.406 0.54688 46.691-3.5312 68.52-12 35.125-13.195 63.426-40.027 78.48-74.398 20.641-42.359 24-88.199 28.441-133.92 1.0469-25.574-0.88672-51.188-5.7617-76.316-6.5586-44.633-23.27-87.16-48.84-124.32-9.9844-15.75-23.398-29.043-39.238-38.883-7.5586-4.5586-15-9.4805-22.801-13.441-19.078-9.8398-38.641-19.078-57.719-28.922-40.078-20.641-79.559-14.641-118.92 2.1602-21 15.719-44.398 27.719-62.16 48v0.003906c-19.852 22.98-36.043 48.887-48 76.801-4.7461 13.82-8.4375 27.98-11.039 42.359-12.242 41.516-12.242 85.684 0 127.2 1.1992 3.7188 1.4414 7.6797 2.3984 12 6.7422 34.461 20.551 67.148 40.559 96 11.09 13.668 22.867 26.766 35.281 39.242 17.754 18.711 39.605 33.047 63.84 41.879 12.84 4.4414 25.441 9.7188 42.602 16.559z" />
        <path d="m680.64 672c-2.4414 6.3242-6.6211 11.832-12.059 15.887-5.4336 4.0547-11.902 6.4922-18.66 7.0352-9.9609-5.7305-18.559-13.551-25.203-22.922l12-34.68 20.641-12c6.1758 0.27734 12.008 2.9297 16.277 7.3984 4.2695 4.4727 6.6484 10.418 6.6445 16.602 0.83984 8.0391 0.35938 15.961 0.35938 22.68z" />
        <path d="m500.28 627.36c4.4414-1.5859 9.2422-1.8867 13.848-0.86719 4.6055 1.0195 8.832 3.3164 12.191 6.6289 5.3398 5.7734 8.2578 13.375 8.1602 21.238 0.73438 10.152-1.0391 20.332-5.1602 29.641-4.6797 1.4414-10.559 5.2812-15.359 4.0781-7.3594-2.1289-14.219-5.7227-20.16-10.559-4.9648-4.7852-7.6328-11.473-7.3203-18.359-0.64062-12.18 4.4688-23.949 13.801-31.801z" />
        <path d="m533.88 799.56c4.4414-3.2383 7.3203-7.0781 10.559-7.4414l0.003906 0.003906c32-5.1836 64.738-3.4219 96 5.1602 3.3086 1.5898 6.4453 3.5195 9.3594 5.7578-0.13281 3.6914-2.0781 7.0742-5.1992 9.043-3.1211 1.9688-7.0156 2.2695-10.402 0.79688-23.008-5.2383-46.707-6.7773-70.199-4.5586-6.8242 0.37891-13.668-0.023437-20.398-1.1992-3-0.60156-5.5234-4.3203-9.7227-7.5625z" />
        <path d="m464.76 583.08-5.5195-8.0391 5.8789-7.5586 39.719-2.2812c23.16-9.7188 23.16-9.7188 33.602-7.0781-19.68 25.199-46.441 25.32-73.68 24.957z" />
        <path d="m687.24 565.32c8.7617-3.8398 16.078-6.7188 20.879 3.2383-2.1602 8.2812-8.8789 9.3594-15.602 10.078l0.003906 0.003906c-20.141 2.6953-40.516-2.8398-56.52-15.359 0.78906-1.7344 1.7539-3.3828 2.8789-4.9219 1.9414-1.4648 3.9883-2.7891 6.1211-3.9609z" />
        <path d="m627.36 734.16 5.1602 7.4414c-6.5 6.7266-14.883 11.336-24.047 13.219-9.1641 1.8867-18.684 0.95703-27.312-2.6602-7.1992-2.3984-17.52-4.3203-16.68-15.719 8.2812-7.0781 13.199 2.2812 19.559 2.0391 6.3594-0.23828 15.602 0 23.398 0h0.003906c6.7109-1.082 13.359-2.5234 19.918-4.3203z" />
      </g>
    </svg>
  );
};

export const RelievedIcon = ({
  className,
}: {
  className?: string;
}): React.ReactElement => {
  return (
    <svg
      version="1.1"
      viewBox="400 250 400 700"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        <path d="m600.84 300c8.7539 2.0625 17.664 3.3867 26.641 3.9609 20.746 0.44531 41.176 5.1836 60 13.918 15.359 6.2383 30.238 13.801 45.238 21.121 24.695 12.223 46.469 29.617 63.84 51 13.68 17.992 23.965 38.324 30.363 60 16.32 48 12 96.719 11.16 145.68-7.8008 36-11.16 73.32-22.32 108.84-6.3086 22.781-16.586 44.27-30.363 63.48-14.039 18.719-26.641 38.641-41.281 56.879h0.003906c-13.789 15.203-29.02 29.027-45.48 41.281-36 29.762-77.281 36-121.32 33.602-4.0703 0.17188-8.1367-0.39844-12-1.6836-35.039-14.762-72-24.961-99.961-54-1.9648-2.207-4.1797-4.1797-6.5977-5.8789-33.359-21.121-49.32-54.602-63.84-89.16-8.9023-19.574-15.66-40.051-20.16-61.078-5.2812-27.719-9.8398-55.441-13.801-84-0.43359-8.7773-0.03125-17.578 1.1992-26.281 0.70703-2.7812 0.94922-5.6602 0.71875-8.5195-5.8789-24.961 2.1602-48 8.2812-72 2.25-7.4961 4.0898-15.105 5.5195-22.801 4.0625-23.277 12.184-45.656 24-66.121 17.129-32.074 42.422-59.062 73.32-78.238 12.078-6.3984 25.012-11.047 38.398-13.801 23.449-6.918 47.602-11.184 72-12.719 5.5742-0.66406 11.078-1.8281 16.441-3.4805zm-223.08 258.36c0.71875 29.641-2.1602 51.359 5.0391 72 0.83203 3.9453 1.0352 7.9922 0.59766 12 0.21875 11.789 2.1992 23.48 5.8828 34.68 8.7617 27.84 14.398 56.52 29.52 82.32 14.191 25.699 32.516 48.891 54.238 68.641 19.004 16.922 40.809 30.406 64.441 39.84 9.9609 3.9609 20.039 7.9219 30.359 11.039 6.5664 1.9062 13.332 3.0312 20.16 3.3594 8.7617 0 17.641-0.71875 26.398-0.71875 18.797-0.42578 37.109-6.0312 52.922-16.199 22.555-11.898 42.664-27.938 59.281-47.281 7.1992-9.3594 15.121-18.121 21.719-27.84 15.68-20.012 29.422-41.465 41.039-64.078 8.7656-20.785 15.207-42.48 19.199-64.68 8.1836-38.328 12.723-77.34 13.562-116.52 0.73438-27.297-2.1289-54.574-8.5195-81.121-10.227-41.445-36.008-77.367-72-100.32-23.277-14.621-48.059-26.691-73.922-36-20.059-7.957-41.559-11.637-63.121-10.801-17.52 1.1992-35.039 3.4805-52.559 4.1992-14.715 0.61328-29.211 3.7812-42.84 9.3594-24.176 8.4648-46.125 22.293-64.199 40.441-17.625 18.562-31.336 40.477-40.32 64.441-14.762 42.48-30.961 84.84-26.879 123.24z" />
        <path d="m532.68 572.16 36-36 7.3203 3.8398c0 2.1602 0.96094 4.3203 0 5.6406-10.57 17.125-23.957 32.34-39.602 45-27.238 10.441-45.359-5.3984-63.48-19.32h0.003906c-3.9766-5.1875-3.0703-12.605 2.0391-16.68 19.078 3.7188 30.598 26.758 57.719 17.52z" />
        <path d="m708 578.4-15 6.9609c-22.684-1.4258-43.227-13.891-54.961-33.359l5.5195-11.398c13.078 4.5586 18.238 16.68 30.359 22.559h20.398l22.801-29.16 8.1602 5.3984c-1.4375 15.84-16.316 24.602-17.277 39z" />
        <path d="m620.76 789.36c6.7188 6.6016 4.5586 12 4.9219 19.32l-20.281 17.039-29.402-10.559c-2.5273-3.5664-3.9609-7.7891-4.1328-12.156-0.16797-4.3672 0.93359-8.6914 3.1719-12.445 14.922-4.0742 30.605-4.4883 45.723-1.1992z" />
        <path d="m572.76 683.16c24 6.2383 24 6.2383 51.961-4.6797l6.1211 7.3203-20.641 18.719c-15.719 0-30.719 6.1211-42.121-9.4805z" />
        <path d="m709.56 441.12c-8.2812-1.6797-12-2.0391-15.238-3.1211-3.2383-1.0781-7.0781-3-10.922-4.6797l-11.398 3.4805-12 2.8789-8.8789-7.6797c1.8555-5.7031 5.7812-10.504 11-13.457s11.355-3.8477 17.199-2.5039c7.1758-0.007812 14.129 2.4922 19.652 7.0742 5.5234 4.582 9.2695 10.953 10.586 18.008z" />
        <path d="m485.4 451.56c-0.96094-12 5.7617-14.762 11.281-18.121 7.6797-4.8008 7.8008-4.5586 24.719-3.1211 5.5195 4.1992 4.8008 9.9609 3.4805 15.719-1.5586 1.1992-3.1211 3.3594-4.4414 3.2383l0.003906 0.007812c-5.5312-1.2812-11.145-2.1641-16.801-2.6406-6.2383 0.99219-12.352 2.6406-18.242 4.918z" />
      </g>
    </svg>
  );
};

export const HappyIcon = ({
  className,
}: {
  className?: string;
}): React.ReactElement => {
  return (
    <svg
      version="1.1"
      viewBox="400 250 400 700"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        <path d="m370.32 600c-0.43359-47.383 8.582-94.379 26.52-138.24 2.3984-6.3594 4.3203-12.961 6.4805-19.441 11.734-33.316 32.207-62.871 59.281-85.559 29.695-24.039 64.641-40.73 102-48.723 42.156-10.297 86.598-5.2773 125.4 14.16 29.676 13.051 56.473 31.855 78.84 55.32 20.203 21.488 35.156 47.363 43.68 75.602 7.4375 22.262 12.113 45.355 13.922 68.758 1.1992 19.441 2.5195 39 3.6016 58.559l-0.003907 0.003906c1.5195 29.398-2.0938 58.84-10.68 87-9.8398 33.719-19.199 67.801-40.199 97.078-11.281 15.961-21.238 32.879-32.039 49.199-10.457 14.199-22.098 27.488-34.801 39.723-14.734 15.859-33.805 27.043-54.84 32.16-19.527 6.0781-39.637 10.102-60 12-27.625 0.51172-54.766-7.3086-77.879-22.441-21.453-11.887-40.992-26.938-57.961-44.641-17.012-16.32-31.094-35.438-41.641-56.52-2.7188-6.4375-6.2656-12.488-10.559-18-19.199-24.961-25.32-54.961-31.32-84-6.2734-23.457-8.9062-47.742-7.8008-72zm80.16-214.08c-20.551 29.238-36.121 61.676-46.082 96-11.184 35.477-17.246 72.367-18 109.56-0.074219 21.344 1.6133 42.656 5.043 63.719 5.6484 36.879 18.797 72.207 38.637 103.8 12.746 20.941 27.758 40.418 44.762 58.078 19.902 19.074 42.406 35.234 66.84 48 20.422 12.273 44.488 17.027 68.039 13.441 16.195-3.1719 32.219-7.1758 48-12 11.516-2.7539 22.184-8.2734 31.082-16.078 19.848-16.109 37.199-35.078 51.48-56.281 16.926-25.238 31.926-51.711 44.879-79.199 6.8398-17.281 13.922-34.441 20.641-50.879v-0.003906c-0.36328-9.1328 0.35938-18.277 2.1602-27.238 4.4922-17.133 6.1562-34.891 4.918-52.559 0.68359-31.402-1.4023-62.805-6.2383-93.84-3.9609-25.922-13.016-50.801-26.641-73.203-17.344-27.617-41.309-50.469-69.719-66.477-36-20.281-73.801-36.961-117.12-31.559-7.6797 1.0781-15.359 2.2812-22.922 3.8398-10.559 2.3984-20.879 5.5195-31.32 7.8008l0.003906-0.003906c-19 3.9805-36.949 11.91-52.684 23.281l-10.078 17.879z" />
        <path d="m681.96 533.88v28.082c-1.7188 6.1055-5.9062 11.223-11.555 14.113s-12.246 3.3008-18.207 1.125c-8.1602-9.1211-17.52-18.48-15.602-32.52h0.003906c0.3125-6.5117 2.5586-12.785 6.4453-18.023 3.8906-5.2344 9.2461-9.1953 15.395-11.375 10.074 2.6797 18.59 9.4102 23.52 18.598z" />
        <path d="m548.16 766.92c14.039 8.7617 25.32 20.16 42.238 24 13.25-1.8477 25.285-8.7227 33.602-19.203 7.2266-9.5547 17.523-16.336 29.16-19.199l3.2383 3.6016c0 2.6406 0 4.8008-1.3203 6-9.7188 10.801-19.68 21.48-29.641 32.16h0.003906c-2.0391 2.1406-4.293 4.0703-6.7227 5.7578-6.8789 5.5547-15.352 8.7578-24.184 9.1484-8.832 0.38672-17.555-2.0586-24.895-6.9883-10.82-4.6797-19.922-12.602-26.039-22.68-1.8008-4.6797-1.3203-7.918 4.5586-12.598z" />
        <path d="m502.08 582-15.719-6c-6.4805-13.418-6.4805-29.062 0-42.48 1.832-4.1641 4.9922-7.6016 8.9883-9.7734s8.6016-2.957 13.094-2.2266c5.9727 3.9414 10.637 9.5742 13.395 16.18 2.7578 6.6055 3.4805 13.883 2.0859 20.902-0.43359 5.8008-2.8359 11.285-6.8047 15.539-3.9727 4.2578-9.2773 7.0273-15.039 7.8594z" />
        <path d="m573.24 690.12c11.059-0.82031 21.035-6.9453 26.762-16.441l7.6797 3.9609-10.68 20.52-26.398 9.6016c-5.2344-0.30078-10.227-2.3047-14.211-5.707-3.9883-3.4023-6.7539-8.0156-7.8711-13.133l5.0391-6.7188c8.5195-2.5234 12.121 9.3555 19.68 7.918z" />
        <path d="m666.48 437.76c-7.6797-1.5586-16.199 3.2383-22.441-4.3203 0-1.8008 0-4.1992 0.71875-5.2812h0.003907c3.5742-4.1094 8.2773-7.0742 13.527-8.5273 5.25-1.4492 10.812-1.3242 15.992 0.36719 7.2969 3.1172 12.773 9.3906 14.879 17.039 0.058594 3.4336-0.51172 6.8516-1.6797 10.082-11.16 3.1172-13.441-8.5195-21-9.3594z" />
        <path d="m518.4 436.68h-24l-16.32 10.441-5.0391-8.3984v-0.003906c6.1055-10.379 16.914-17.105 28.922-18 7.5586-0.71875 11.398 2.1602 16.438 15.961z" />
      </g>
    </svg>
  );
};

export const ViewListIcon = ({
  className,
}: {
  className?: string;
}): React.ReactElement => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.5"
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 6h16M4 10h16M4 14h16M4 18h16"
      />
    </svg>
  );
};
