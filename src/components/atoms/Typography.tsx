import React from 'react';
import { twMerge } from 'tailwind-merge';

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  variant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  className?: string;
}

export const Typography: React.FC<TypographyProps> = ({
  children,
  variant,
  className,
  ...props
}) => {
  const variants = {
    h1: 'text-4xl md:text-5xl font-bold',
    h2: 'text-3xl md:text-4xl font-bold',
    h3: 'text-2xl md:text-3xl font-bold',
    h4: 'text-xl md:text-2xl font-bold',
    h5: 'text-lg md:text-xl font-bold',
    h6: 'text-base md:text-lg font-bold',
    p: 'text-base leading-relaxed',
    span: 'text-base',
  };

  const Component = variant;

  return (
    <Component
      className={twMerge(variants[variant], className)}
      {...props}
    >
      {children}
    </Component>
  );
}; 