import {FC, memo} from "react";
import styles from "./styles.module.scss";
import TrendingInfoContainer from "./infoContainer";
import News from "@models/News";

interface Props {
    className?: string;
    trendingNewsList: News[];
}

export const TrendingContainer: FC<Props> = memo(function TrendingContainer({
    trendingNewsList,
    ...props
}) {
    return (
        <div className={styles.trendingContainer}>
            <div className={styles.titleContainer}>
                <h2 className={styles.title}>Mais lidas</h2>
            </div>
            {trendingNewsList &&
                <>
                    <div className={styles.trendingInfoContainer}>
                        {trendingNewsList?.map((trendingNews, index) => (
                            <TrendingInfoContainer key={index} trendingNews={trendingNews} index={index} isFirstItem={index === 0} />
                        ))}
                    </div>
                </>
            }
        </div>
    );
});

export default TrendingContainer;
