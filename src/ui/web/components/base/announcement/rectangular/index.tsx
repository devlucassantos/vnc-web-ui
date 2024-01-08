import {FC, memo} from "react";
import styles from "./styles.module.scss";

interface Props {
    className?: string;
}

export const RectangularAnnouncement: FC<Props> = memo(function RectangularAnnouncement(props = {}) {
    return (
        <div className={styles.container}>
            <div className={styles.image}></div>
        </div>
    );
});

export default RectangularAnnouncement;