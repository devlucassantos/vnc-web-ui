import React from 'react';
import { FaSearch  } from 'react-icons/fa';
import styles from "./styles.module.scss";

const NoResultMessage = () => {
    return (
        <div className={styles.noResultMessage}>
            <FaSearch className={styles.icon} />
            <p className={styles.message}>Nenhum resultado encontrado.</p>
        </div>
    );
};

export default NoResultMessage;
