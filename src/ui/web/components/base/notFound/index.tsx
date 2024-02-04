import React from 'react';
import styles from "./styles.module.scss";
import image from '@assets/not-found.svg';
import {Link} from "react-router-dom";

const NotFoundPage = () => {
    return (
        <div className={styles.notFound}>
            <img src={image} alt="svg" />
            <Link to="/">
                <button>Voltar para o início</button>
            </Link>
        </div>
    );
};

export default NotFoundPage;
