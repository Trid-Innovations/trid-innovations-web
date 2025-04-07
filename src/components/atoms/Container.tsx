import React from 'react';
import { twMerge } from 'tailwind-merge';

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}

export const Container: React.FC<ContainerProps> = ({
  children,
  maxWidth = 'xl',
  className,
  ...props
}) => {
  const maxWidths = {
    sm: 'max-w-screen-sm',
    md: 'max-w-screen-md',
    lg: 'max-w-screen-lg',
    xl: 'max-w-screen-xl',
    '2xl': 'max-w-screen-2xl',
  };

  return (
    <div
      className={twMerge(
        'mx-auto px-4 sm:px-6 lg:px-8',
        maxWidths[maxWidth],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}; 