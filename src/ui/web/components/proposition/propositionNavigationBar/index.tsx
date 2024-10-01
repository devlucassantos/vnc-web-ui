import React, {FC, memo, useContext} from "react";
import styles from "./styles.module.scss";
import {Link} from "react-router-dom";
import {ResourceContext, ResourceContextType} from "@web/providers/resourceProvider";

interface Props {
    className?: string;
}

export const PropositionNavigationBar: FC<Props> = memo(function PropositionNavigationBar(props = {}) {
    const resourceContext = useContext(ResourceContext);
    const { resource} = resourceContext ?? {
        resource: null,
        fetchResources: () => {},
    } as ResourceContextType;

    return (
        <div className={styles.propositionNavigationBar}>
            <div className={styles.navigationBarRow}>
                {resource?.articleTypes?.map((articleType, index) => (
                    articleType.description !== 'Boletins' ? (
                        <Link key={index} className={styles.label} style={{ color: articleType.color }} to={`/proposicoes-por-tipo/${articleType.id}`}>
                            {articleType.description}
                        </Link>
                    ) : null
                ))}
            </div>
        </div>
    );
});

export default PropositionNavigationBar;
