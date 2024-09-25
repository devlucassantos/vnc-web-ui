import React from "react";
import TimeLineContainer from "./container";
import Article from "@models/Article";

export const TimeLine: React.FC<{ articleList: Article[]}> = ({ articleList}) =>  {
    const totalItems = articleList.length;

    return (
        <>
            {articleList.map((article, index) => (
                <TimeLineContainer key={index} article={article} isLastItem={index === totalItems - 1} />
            ))}
        </>
    );
};

export default TimeLine;
