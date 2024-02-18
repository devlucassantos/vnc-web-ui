import {FC, memo} from "react";
import styles from "./styles.module.scss";
import News from "../../../../../../core/domain/models/News";
import {Link} from "react-router-dom";

interface Props {
    className?: string;
    news: News;
}

export const SmallCard: FC<Props> = memo(function SmallCard({
    news,
    ...props
}) {
    return (
        <div className={styles.smallCard}>
            <div className={styles.imageView}>
                <img className={styles.image} src="/src/ui/web/assets/img.png" />
            </div>
            <div className={styles.column}>
                <Link className={styles.titleRow} to={(news.type === "Proposição" ? "/detalhes-da-proposicao/" : "/detalhes-do-boletim/") + news.id}>
                    <div className={styles.titleView}>
                        <div className={styles.line}/>
                        <div className={styles.title}>{news.title}</div>
                    </div>
                </Link>
                <div className={styles.content}>{news.content}</div>
                <div className={styles.dateRow}>
                    <div className={styles.createdAt}>{news.createdAt}</div>
                    {news.createdAt != news.updatedAt && <div className={styles.updatedAt}>{"Atualizado em " + news.updatedAt}</div>}
                </div>
            </div>
        </div>
    );
});

export default SmallCard;
