import {FC, memo} from "react";
import styles from "./styles.module.scss";

interface Props {
    title?: string;
    className?: string;
}

export const NewsletterImageCard: FC<Props> = memo(function NewsletterImageCard({
    title,
    ...props
}) {

    return (
        <div className={styles.newsletterCard}>
            <h2>{title}</h2>
            <img src="/src/ui/web/assets/yellow-logo-icon.png" alt="Logo" className={styles.logo} />
        </div>
    );
});

export default NewsletterImageCard;
