import {FC, memo} from "react";
import styles from "./styles.module.scss";

interface Props {
    className?: string;
}

export const TrendingInfoContainer: FC<Props> = memo(function TrendingInfoContainer(props = {}) {
    return (
        <div className={styles.infoContainer}>
            <div className={styles.titleContainer}>
                <div className={styles.title}>Lorem Ipsum dolor sit</div>
                <div className={styles.infoIcon}></div>
            </div>
            <div className={styles.time}>1h ago</div>
        </div>
    );
});

export default TrendingInfoContainer;