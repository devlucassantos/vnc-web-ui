import React, {FC, memo} from "react";
import styles from "./styles.module.scss";
import Newsletter from "../../../../../core/domain/models/Newsletter";
import {Link} from "react-router-dom";
import styled from "styled-components";
import StarIcon from "@mui/icons-material/Star";
import DIContainer from "@web/dicontainer";
import StarRating from "@components/base/startRating";
import ViewLaterButton from "@components/base/viewLater";
import {Tooltip} from "@mui/material";

interface Props {
    className?: string;
    newsletter: Newsletter
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

export const NewsletterDetailsCard: FC<Props> = memo(function NewsletterDetailsCard({
    newsletter,
    ...props
}) {

    const handleRatingSubmit = async (rating: number) => {
        await articleService.saveArticleRating(newsletter.id, rating);
    };

    const handleViewLaterSubmit = async (viewLater: boolean) => {
        await articleService.saveArticleToViewLater(newsletter.id, viewLater);
    };

    return (
        <div className={styles.card}>
            <div className={styles.titleContainer}>
              <div className={styles.titleContainerRow}>
                <div className={styles.line}/>
                <div className={styles.title}>{newsletter.title}</div>
              </div>
              <StarRating onSubmitRating={handleRatingSubmit} initialRating={newsletter.userRating ?? 0 } />
            </div>
            <RowContainer>
                <div className={styles.createdAt}>
                    {newsletter.createdAt}{newsletter.createdAt != newsletter.updatedAt && " - Atualizado em " + newsletter.updatedAt}
                </div>
                <ViewLaterButton onViewLaterSubmit={handleViewLaterSubmit} initialSelected={newsletter.viewLater} />
                {!isNaN(newsletter.averageRating) && (
                    <RatingContainer>
                        <Tooltip title="Média das avaliações">
                            <div className={styles.ratingContainer}>
                                <CustomStarIcon aria-label="Ícone de estrela representando a média das avaliações" />
                                <RatingText>{newsletter.averageRating.toFixed(1)}</RatingText>
                            </div>
                        </Tooltip>
                    </RatingContainer>
                )}
            </RowContainer>
            <div className={styles.propositionsColumn}>
                {newsletter.propositionArticles?.map((propositionArticle, index) => (
                    <React.Fragment key={index}>
                        <Link className={styles.propositionArticleTitleLabel} to={"/proposition-details/" + propositionArticle.id} aria-label="Ir para a página de detalhes da proposição">
                            {propositionArticle.title}
                        </Link>
                        <div className={styles.propositionArticleContent}>{propositionArticle.content}</div>
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
});

export default NewsletterDetailsCard;
