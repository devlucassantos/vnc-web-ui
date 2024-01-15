import {FC, memo} from "react";
import styles from "./styles.module.scss";
import News from "@models/News";

interface Props {
    className?: string;
    index: number;
    trendingNews: News;
    isFirstItem: boolean;
}

export const TrendingInfoContainer: FC<Props> = memo(function TrendingInfoContainer({
    index,
    trendingNews,
    isFirstItem,
    ...props
}) {
    const handleRedirect  = () => {
        window.location.assign((trendingNews.type === "Proposição" ? "/detalhes-da-proposicao/" : "/detalhes-do-boletim/") + trendingNews.id);
    };

    return (
        <div className={`${styles.titleContainer} ${!isFirstItem ? styles.borderTop : ''}`}>
            <div className={styles.trendingNumber}>{index + 1}</div>
            <div className={styles.title} onClick={handleRedirect}>{trendingNews.title}</div>
        </div>
    );
});

export default TrendingInfoContainer;