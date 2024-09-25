import {FC, memo} from "react";
import styles from "./styles.module.scss";
import Article from "@models/Article";
import {Link} from "react-router-dom";
import styled from "styled-components";
import NewsletterImageCard from "@components/newsletter/newsletterImageCard";

interface Props {
    className?: string;
    article: Article;
}

const TitleDiv = styled.div<{ hoverColor: string }>`
  &:hover {
    color: ${(props) => props.hoverColor};
  }
`;

export const SmallCard: FC<Props> = memo(function SmallCard({
    article,
    ...props
}) {
    return (
        <div className={styles.smallCard}>
            <div className={styles.imageView}>
                { article.type.description !== "Boletins" ? (
                    <div className={styles.image} style={{ backgroundImage: `url(${article.imageUrl})` }} />
                ) : (
                    <NewsletterImageCard title={article.title}/>
                )}
            </div>
            <div className={styles.column}>
                <Link className={styles.titleRow} to={(article.type.description !== "Boletins" ? "/detalhes-da-proposição/" : "/detalhes-do-boletim/") + article.id}>
                    <div className={styles.titleView}>
                        <div className={styles.line} style={{ outline: `solid 2px ${article.type.color}` }}/>
                        <TitleDiv className={styles.title} hoverColor={article.type.color}>{article.title}</TitleDiv>
                    </div>
                </Link>
                <div className={styles.content}>{article.content}</div>
                <div className={styles.dateRow}>
                    <div className={styles.createdAt}>{article.createdAt}</div>
                    {article.createdAt != article.updatedAt && <div className={styles.updatedAt}>{"Atualizado em " + article.updatedAt}</div>}
                </div>
            </div>
        </div>
    );
});

export default SmallCard;
