import React, {FC, memo, useState} from "react";
import styles from "./styles.module.scss";
import Proposition from "../../../../../core/domain/models/Proposition";
import {Link} from "react-router-dom";
import DeputyCard from "@components/proposition/details/deputy/card";
import styled from "styled-components";
import DIContainer from "@web/dicontainer";
import StarRating from "@components/base/startRating";
import StarIcon from "@mui/icons-material/Star";
import ViewLaterButton from "@components/base/viewLater";
import {Tooltip} from "@mui/material";
import AccordionItem from "@components/base/accordionItem";
import TimeLine from "@components/base/timeLine";

interface Props {
  className?: string;
  proposition: Proposition
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

export const PropositionDetailsCard: FC<Props> = memo(function PropositionDetailsCard({
  proposition,
  ...props
}) {
  const handleRatingSubmit = async (rating: number | null) => {
    await articleService.saveArticleRating(proposition.id, rating);
  };

  const handleViewLaterSubmit = async (viewLater: boolean) => {
    await articleService.saveArticleToViewLater(proposition.id, viewLater);
  };

  const codteor = proposition.originalTextUrl.split('codteor=')[1];

  return (
    <div className={styles.card}>
      <div className={styles.titleViewContainer}>
        {proposition.imageUrl !== 'undefined' && (
          <div className={styles.imageContainer}>
            <div className={styles.image} style={{backgroundImage: `url(${proposition.imageUrl})`}} role="img"
                 aria-label={`${proposition.imageDescription ?? "Imagem gerada por Inteligência Artificial representando o conteúdo da proposição."}`}/>
          </div>
        )}
        <div className={styles.titleContainer}>
          <div className={styles.titleContainerRow}>
            <div className={styles.line}/>
            <Link className={styles.title} to={"/original-proposition/" + codteor}
                  aria-label="Ir para a página de exibição da proposição original">
              <div>{proposition.title}</div>
            </Link>
          </div>
          <StarRating onSubmitRating={handleRatingSubmit} initialRating={proposition.userRating ?? 0}/>
        </div>
      </div>
      <div className={styles.createdAt}>
        {proposition.createdAt}
        {proposition.createdAt !== proposition.updatedAt && " - Atualizado em " + proposition.updatedAt}
      </div>
      <RowContainer>
        <div className={styles.labelContainer} style={{backgroundColor: proposition.type.specificType.color}}>
          <div className={styles.label}>{proposition.type.specificType.description}</div>
        </div>
        <ViewLaterButton onViewLaterSubmit={handleViewLaterSubmit} initialSelected={proposition.viewLater}/>
        {!isNaN(proposition.averageRating) && (
          <RatingContainer>
            <Tooltip title="Média das avaliações">
              <div className={styles.ratingContainer}>
                <CustomStarIcon aria-label="Ícone de estrela representando a média das avaliações"/>
                <RatingText>{proposition.averageRating.toFixed(1)}</RatingText>
              </div>
            </Tooltip>
          </RatingContainer>
        )}
      </RowContainer>
      <div className={styles.content}>{proposition.content}</div>
      <Link className={styles.viewOriginalProposition} to={"/original-proposition/" + codteor}
            aria-label="Ir para a página de exibição da proposição original">
        <div>Ver proposição original</div>
      </Link>
      <div className={styles.submittedAt}>{"Proposição submetida em " + proposition.submittedAt + "."}</div>
      <div className={styles.accordionItems}>
        <AccordionItem title={'Autores'}>
          <div className={styles.authorsRow}>
            {proposition.deputies?.length > 0 && (
              <div
                className={`${styles.deputiesColumn} ${!proposition.externalAuthors?.length ? styles.fullWidthColumn : ""}`}>
                <div className={styles.deputiesLabel}>Deputados:</div>
                {proposition.deputies.map((deputy, index) => (
                  <DeputyCard key={index} deputy={deputy}/>
                ))}
              </div>
            )}
            {proposition.externalAuthors?.length > 0 && (
              <div
                className={`${styles.externalAuthorsColumn} ${!proposition.deputies?.length ? styles.fullWidthColumn : ""}`}>
                <div className={styles.externalAuthorsLabel}>Autores Externos:</div>
                {proposition.externalAuthors.map((externalAuthor, index) => (
                  <div key={index} className={styles.externalAuthorNameLabel}>
                    - {externalAuthor.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        </AccordionItem>
        {proposition.events && (
          <AccordionItem title={'Eventos'}>
            <TimeLine articleList={proposition.events}/>
          </AccordionItem>
        )}
        {proposition.votes && (
          <AccordionItem title={'Votações'}>
            <TimeLine articleList={proposition.votes}/>
          </AccordionItem>
        )}
      </div>
      {proposition.newsletter && (
        <div className={styles.newsletterColumn}>
          <div className={styles.followArticleLabel}>Acompanhe as outras notícias do dia:</div>
          <Link className={styles.newsletterTitleLabel} to={"/newsletter-details/" + proposition.newsletter.id}
                aria-label="Ir para a página de detalhes do boletim">
            - {proposition.newsletter.title}
          </Link>
        </div>
      )}
    </div>
  );
});

export default PropositionDetailsCard;
