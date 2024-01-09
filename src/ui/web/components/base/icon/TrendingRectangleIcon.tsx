import { memo, SVGProps } from 'react';

const TrendingRectangleIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg preserveAspectRatio='none' viewBox='0 0 293 35' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
    <path
      d='M0 6C0 2.68629 2.68629 0 6 0L287 0C290.314 0 293 2.68629 293 6V28.5654C293 31.8791 290.314 34.5654 287 34.5654H6C2.6863 34.5654 0 31.8791 0 28.5654L0 6Z'
      fill='#0F52BA'
    />
  </svg>
);

const Memo = memo(TrendingRectangleIcon);
export { Memo as TrendingRectangleIcon };
