import React, {FC, memo} from 'react';
import styles from "./styles.module.scss";
import {Link} from "react-router-dom";

interface Props {
    roles: string[]
}

export const BannerActivation: FC<Props> = memo(function Navbar({
    roles,
}) {
    if (!roles.includes('INACTIVE_USER')) {
        return null;
    }

    return (
        <div className={styles.banner}>
            <p className={styles.bannerText}>
                Sua conta ainda não está ativada. Para ativar, clique
                <Link to='/ativar-conta' className={styles.bannerButton}>
                    aqui
                </Link>.
            </p>
        </div>
    );
});

export default BannerActivation;
