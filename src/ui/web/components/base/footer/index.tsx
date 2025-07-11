import React, {FC, memo} from "react";
import styles from "./styles.module.scss";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter, FaFacebook } from "react-icons/fa6";
import {Link} from "react-router-dom";

interface Props {
    className?: string;
}

export const Footer: FC<Props> = memo(function Footer(props = {}) {
    const currentYear = new Date().getFullYear();

    return (
        <div className={styles.footer}>
            <div className={styles.footerContainer}>
                <div className={styles.termsContainer}>
                    <Link className={styles.labelText}
                          to={"/privacy-policy"}
                          aria-label="Ir para a página de política de privacidade">
                        <div>Política de privacidade</div>
                    </Link>
                    <Link className={styles.labelText}
                          to={"/terms-of-use"}
                          aria-label="Ir para a página de termos de uso">
                        <div>Termos de uso</div>
                    </Link>
                </div>
                <div className={styles.copyrightContainer}>
                    <div className={styles.logo} role="img" aria-label="Logo do Você na Câmara"/>
                    <div className={styles.copyrightLabel}>© Copyright {currentYear} Você na Câmara</div>
                </div>
                <div className={styles.rightContainer}>
                    <div className={`${styles.labelText} ${styles.vncLabel}`}>VNC NAS REDES</div>
                    <a className={styles.iconLink} href="https://www.instagram.com/vocenacamara_" target="_blank"
                       rel="noopener noreferrer"
                       aria-label="Visitar o Instagram da plataforma">
                        <FaInstagram color="white" className={styles.icon} aria-label="Ícone do instragram da plataforma." />
                    </a>
                    <a className={styles.iconLink} href="https://x.com/vocenacamara_" target="_blank"
                       rel="noopener noreferrer"
                       aria-label="Visitar o Twitter da plataforma">
                        <FaXTwitter color="white" className={styles.icon}/>
                    </a>
                </div>
            </div>
        </div>
    );
});

export default Footer;
