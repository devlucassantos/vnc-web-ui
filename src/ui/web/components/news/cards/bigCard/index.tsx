import {FC, memo, useRef} from "react";
import styles from "./styles.module.scss";
import Article from "@models/Article";
import {Link} from "react-router-dom";
import styled from "styled-components";
import useDisableFocus from "@web/hooks/disableFocusHook";

interface Props {
    className?: string;
    typePropositionLabel: string;
    cardStyle: any;
    imageContainerStyle: any;
    titleStyle: any;
    article: Article;
    displayArticleTypeLabel?: boolean;
    isHidden: boolean;
}

const TitleDiv = styled.div<{ $hoverColor: string }>`
  &:hover {
    color: ${(props) => props.$hoverColor};
  }
`;

export const BigCard: FC<Props> = memo(function BigCard({
    article,
    typePropositionLabel,
    cardStyle,
    imageContainerStyle,
    titleStyle,
    displayArticleTypeLabel = true,
    isHidden = false,
    ...props
}) {
    const cardRef = useRef<HTMLDivElement>(null);
    useDisableFocus(isHidden, cardRef);

    return (
        <div ref={cardRef} className={cardStyle} data-id={article.id}>
            <div className={imageContainerStyle}>
                <div className={styles.image} style={{ backgroundImage: `url(${article.imageUrl})` }} />
            </div>
            <div className={styles.cardColumn}>
                { displayArticleTypeLabel && (
                  <div className={styles.labelContainer} style={{backgroundColor: article.type.color}}>
                      <div className={styles.label}>{typePropositionLabel}</div>
                  </div>
                )}
                <Link className={styles.titleContainer}
                      to={(article.type.description !== "Boletins" ? "/proposition-details/" : "/newsletter-details/") + article.id} aria-label="Ir para a página de detalhes da matéria">
                <div className={styles.titleContainerRow}>
                        <TitleDiv className={titleStyle} $hoverColor={article.type.color}>{article.title}</TitleDiv>
                    </div>
                </Link>
                <div className={styles.dateRow}>
                    <div className={styles.createdAt}>{article.createdAt}</div>
                    {article.createdAt != article.updatedAt && <div className={styles.updatedAt}>{"Atualizado em " + article.updatedAt}</div>}
                </div>
            </div>
        </div>
    );
});

export default BigCard;
