import React, {FC, memo} from "react";
import styles from "./styles.module.scss";
import AdsComponent from "@components/base/adsComponent";

interface Props {
    className?: string;
}

export const ShortRectangularAnnouncement: FC<Props> = memo(function ShortRectangularAnnouncement(props = {}) {
    return (
      <div className={styles.container}>
        <div className={styles.image}>
          { process.env.NODE_ENV === 'production' ?
            (
              <img className={styles.image} src="/src/ui/web/assets/vnc-short-rectangular-ad.jpeg"/>
              // TODO: This code will be uncommented after configuring Google ADS
              // <AdsComponent dataAdSlot="2475307526"/>
            ) :
            (
            <img className={styles.image} src="/src/ui/web/assets/vnc-short-rectangular-ad.jpeg"/>
            )
          }
        </div>
      </div>
    );
});

export default ShortRectangularAnnouncement;
