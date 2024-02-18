import {FC, memo} from "react";
import styles from "./styles.module.scss";
import Newsletter from "../../../../../core/domain/models/Newsletter";
import {Link} from "react-router-dom";

interface Props {
    className?: string;
    newsletter: Newsletter
}

export const NewsletterDetailsCard: FC<Props> = memo(function NewsletterDetailsCard({
    newsletter,
    ...props
}) {

    return (
        <div className={styles.card}>
            <div className={styles.titleContainerRow}>
                <div className={styles.line} />
                <div className={styles.title}>{newsletter.title}</div>
            </div>
            <div className={styles.createdAt}>
                {newsletter.createdAt}{newsletter.createdAt != newsletter.updatedAt && " - Atualizado em " + newsletter.updatedAt}
            </div>
            <div className={styles.content}>{newsletter.content}</div>
            <div className={styles.moreDetailsLabel}>Mais detalhes em:</div>
            <div className={styles.propositionsColumn}>
                {newsletter.propositions?.map((proposition, index) => (
                    <Link className={styles.propositionTitleLabel} key={index} to={"/detalhes-da-proposicao/" + proposition.id}>
                        - {proposition.title}
                    </Link>
                ))}
            </div>
        </div>
    );
});

export default NewsletterDetailsCard;
