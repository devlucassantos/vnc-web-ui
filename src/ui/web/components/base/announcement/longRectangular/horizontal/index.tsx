import React, {FC, memo} from "react";
import styles from "./styles.module.scss";
import AdsComponent from "@components/base/adsComponent";

interface Props {
    className?: string;
}

export const LongHorizontalRectangularAnnouncement: FC<Props> = memo(function LongHorizontalRectangularAnnouncement(props = {}) {
    return (
      <div className={styles.longHorizontalRectangularAdContainer}>
        <div className={styles.imageAd}>
          { process.env.NODE_ENV !== 'production' ?
            (
              <img className={styles.imageAd} src="/src/ui/web/assets/vnc-long-horizontal-rectangular-ad.jpeg"  alt={'Imagem de anúncio horizontal da plataforma Você na Câmara'} />
              // TODO: This code will be uncommented after configuring Google ADS
              // <AdsComponent dataAdSlot="8469740354" />
            ) :
            (
              <img className={styles.imageAd} src="/src/ui/web/assets/vnc-long-horizontal-rectangular-ad.jpeg"  alt={'Imagem de anúncio horizontal da plataforma Você na Câmara'} />
            )
          }
        </div>
      </div>
    );
});

export default LongHorizontalRectangularAnnouncement;
