import React, {FC, memo} from "react";
import styles from "./styles.module.scss";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter, FaFacebook } from "react-icons/fa6";

interface Props {
    className?: string;
}

export const Footer: FC<Props> = memo(function Footer(props = {}) {
    return (
        <div className={styles.footer}>
            <div className={styles.footerContainer}>
                <div className={styles.termsContainer}>
                    <div className={styles.labelText}>Política de privacidade</div>
                    <div className={styles.labelText}>Termo de uso</div>
                </div>
                <div className={styles.copyrightContainer}>
                    <div className={styles.logo} />
                    <div className={styles.copyrightLabel}>© Copyright 2024-2028 Você na Câmara</div>
                </div>
                <div className={styles.rightContainer}>
                    <div className={`${styles.labelText} ${styles.vncLabel}`}>VNC NAS REDES</div>
                    <FaFacebook color="white" className={styles.icon}/>
                    <FaInstagram color="white" className={styles.icon}/>
                    <FaXTwitter color="white" className={styles.icon}/>
                </div>
            </div>
        </div>
    );
});

export default Footer;
