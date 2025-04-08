import React, {FC, memo, useEffect} from 'react';

interface Props {
  dataAdSlot: string
}

export const AdsComponent: FC<Props> = memo(function AdsComponent({
  dataAdSlot
}) {

  useEffect(() => {
    const pushAd = () => {
      try {
        const adsbygoogle = window.adsbygoogle
        adsbygoogle.push({})
      } catch (e) {
        console.error(e)
      }
    }

    let interval = setInterval(() => {
      if (window.adsbygoogle) {
        pushAd()
        clearInterval(interval)
      }
    }, 300)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <>
      <ins className="adsbygoogle"
           style={{display: "block"}}
           data-ad-client="ca-pub-1217526194766570"
           data-ad-slot={dataAdSlot}
           data-ad-format="auto"
           data-full-width-responsive="true"
      >
      </ins>
    </>
  );
});

export default AdsComponent;
