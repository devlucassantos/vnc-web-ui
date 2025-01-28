import React, {FC, memo, useRef} from "react";
import styles from "./styles.module.scss";
import Article from "@models/Article";
import {Link} from "react-router-dom";
import useDisableFocus from "@web/hooks/disableFocusHook";

interface Props {
    className?: string;
    article: Article;
    isHidden: boolean;
}

export const SplitCard: FC<Props> = memo(function SplitCard({
    article,
    isHidden = false,
    ...props
}) {
    const cardRef = useRef<HTMLDivElement>(null);
    useDisableFocus(isHidden, cardRef);

    return (
        <div ref={cardRef} className={styles.cardStyle} data-id={article.id}>
            <div className={styles.image}
                 style={{backgroundImage: `url(${article.imageUrl})`}}/>
            <div className={styles.content} style={{backgroundColor: article.type.color}}>
                <Link
                    className={styles.titleLabel}
                    to={"/proposition-details/" + article.id}
                >
                    {article.title}
                </Link>
                <div className={styles.dateLabel}>
                    {article.createdAt}
                </div>
            </div>
        </div>
    );
});

export default SplitCard;
