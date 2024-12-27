import {FC, memo} from "react";
import styles from "./styles.module.scss";
import Article from "@models/Article";
import styled from "styled-components";

interface Props {
    className?: string;
    index: number;
    trendingArticle: Article;
    color: string;
}

const TitleDiv = styled.div<{ $hoverColor: string }>`
  &:hover {
    color: ${(props) => props.$hoverColor};
  }
`;

export const TrendingInfoContainer: FC<Props> = memo(function TrendingInfoContainer({
    index,
    trendingArticle,
    color,
    ...props
}) {
    const handleRedirect  = () => {
        window.location.assign((trendingArticle.type.description !== "Boletins" ? "/proposition-details/" : "/newsletter-details/") + trendingArticle.id);
    };

    return (
        <div className={`${styles.titleContainer}`}>
            <div className={styles.trendingNumber} style={{color: color}}>{index + 1}</div>
            <div className={styles.titleView}>
                <div className={styles.line} style={{outline: `solid 2px ${color}`}}/>
                <TitleDiv className={styles.title} $hoverColor={color} onClick={handleRedirect}>{trendingArticle.title}</TitleDiv>
            </div>
        </div>
    );
});

export default TrendingInfoContainer;
