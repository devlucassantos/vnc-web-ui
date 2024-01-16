import React, {FC, memo} from "react";
import TimeLineContainer from "./container";
import News from "../../../../../core/domain/models/News";

export const TimeLine: React.FC<{ newsList: News[]}> = ({ newsList}) =>  {
    const totalItems = newsList.length;

    return (
        <>
            {newsList.map((news, index) => (
                <TimeLineContainer key={index} news={news} isLastItem={index === totalItems - 1} />
            ))}
        </>
    );
};

export default TimeLine;
