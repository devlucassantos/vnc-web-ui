import React, {FC, memo} from "react";
import styles from "./styles.module.scss";
import TimeLineContainer from "./container";
import TrendingContainer from "../trending";
import RectangularAnnouncement from "../announcement/rectangular";
import News from "../../../../../core/domain/models/News";

export const TimeLine: React.FC<{ newsList: News[] }> = ({ newsList }) =>  {
    const totalItems = newsList.length;

    return (
        <div className={styles.timeLineRow}>
            <div className={styles.timeLineLeftColumn}>
                {newsList.map((news, index) => (
                    <TimeLineContainer key={index} news={news} isLastItem={index === totalItems - 1} />
                ))}
            </div>
            <div className={styles.timeLineRightColumn}>
                <TrendingContainer />
                <RectangularAnnouncement />
            </div>
        </div>
    );
};

export default TimeLine;