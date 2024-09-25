import React, {FC, memo} from "react";
import styles from "./styles.module.scss";

interface Props {
    className?: string;
}

export const LongHorizontalRectangularAnnouncement: FC<Props> = memo(function LongHorizontalRectangularAnnouncement(props = {}) {
    return (
        <div className={styles.longHorizontalRectangularAdContainer}>
            <img className={styles.imageAd} src="/src/ui/web/assets/vnc-long-horizontal-rectangular-ad.jpeg" />
        </div>
    );
});

export default LongHorizontalRectangularAnnouncement;
