import React, {FC, memo} from "react";
import styles from "./styles.module.scss";
import Article from "@models/Article";
import {Link} from "react-router-dom";
import styled from "styled-components";
import VideoCard from "@components/base/videoCard";
import {formatEventDate} from "@utils/dateUtils";

interface Props {
  className?: string;
  article: Article;
}

const TitleDiv = styled.div<{ $hoverColor: string }>`
    &:hover {
        color: ${(props) => props.$hoverColor};
    }
`;

export const SmallEventCard: FC<Props> = memo(function SmallEventCard({
  article,
  ...props
}) {
  return (
    <div className={styles.smallCard}>
      <div className={styles.leftCardColumn}>
        <VideoCard url={article.multimediaUrl} color={article.type.color} isSmallCard={true}/>
      </div>
      <div className={styles.infoContainer}>
        <div className={styles.line} style={{backgroundColor: `${article.type.specificType.color}`}}/>
        <div className={styles.cardColumn}>
          <Link className={styles.titleContainer}
                to={"/event-details/" + article.id}
                aria-label="Ir para a página de detalhes do evento">
            <div className={styles.titleContainerRow}>
              <TitleDiv className={styles.title}
                        $hoverColor={article.type.specificType.color}>{article.title}</TitleDiv>
            </div>
          </Link>
          <div className={styles.titleContainerRow}>
            <div className={styles.subTitle}
                 style={{color: article.type.specificType.color}}>{article.type.specificType.description}</div>
          </div>
          <div className={styles.dateRow}>
            <div
              className={styles.eventDate}>{formatEventDate(article.situation.startsAt, article.situation.endsAt)}</div>
          </div>
          <div className={styles.titleContainerRow}>
            <div className={styles.content}>{article.content}</div>
          </div>
          <div className={styles.titleContainerRow}>
            <div className={styles.subTitle}
                 style={{color: article.situation.color}}>{article.situation.description}</div>
          </div>
          <div className={styles.dateRow}>
            <div className={styles.createdAt}>{article.createdAt}</div>
            {article.createdAt != article.updatedAt &&
                <div className={styles.updatedAt}>{"Atualizado em " + article.updatedAt}</div>}
          </div>
        </div>
      </div>
    </div>
  );
});

export default SmallEventCard;
