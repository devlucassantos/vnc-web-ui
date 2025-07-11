import {FC, memo} from "react";
import styles from "./styles.module.scss";
import SmallCard from "../../../news/cards/smallCard";
import Article from "@models/Article";
import SmallEventCard from "@components/event/smallCard";
import SmallVotingCard from "@components/voting/smallCard";

interface Props {
    className?: string;
    isLastItem?: boolean;
    article: Article
}

const handleCardByArticleType = (article : Article) => {
    const articleCode = article.type.codes
    if (articleCode === 'event') {
        return <SmallEventCard article={article} />
    } else if (articleCode === 'voting') {
        return <SmallVotingCard article={article} />
    } else {
        return <SmallCard article={article} />
    }
}

export const TimeLineContainer: FC<Props> = memo(function TimeLineContainer({
    isLastItem,
    article,
    ...props
}) {
    return (
        <div className={styles.timeLineContainer}>
            {handleCardByArticleType(article)}
            {!isLastItem && <div className={styles.divider}/>}
        </div>
    );
});

export default TimeLineContainer;
