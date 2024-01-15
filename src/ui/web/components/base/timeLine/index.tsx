import React, {FC, memo} from "react";
import styles from "./styles.module.scss";
import TimeLineContainer from "./container";
import TrendingContainer from "../trending";
import ShortRectangularAnnouncement from "../announcement/shortRectangular";
import News from "../../../../../core/domain/models/News";
import CustomPagination from "@components/base/customPagination";

export const TimeLine: React.FC<{ newsList: News[], maxPageCount: number, actionOnChangePagination: Function }> = ({ newsList, maxPageCount, actionOnChangePagination }) =>  {
    const totalItems = newsList.length;

    return (
        <div className={styles.timeLineRow}>
            <div className={styles.timeLineLeftColumn}>
                {newsList.map((news, index) => (
                    <TimeLineContainer key={index} news={news} isLastItem={index === totalItems - 1} />
                ))}
                {maxPageCount != 0 && <CustomPagination count={maxPageCount} actionOnChange={actionOnChangePagination} />}
            </div>
            <div className={styles.timeLineRightColumn}>
                <TrendingContainer />
                <ShortRectangularAnnouncement />
            </div>
        </div>
    );
};

export default TimeLine;
