import React, {FC, memo} from "react";
import styles from "./styles.module.scss";
import Article from "@models/Article";
import styled from "styled-components";
import article from "@models/Article";
import {Link} from "react-router-dom";

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

const handleRedirectUrl = (trendingArticle: article) => {
    const articleCode : string = trendingArticle.type.codes
    let redirectUrl : string
    if (articleCode === 'newsletter') {
        redirectUrl = '/newsletter-details/';
    } else if (articleCode === 'event') {
        redirectUrl = '/event-details/';
    } else if (articleCode === 'voting') {
        redirectUrl = '/voting-details/';
    } else {
        redirectUrl = '/proposition-details/';
    }

    return redirectUrl + trendingArticle.id
}

export const TrendingInfoContainer: FC<Props> = memo(function TrendingInfoContainer({
    index,
    trendingArticle,
    color,
    ...props
}) {
    const handleRedirect  = () => {
        window.location.assign((handleRedirectUrl(trendingArticle)));
    };

    return (
        <div className={`${styles.titleContainer}`}>
            <div className={styles.trendingNumber} style={{color: color}}>{index + 1}</div>
            <div className={styles.titleView}>
                <div className={styles.line} style={{outline: `solid 2px ${color}`}}/>
                <div className={styles.titleViewColumn}>
                    <TitleDiv className={styles.title} $hoverColor={color} onClick={handleRedirect}>{trendingArticle.title}</TitleDiv>
                    {trendingArticle.type.codes === 'voting' && (
                      <Link className={styles.titleContainer}
                            to={"/voting-details/" + trendingArticle.id}
                            aria-label="Ir para a página de detalhes da votação">
                          <div className={styles.titleContainerRow}>
                              <TitleDiv className={styles.content} $hoverColor={color} onClick={handleRedirect}>{trendingArticle.content} </TitleDiv>
                          </div>
                      </Link>
                    )}
                </div>
            </div>
        </div>
    );
});

export default TrendingInfoContainer;
