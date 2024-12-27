import React, {FC, memo, useState} from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import styles from './styles.module.scss';
import FiltersModal from "@components/base/filters/modal";
import {FaFilter, FaSearch} from "react-icons/fa";
import Party from "@models/Party";
import Deputy from "@models/Deputy";
import ExternalAuthor from "@models/ExternalAuthor";

interface Props {
    className?: string;
    filtersRowStyle: any;
    startDate: Date | null;
    endDate: Date | null;
    party?: Party | null;
    deputy?: Deputy | null;
    externalAuthor?: ExternalAuthor | null;
    onContentChange: (value: string) => void;
    onStartDateChange: (value: Date | null) => void;
    onEndDateChange: (value: Date | null) => void;
    onPartyChange?: (value: Party | null) => void;
    onDeputyChange?: (value: Deputy | null) => void;
    onExternalAuthorChange?: (value: ExternalAuthor | null) => void;
    onFilterClick: () => void;
}

export const Filters: FC<Props> = memo(function Filters({
    filtersRowStyle,
    startDate,
    endDate,
    party,
    deputy,
    externalAuthor,
    onContentChange,
    onStartDateChange,
    onEndDateChange,
    onPartyChange,
    onDeputyChange,
    onExternalAuthorChange,
    onFilterClick,
    ...props
}) {
    const [modalOpen, setModalOpen] = useState(false);
    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);
    return (
        <div className={`${filtersRowStyle} ${styles.filtersRow}`}>
            <TextField
                label="Conteudo"
                size="small"
                className={styles.filterInput}
                onChange={(e) => onContentChange(e.target.value)}
            />
            <div className={styles.buttonsContainer}>
                <Button variant="contained" className={styles.buttonBlue} onClick={onFilterClick}>
                    <FaSearch aria-label="Ícone de busca"/>
                    Pesquisar
                </Button>
                <Button variant="contained" className={styles.buttonBlue} onClick={openModal}>
                    <FaFilter aria-label="Ícone de filtros" />
                    Filtrar
                </Button>
            </div>
            {
                modalOpen &&
                <FiltersModal
                    closeModal={closeModal}
                    startDate={startDate}
                    endDate={endDate}
                    party={party}
                    deputy={deputy}
                    externalAuthor={externalAuthor}
                    onFilterClick={onFilterClick}
                    onStartDateChange={onStartDateChange}
                    onEndDateChange={onEndDateChange}
                    onPartyChange={onPartyChange}
                    onDeputyChange={onDeputyChange}
                    onExternalAuthorChange={onExternalAuthorChange}
                />
            }
        </div>
    );
});
