import React, { FC, memo, useEffect, useRef, useState } from 'react';

interface Props {
  dataAdSlot: string;
}

export const AdsComponent: FC<Props> = memo(function AdsComponent({
  dataAdSlot,
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldLoadAd, setShouldLoadAd] = useState(false);
  const adPushed = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setShouldLoadAd(true);
            observer.disconnect();
          }
        },
        {
          root: null,
          rootMargin: '0px',
          threshold: 0.1,
        }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (shouldLoadAd && window.adsbygoogle && !adPushed.current) {
      let interval = setInterval(() => {
        const adEl = containerRef.current?.querySelector('.adsbygoogle') as HTMLElement;
        const width = adEl?.offsetWidth || 0;

        if (width > 0) {
          try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
            adPushed.current = true;
          } catch (e) {
            console.error(e);
          } finally {
            clearInterval(interval);
          }
        }
      }, 300);

      return () => clearInterval(interval);
    }
  }, [shouldLoadAd]);

  return (
      <div ref={containerRef} style={{ width: '100%' }}>
        {shouldLoadAd && (
            <ins
                className="adsbygoogle"
                style={{ display: 'block' }}
                data-ad-client="ca-pub-1217526194766570"
                data-ad-slot={dataAdSlot}
                data-ad-format="auto"
                data-full-width-responsive="true"
            />
        )}
      </div>
  );
});

export default AdsComponent;
