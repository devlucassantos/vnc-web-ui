import React, {FC, memo} from "react";
import styles from "./styles.module.scss";

interface Props {
    className?: string;
}

export const LongVerticalRectangularAnnouncement: FC<Props> = memo(function LongVerticalRectangularAnnouncement(props = {}) {
    return (
        <div className={styles.container}>
            <img className={styles.image} src="/src/ui/web/assets/long-vertical-rectangular-ad.png" />
        </div>
    );
});

export default LongVerticalRectangularAnnouncement;
