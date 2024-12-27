import React from 'react';
import { FaSearch  } from 'react-icons/fa';
import styles from "./styles.module.scss";

const NoResultMessage = () => {
    return (
        <div className={styles.noResultMessage}>
            <FaSearch className={styles.icon} aria-label="Ícone para indicar que nenhum resultado foi encontrado." />
            <p className={styles.message}>Nenhum resultado encontrado.</p>
        </div>
    );
};

export default NoResultMessage;
