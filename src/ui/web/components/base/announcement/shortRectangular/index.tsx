import {FC, memo} from "react";
import styles from "./styles.module.scss";

interface Props {
    className?: string;
}

export const ShortRectangularAnnouncement: FC<Props> = memo(function ShortRectangularAnnouncement(props = {}) {
    return (
        <div className={styles.container}>
            <img className={styles.image} src="/src/ui/web/assets/vnc-short-rectangular-ad.jpeg" />
        </div>
    );
});

export default ShortRectangularAnnouncement;
