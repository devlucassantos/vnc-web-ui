import {FC, memo} from "react";
import styles from "./styles.module.scss";
import TimeLineIndicator from "../indicator";
import SmallCard from "../../../news/cards/smallCard";
import News from "../../../../../../core/domain/models/News";

interface Props {
    className?: string;
    isLastItem?: boolean;
    news: News
}

export const TimeLineContainer: FC<Props> = memo(function TimeLineContainer({
    isLastItem,
    news,
    ...props
}) {
    return (
        <div className={styles.timeLineContainer}>
            <TimeLineIndicator useSmallIndicator={isLastItem} />
            <SmallCard news={news} />
        </div>
    );
});

export default TimeLineContainer;
