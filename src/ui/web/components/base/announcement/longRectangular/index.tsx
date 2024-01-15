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
            <div className={styles.imageAd}></div>
        </div>
    );
});

export default LongRectangularAnnouncement;
