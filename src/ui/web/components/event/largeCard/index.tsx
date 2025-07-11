import React, {FC, memo, useRef} from "react";
import styles from "./styles.module.scss";
import Article from "@models/Article";
import {Link} from "react-router-dom";
import styled from "styled-components";
import useDisableFocus from "@web/hooks/disableFocusHook";
import VideoCard from "@components/base/videoCard";
import {formatEventDate} from "@utils/dateUtils";

interface Props {
    className?: string;
    article: Article;
    isHidden: boolean;
}

const TitleDiv = styled.div<{ $hoverColor: string }>`
  &:hover {
    color: ${(props) => props.$hoverColor};
  }
`;

export const LargeEventCard: FC<Props> = memo(function LargeVideoCard({
    article,
    isHidden = false,
    ...props
}) {
    const cardRef = useRef<HTMLDivElement>(null);
    useDisableFocus(isHidden, cardRef);

    return (
        <div ref={cardRef} className={styles.card} data-id={article.id}>
            <div className={styles.leftCardColumn}>
                <VideoCard url={article.multimediaUrl} color={article.type.color} isSmallCard={false} />
            </div>

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
                    <div className={styles.subTitle} style={{color: article.type.specificType.color}}>{article.type.specificType.description}</div>
                </div>
                <div className={styles.dateRow}>
                    <div className={styles.eventDate}>{formatEventDate(article.situation.startsAt, article.situation.endsAt)}</div>
                </div>
                <div className={styles.contentContainerRow}>
                    <div className={styles.content}>{article.content}</div>
                </div>
                <div className={styles.titleContainerRow}>
                    <div className={styles.subTitle} style={{color: article.situation.color}}>{article.situation.description}</div>
                </div>
            </div>
        </div>
    );
});

export default LargeEventCard;
