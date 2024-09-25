import {FC, memo} from "react";
import styles from "./styles.module.scss";
import SmallCard from "../../../news/cards/smallCard";
import Article from "@models/Article";

interface Props {
    className?: string;
    isLastItem?: boolean;
    article: Article
}

export const TimeLineContainer: FC<Props> = memo(function TimeLineContainer({
    isLastItem,
    article,
    ...props
}) {
    return (
        <div className={styles.timeLineContainer}>
            <SmallCard article={article} />
            {!isLastItem && <div className={styles.divider}/>}
        </div>
    );
});

export default TimeLineContainer;
