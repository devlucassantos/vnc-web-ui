import {FC, memo} from "react";
import styles from "./styles.module.scss";
import {TrendingRectangleIcon} from "../icon/TrendingRectangleIcon";
import TrendingInfoContainer from "./infoContainer";

interface Props {
    className?: string;
}

export const TrendingContainer: FC<Props> = memo(function TrendingContainer(props = {}) {
    return (
        <div className={styles.trendingContainer}>
            <div className={styles.titleContainer}>
                <TrendingRectangleIcon className={styles.icon} />
                <div className={styles.title}>Destaques</div>
            </div>
            <div className={styles.trendingInfoContainer}>
                {[...Array(5)].map((_, index) => (
                    <TrendingInfoContainer key={index} />
                ))}
            </div>
        </div>
    );
});

export default TrendingContainer;