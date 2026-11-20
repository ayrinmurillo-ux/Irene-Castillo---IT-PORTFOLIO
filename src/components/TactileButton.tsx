import type {AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode} from 'react';
import {playTactileClick} from '../utils/tactileAudio';

type TactileVariant = 'primary' | 'secondary' | 'subtle';
type TactileSize = 'sm' | 'md' | 'lg';

interface BaseProps {
  variant?: TactileVariant;
  size?: TactileSize;
  soundEnabled?: boolean;
  soundTone?: 'press' | 'confirm' | 'tab';
  children: ReactNode;
  className?: string;
}

type ButtonProps = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    as?: 'button';
  };

type AnchorProps = BaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    as: 'a';
    href: string;
  };

export type TactileButtonProps = ButtonProps | AnchorProps;

const SIZE_CLASSES: Record<TactileSize, string> = {
  sm: 'min-h-[40px] px-4 py-2 text-xs gap-1.5',
  md: 'min-h-[44px] px-5 py-2.5 text-sm gap-2',
  lg: 'min-h-[48px] px-6 py-3 text-sm gap-2.5',
};

const VARIANT_CLASSES: Record<TactileVariant, string> = {
  primary: [
    'bg-[#EBC8C3] text-[#1D060B] border border-[#F7E5E2]',
    'shadow-[0_4px_0_#9B6F6C,0_10px_22px_-6px_rgba(0,0,0,0.45)]',
    'hover:bg-[#F5DBD7] hover:-translate-y-[1px] hover:shadow-[0_5px_0_#9B6F6C,0_12px_24px_-6px_rgba(0,0,0,0.5)]',
    'active:translate-y-[3px] active:shadow-[0_1px_0_#9B6F6C]',
  ].join(' '),
  secondary: [
    'bg-[#2C0912] text-[#F7E5E2] border border-[#EBC8C3]/35',
    'shadow-[0_4px_0_#0D0205,0_8px_18px_-6px_rgba(0,0,0,0.4)]',
    'hover:bg-[#3E0D18] hover:border-[#EBC8C3]/60 hover:-translate-y-[1px] hover:shadow-[0_5px_0_#0D0205]',
    'active:translate-y-[3px] active:shadow-[0_1px_0_#0D0205]',
  ].join(' '),
  subtle: [
    'bg-[#23090F] text-[#EBC8C3] border border-[#EBC8C3]/20',
    'shadow-[0_3px_0_#0D0205]',
    'hover:bg-[#310B14] hover:border-[#EBC8C3]/40 hover:-translate-y-[1px] hover:shadow-[0_4px_0_#0D0205]',
    'active:translate-y-[2px] active:shadow-[0_1px_0_#0D0205]',
  ].join(' '),
};

const BASE_CLASSES =
  'inline-flex items-center justify-center rounded-full font-semibold tracking-tight whitespace-nowrap shrink-0 select-none cursor-pointer transition-[transform,box-shadow,background-color,border-color] duration-150 ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EBC8C3] focus-visible:ring-offset-2 focus-visible:ring-offset-[#160509] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none';

export function TactileButton(props: TactileButtonProps) {
  const {
    variant = 'primary',
    size = 'md',
    soundEnabled = true,
    soundTone = 'press',
    children,
    className = '',
    ...rest
  } = props;

  const classes = `${BASE_CLASSES} ${SIZE_CLASSES[size]} ${VARIANT_CLASSES[variant]} ${className}`;

  if (props.as === 'a') {
    const {onClick, href, ...anchorRest} = rest as AnchorProps;
    return (
      <a
        href={href}
        className={classes}
        onClick={(e) => {
          playTactileClick(soundEnabled, soundTone);
          onClick?.(e);
        }}
        {...anchorRest}
      >
        {children}
      </a>
    );
  }

  const {onClick, type = 'button', ...buttonRest} = rest as ButtonProps;
  return (
    <button
      type={type}
      className={classes}
      onClick={(e) => {
        playTactileClick(soundEnabled, soundTone);
        onClick?.(e);
      }}
      {...buttonRest}
    >
      {children}
    </button>
  );
}
