import {FC, memo} from "react";
import styles from "./styles.module.scss";
import TrendingInfoContainer from "./infoContainer";
import Article from "@models/Article";

interface Props {
    className?: string;
    trendingArticleList: Article[];
    color?: string;
}

export const TrendingContainer: FC<Props> = memo(function TrendingContainer({
    trendingArticleList,
    color = '#0047ab',
    ...props
}) {
    return (
        <div className={styles.trendingContainer}>
            {trendingArticleList &&
                <>
                    {trendingArticleList?.map((trendingArticle, index) => (
                        <div key={index} className={styles.trendingItem}>
                            <TrendingInfoContainer key={index} trendingArticle={trendingArticle} index={index} color={color}/>
                            {index !== trendingArticleList.length - 1 && <div className={styles.divider} />}
                        </div>
                    ))}
                </>
            }
        </div>
    );
});

export default TrendingContainer;
