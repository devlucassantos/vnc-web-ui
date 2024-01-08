import { memo, SVGProps } from 'react';

const MenuIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg preserveAspectRatio='none' viewBox='0 0 21 15' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
    <path d='M0 0H21' stroke='white' strokeWidth={4.39} strokeLinecap='round' />
    <path d='M0 7.5H21' stroke='white' strokeWidth={4.39} strokeLinecap='round' />
    <path d='M0 15H21' stroke='white' strokeWidth={4.39} strokeLinecap='round' />
  </svg>
);

const Memo = memo(MenuIcon);
export { Memo as MenuIcon };
