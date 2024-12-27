import React from 'react';
import styles from "./styles.module.scss";
import image from '@assets/not-found.png';
import {Link} from "react-router-dom";

const NotFoundPage = () => {
    return (
        <div className={styles.notFound}>
            <img src={image} alt="Imagem de página não encontrada." />
            <Link to="/" aria-label="Ir para a página inicial">
                <button>Voltar para o início</button>
            </Link>
        </div>
    );
};

export default NotFoundPage;
