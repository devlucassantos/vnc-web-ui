import {FC, memo} from "react";
import styles from "./styles.module.scss";
import News from "../../../../../../core/domain/models/News";
import {limitText} from "@utils/stringUtils";
import {Link} from "react-router-dom";

interface Props {
    className?: string;
    news: News
}

export const BigCard: FC<Props> = memo(function BigCard({
    news,
    ...props
}) {
    return (
        <div className={styles.card}>
            <div className={styles.imageContainer}>
                <div className={styles.image} />
            </div>
            <div className={styles.cardColumn}>
                <div className={styles.titleContainer}>
                    <div className={styles.titleContainerRow}>
                        <div className={styles.line} />
                        <div className={styles.title}>{news.title}</div>
                    </div>
                    <Link className={styles.viewMore} to={(news.type === "Proposição" ? "/detalhes-da-proposicao/" : "/detalhes-do-boletim/") + news.id}>
                        Ver mais
                    </Link>
                </div>
                <div className={styles.content}>{limitText(news.content, 40)}</div>
                <div className={styles.dateRow}>
                    <div className={styles.createdAt}>{news.createdAt}</div>
                    {news.createdAt != news.updatedAt && <div className={styles.updatedAt}>{"Atualizado em " + news.updatedAt}</div>}
                </div>
            </div>
        </div>
    );
});

export default BigCard;
