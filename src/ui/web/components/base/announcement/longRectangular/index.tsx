import React, {FC, memo} from "react";
import styles from "./styles.module.scss";

interface Props {
    className?: string;
}

export const LongRectangularAnnouncement: FC<Props> = memo(function LongRectangularAnnouncement(props = {}) {
    return (
        <div className={styles.longRectangularAdContainer}>
            <div className={styles.advertisingContainer}>
                <div className={styles.advertisingGrayRectangle}/>
                <div className={styles.advertisingLabel}>Publicidade</div>
            </div>
            <img className={styles.imageAd} src="/src/ui/web/assets/vnc-long-rectangular-ad.jpeg" />
        </div>
    );
});

export default LongRectangularAnnouncement;
