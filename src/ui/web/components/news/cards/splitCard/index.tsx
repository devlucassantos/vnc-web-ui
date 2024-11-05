import React, {FC, memo} from "react";
import styles from "./styles.module.scss";
import Article from "@models/Article";
import {Link} from "react-router-dom";

interface Props {
    className?: string;
    article: Article
}

export const SplitCard: FC<Props> = memo(function SplitCard({
    article,
    ...props
}) {
    return (
      <div className={styles.cardStyle}>
          <div className={styles.image}
               style={{backgroundImage: `url(${article.imageUrl})`}}/>
          <div className={styles.content} style={{backgroundColor: article.type.color}}>
            <Link className={styles.titleLabel} to={"/proposition-details/" + article.id}>
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
