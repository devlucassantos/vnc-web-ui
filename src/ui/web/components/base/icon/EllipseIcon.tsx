import { memo, SVGProps } from 'react';

const EllipseIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg preserveAspectRatio='none' viewBox='0 0 30 24' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
    <ellipse cx={14} cy={14} rx={14} ry={14} fill='#0047AB' />
  </svg>
);

const Memo = memo(EllipseIcon);
export { Memo as EllipseIcon };
