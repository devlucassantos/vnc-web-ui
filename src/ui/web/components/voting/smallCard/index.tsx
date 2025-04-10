import React, {FC, memo} from "react";
import styles from "./styles.module.scss";
import Article from "@models/Article";
import {Link} from "react-router-dom";
import styled from "styled-components";
import {Tooltip} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { Check, Close } from '@mui/icons-material';

interface Props {
  className?: string;
  article: Article;
}

const TitleDiv = styled.div<{ $hoverColor: string }>`
    &:hover {
        color: ${(props) => props.$hoverColor};
    }
`;

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-grow: 1;
`;

const RatingText = styled.span<{ $color: string }>`
  font-size: 1.2rem;
  margin-left: 4px;
  margin-top: 2px;
  color: ${(props) => props.$color};
`;

const CustomStarIcon = styled(StarIcon)<{ $color: string }>`
  color: ${(props) => props.$color};
  font-size: 28px;
`;

export const SmallVotingCard: FC<Props> = memo(function SmallVotingCard({
  article,
  ...props
}) {
  return (
    <div className={styles.smallCard}>
      <div className={styles.cardColumn}>
        <Link className={styles.titleContainer}
              to={"/voting-details/" + article.id}
              aria-label="Ir para a página de detalhes da votação">
          <div className={styles.titleContainerRow}>
            <div className={styles.line} style={{backgroundColor: `${article.type.color}`}}/>
            <TitleDiv className={styles.title}
                      $hoverColor={article.type.color}>{article.title}</TitleDiv>
            {!isNaN(article.averageRating) && (
              <RatingContainer>
                <Tooltip title="Média das avaliações">
                  <div className={styles.ratingContainer}>
                    <CustomStarIcon $color={article.type.color} aria-label="Ícone de estrela representando a média das avaliações"/>
                    <RatingText $color={article.type.color}>{article.averageRating.toFixed(1)}</RatingText>
                  </div>
                </Tooltip>
              </RatingContainer>
            )}
          </div>
        </Link>
        <div className={styles.dateRow}>
          <div className={styles.votingDate}>{"Data da Votação: "}{article.situation.resultAnnouncedAt}</div>
        </div>
        <div className={styles.content}>{article.content}</div>
        <div className={styles.dateRow}>
          <div className={styles.createdAt}>{article.createdAt}</div>
          {article.createdAt != article.updatedAt &&
              <div className={styles.updatedAt}>{"Atualizado em " + article.updatedAt}</div>}
        </div>
        <div className={article.situation.isApproved ? styles.approvedMessageContainer : styles.rejectedMessageContainer}>
          {article.situation.isApproved ? <Check /> : <Close />}
          <p className={styles.situationMessageText}>
            {article.situation.result}
          </p>
        </div>
      </div>
    </div>
  );
});

export default SmallVotingCard;
