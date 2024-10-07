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
import { Tooltip } from "@mui/material";

interface Props {
    className?: string;
    proposition: Proposition
}

const TitleDiv = styled.div<{ hoverColor: string }>`
  &:hover {
    color: ${(props) => props.hoverColor};
  }
`;

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
    const handleRatingSubmit = async (rating: number) => {
        await articleService.saveArticleRating(proposition.id, rating);
    };

    const handleViewLaterSubmit = async (viewLater: boolean) => {
        await articleService.saveArticleToViewLater(proposition.id, viewLater);
    };

    const codteor = proposition.originalTextUrl.split('codteor=')[1];

    return (
        <div className={styles.card}>
            <div className={styles.titleContainer}>
                <div className={styles.titleContainerRow}>
                    <div className={styles.line} />
                    <Link className={styles.title} to={"/original-proposition/" + codteor} >
                        <div>{proposition.title}</div>
                    </Link>
                </div>
                <StarRating onSubmitRating={handleRatingSubmit} initialRating={ proposition.userRating ?? 0 } />
            </div>
            <div className={styles.createdAt}>
                {proposition.createdAt}
                {proposition.createdAt !== proposition.updatedAt && " - Atualizado em " + proposition.updatedAt}
            </div>
            <RowContainer>
                <div className={styles.labelContainer} style={{ backgroundColor: proposition.type.color }}>
                    <div className={styles.label}>{proposition.type.description}</div>
                </div>
                <ViewLaterButton onViewLaterSubmit={handleViewLaterSubmit} initialSelected={proposition.viewLater} />
                {!isNaN(proposition.averageRating) && (
                    <RatingContainer>
                        <Tooltip title="Média das avaliações">
                            <div className={styles.ratingContainer}>
                                <CustomStarIcon />
                                <RatingText>{proposition.averageRating.toFixed(1)}</RatingText>
                            </div>
                        </Tooltip>
                    </RatingContainer>
                )}
            </RowContainer>
            <div className={styles.content}>{proposition.content}</div>
            <Link className={styles.viewOriginalProposition} to={"/original-proposition/" + codteor} >
                <div>Ver proposição original</div>
            </Link>
            <div className={styles.submittedAt}>{"Proposição submetida em " + proposition.submittedAt + "."}</div>
            <div className={styles.authors}>Autores</div>
            <div className={styles.authorsRow}>
                <div className={styles.deputiesColumn}>
                    <div className={styles.deputiesLabel}>Deputados:</div>
                    {proposition.deputies?.map((deputy, index) => (
                        <DeputyCard key={index} deputy={deputy} />
                    ))}
                </div>
                <div className={styles.externalAuthorsColumn}>
                    <div className={styles.externalAuthorsLabel}>Autores Externos:</div>
                    {proposition.externalAuthors?.map((externalAuthor, index) => (
                        <div key={index} className={styles.externalAuthorNameLabel}>- {externalAuthor.name}</div>
                    ))}
                </div>
            </div>
            {proposition.newsletterArticle && (
                <div className={styles.newsletterColumn}>
                    <div className={styles.followArticleLabel}>Acompanhe as outras notícias do dia:</div>
                    <Link className={styles.newsletterTitleLabel} to={"/newsletter-details/" + proposition.newsletterArticle.id}>
                        - {proposition.newsletterArticle.title}
                    </Link>
                </div>
            )}
        </div>
    );
});

export default PropositionDetailsCard;
