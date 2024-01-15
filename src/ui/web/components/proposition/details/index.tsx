import React, {FC, memo} from "react";
import styles from "./styles.module.scss";
import Proposition from "../../../../../core/domain/models/Proposition";
import {Link} from "react-router-dom";

interface Props {
    className?: string;
    proposition: Proposition
}

export const PropositionDetailsCard: FC<Props> = memo(function PropositionDetailsCard({
    proposition,
    ...props
}) {

    return (
        <div className={styles.card}>
            <div className={styles.titleContainer}>
                <div className={styles.titleContainerRow}>
                    <div className={styles.line} />
                    <div className={styles.title}>{proposition.title}</div>
                </div>
                <Link className={styles.viewOriginalProposition} to="/proposicao-original">
                    <div>Ver proposição original</div>
                </Link>
            </div>
            <div className={styles.createdAt}>
                {proposition.createdAt}{proposition.createdAt != proposition.updatedAt && " - Atualizado em " + proposition.updatedAt}
            </div>
            <div className={styles.content}>{proposition.content}</div>
            <div className={styles.submittedAt}>{"Proposição submetida em " + proposition.submittedAt + "."}</div>
            <div className={styles.authors}>Autores</div>
            <div className={styles.authorsRow}>
                <div className={styles.deputiesColumn}>
                    <div className={styles.deputiesLabel}>Deputados:</div>
                    {proposition.deputies?.map((deputy, index) => (
                        <div key={index} className={styles.deputyNameLabel}>- {deputy.name}</div>
                    ))}
                </div>
                <div className={styles.organizationsColumn}>
                    <div className={styles.organizationsLabel}>Organizações:</div>
                    {proposition.organizations?.map((organization, index) => (
                        <div key={index} className={styles.organizationNameLabel}>- {organization.name}</div>
                    ))}
                </div>
            </div>
            {proposition.newsletter && (
                <div className={styles.newsletterColumn}>
                    <div className={styles.followNewsLabel}>Acompanhe as outras notícias do dia:</div>
                    <Link to={"/detalhes-do-boletim/" + proposition.newsletter.id}>
                        <div className={styles.newsletterTitleLabel}>- {proposition.newsletter.title}</div>
                    </Link>
                </div>
            )}
        </div>
    );
});

export default PropositionDetailsCard;
