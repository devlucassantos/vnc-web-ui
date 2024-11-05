import React, {FC, memo} from "react";
import styles from "./styles.module.scss";

interface Props {
    className?: string;
}

export const LongVerticalRectangularAnnouncement: FC<Props> = memo(function LongVerticalRectangularAnnouncement(props = {}) {
    return (
        <div className={styles.container}>
            <div className={styles.image}>
              { process.env.NODE_ENV === 'production' ?
                (
                  <img className={styles.image} src="/src/ui/web/assets/long-vertical-rectangular-ad.png" />
                  // TODO: This code will be uncommented after configuring Google ADS
                  // <AdsComponent dataAdSlot="4554675950" />
                ) :
                (
                  <img className={styles.image} src="/src/ui/web/assets/long-vertical-rectangular-ad.png" />
                )
              }
            </div>
        </div>
    );
});

export default LongVerticalRectangularAnnouncement;
