import {FC, memo} from "react";
import styles from "./styles.module.scss";

interface Props {
    className?: string;
}

export const ShortRectangularAnnouncement: FC<Props> = memo(function ShortRectangularAnnouncement(props = {}) {
    return (
        <div className={styles.container}>
            <div className={styles.image}></div>
        </div>
    );
});

export default ShortRectangularAnnouncement;
