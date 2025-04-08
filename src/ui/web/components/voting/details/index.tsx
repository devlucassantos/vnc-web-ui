import React, {FC, memo} from "react";
import styles from "./styles.module.scss";
import {Link} from "react-router-dom";
import styled from "styled-components";
import DIContainer from "@web/dicontainer";
import StarRating from "@components/base/startRating";
import StarIcon from "@mui/icons-material/Star";
import ViewLaterButton from "@components/base/viewLater";
import {Tooltip} from "@mui/material";
import Voting from "@models/Voting";
import {Check, Close} from "@mui/icons-material";
import AccordionItem from "@components/base/accordionItem";
import TimeLine from "@components/base/timeLine";

interface Props {
  className?: string;
  voting: Voting
}

const RatingContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    flex-grow: 1;
`;

const RatingText = styled.span`
    font-size: 1.2rem;
    margin-left: 4px;
    margin-top: 2px;
`;

const CustomStarIcon = styled(StarIcon)`
    color: #0047AB;
    font-size: 28px;
`;

const RowContainer = styled.div`
    display: flex;
    align-items: center;
    margin-left: 3%;
    margin-right: 3%;
    margin-top: 16px;
`;

const articleService = DIContainer.getArticleUseCase();

export const VotingDetailsCard: FC<Props> = memo(function VotingDetailsCard({
  voting,
  ...props
}) {
  const handleRatingSubmit = async (rating: number) => {
    await articleService.saveArticleRating(voting.id, rating);
  };

  const handleViewLaterSubmit = async (viewLater: boolean) => {
    await articleService.saveArticleToViewLater(voting.id, viewLater);
  };

  return (
    <div className={styles.card}>
      <div className={styles.titleContainer}>
        <div className={styles.titleContainerRow}>
          <div className={styles.line}/>
          <div className={styles.title}>{voting.title}</div>
        </div>
        <StarRating onSubmitRating={handleRatingSubmit} initialRating={voting.userRating ?? 0}/>
      </div>
      <RowContainer>
        <ViewLaterButton onViewLaterSubmit={handleViewLaterSubmit} initialSelected={voting.viewLater}/>
        {!isNaN(voting.averageRating) && (
          <RatingContainer>
            <Tooltip title="Média das avaliações">
              <div className={styles.ratingContainer}>
                <CustomStarIcon aria-label="Ícone de estrela representando a média das avaliações"/>
                <RatingText>{voting.averageRating.toFixed(1)}</RatingText>
              </div>
            </Tooltip>
          </RatingContainer>
        )}
      </RowContainer>
      <div className={styles.dateRow}>
        <div className={styles.votingDate}>{voting.resultAnnouncedAt}</div>
      </div>
      <div
        className={styles.legislativeBody}>{'Órgão Responsável: ' + voting.legislativeBody.name + ` (${voting.legislativeBody.acronym})`}</div>
      <div className={styles.content}>{voting.content}</div>
      <div className={styles.createdAt}>
        {voting.createdAt}
        {voting.createdAt !== voting.updatedAt && " - Atualizado em " + voting.updatedAt}
      </div>
      <div
        className={voting.isApproved ? styles.approvedMessageContainer : styles.rejectedMessageContainer}>
        {voting.isApproved ? <Check className={styles.iconContainer}/> : <Close className={styles.iconContainer}/>}
        <p className={styles.situationMessageText}>
          {voting.result}
        </p>
      </div>
      {(voting.events || voting.mainProposition || voting.relatedPropositions || voting.affectedPropositions) && (
        <div className={styles.accordionItems}>
          {voting.events && (
            <AccordionItem title={'Eventos'}>
              <TimeLine articleList={voting.events}/>
            </AccordionItem>
          )}
          {voting.mainProposition && (
            <AccordionItem title={'Proposição Principal'}>
              <TimeLine articleList={[voting.mainProposition]}/>
            </AccordionItem>
          )}
          {voting.relatedPropositions && (
            <AccordionItem title={'Proposições Relacionadas'}>
              <TimeLine articleList={voting.relatedPropositions}/>
            </AccordionItem>
          )}
          {voting.affectedPropositions && (
            <AccordionItem title={'Proposições Afetadas:'}>
              <TimeLine articleList={voting.affectedPropositions}/>
            </AccordionItem>
          )}
        </div>
      )}
      {
        voting.newsletter && (
          <div className={styles.newsletterColumn}>
            <div className={styles.followArticleLabel}>Acompanhe as outras notícias do dia:</div>
            <Link className={styles.newsletterTitleLabel} to={"/newsletter-details/" + voting.newsletter.id}
                  aria-label="Ir para a página de detalhes do boletim">
              - {voting.newsletter.title}
            </Link>
          </div>
        )}
    </div>
  );
});

export default VotingDetailsCard;
