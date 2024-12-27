import React, {FC, memo} from "react";
import styles from "./styles.module.scss";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter, FaFacebook } from "react-icons/fa6";

interface Props {
    className?: string;
}

export const Footer: FC<Props> = memo(function Footer(props = {}) {
    const currentYear = new Date().getFullYear();

    return (
        <div className={styles.footer}>
            <div className={styles.footerContainer}>
                <div className={styles.termsContainer}>
                    <div className={styles.labelText}>Política de privacidade</div>
                    <div className={styles.labelText}>Termo de uso</div>
                </div>
                <div className={styles.copyrightContainer}>
                    <div className={styles.logo} role="img" aria-label="Logo do Você na Câmara"/>
                    <div className={styles.copyrightLabel}>© Copyright {currentYear} Você na Câmara</div>
                </div>
                <div className={styles.rightContainer}>
                    <div className={`${styles.labelText} ${styles.vncLabel}`}>VNC NAS REDES</div>
                    <FaFacebook color="white" className={styles.icon} aria-label="Ícone do facebook da plataforma."/>
                    <FaInstagram color="white" className={styles.icon} aria-label="Ícone do instragram da plataforma." />
                    <FaXTwitter color="white" className={styles.icon} aria-label="Ícone do Twitter da plataforma." />
                </div>
            </div>
        </div>
    );
});

export default Footer;
