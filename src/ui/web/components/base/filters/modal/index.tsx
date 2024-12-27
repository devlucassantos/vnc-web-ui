import React, {FC, memo, useContext, useEffect, useState} from 'react';
import Deputy from "@models/Deputy";
import styles from "./styles.module.scss";
import {FaTimes, FaFilter, FaTrash} from "react-icons/fa";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {Autocomplete} from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import DIContainer from "@web/dicontainer";
import Party from "@models/Party";
import ExternalAuthor from "@models/ExternalAuthor";
import {ResourceContext, ResourceContextType} from "@web/providers/resourceProvider";
import ArticleType from "@models/ArticleType";
import articleType from "@models/ArticleType";

interface Props {
    className?: string;
    closeModal: any;
    startDate: Date | null;
    endDate: Date | null;
    articleType?: ArticleType | null;
    party?: Party | null;
    deputy?: Deputy | null;
    externalAuthor?: ExternalAuthor | null;
    onStartDateChange: (value: Date | null) => void;
    onEndDateChange: (value: Date | null) => void;
    onArticleTypeChange?: (value: ArticleType | null) => void;
    onPartyChange?: (value: Party | null) => void;
    onDeputyChange?: (value: Deputy | null) => void;
    onExternalAuthorChange?: (value: ExternalAuthor | null) => void;
    onFilterClick: () => void;
}

const resourceService = DIContainer.getResourceUseCase();

export const FiltersModal: FC<Props> = memo(function FiltersModal({
    closeModal,
    startDate,
    endDate,
    articleType,
    party,
    deputy,
    externalAuthor,
    onStartDateChange,
    onEndDateChange,
    onArticleTypeChange,
    onPartyChange,
    onDeputyChange,
    onExternalAuthorChange,
    onFilterClick,
    ...props
}) {
    const [applyFilters, setApplyFilters] = useState<boolean>(false);
    const resourceContext = useContext(ResourceContext);
    const { resource, fetchResources } = resourceContext ?? {
        resource: null,
        fetchResources: () => {},
    } as ResourceContextType;
    const [isFirstRender, setIsFirstRender] = useState(true);

    useEffect(() => {
        fetchResources();
    }, []);

    useEffect(() => {
        if (!isFirstRender) {
            onFilterClick();
        } else {
            setIsFirstRender(false);
        }
    }, [applyFilters]);

    const clearFilters = () => {
        onStartDateChange(null);
        onEndDateChange(null);
        onArticleTypeChange ? onArticleTypeChange(null) : null;
        onPartyChange ? onPartyChange(null) : null;
        onDeputyChange ? onDeputyChange(null) : null;
        onExternalAuthorChange ? onExternalAuthorChange(null) : null;
        setApplyFilters(true)
    };

    return (
        <>
            <div className={`${styles.modal}`}>
                <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                    <div className={`${styles.row} ${styles.marginBottom1}`}>
                        <div className={`${styles.row} ${styles.modalTitle}`}>
                            <div className={styles.titleLabel}>Filtros</div>
                        </div>
                        <div className={styles.closeButtonDiv}>
                            <FaTimes aria-label="Ícone de fechamento do modal." className={styles.closeButton} onClick={closeModal}/>
                        </div>
                    </div>
                    <div className={styles.modalFields}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <div className={styles.dateColumn}>
                                <DatePicker
                                    label="Data Inicial"
                                    className={styles.filterDate}
                                    format="dd/MM/yyyy"
                                    slotProps={{
                                        textField: {
                                            size: "small"
                                        },
                                        actionBar: {
                                            actions: ['clear', 'accept']
                                        }
                                    }}
                                    value={startDate}
                                    onChange={(date: Date | null) => onStartDateChange(date)}
                                />
                                <DatePicker
                                    label="Data Final"
                                    className={styles.filterDate}
                                    format="dd/MM/yyyy"
                                    slotProps={{
                                        textField: {
                                            size: "small"
                                        },
                                        actionBar: {
                                            actions: ['clear', 'accept']
                                        }
                                    }}
                                    value={endDate}
                                    onChange={(date: Date | null) => onEndDateChange(date)}
                                />
                            </div>
                        </LocalizationProvider>
                        {onArticleTypeChange &&
                            <Autocomplete
                                disablePortal
                                options={resource ? resource.articleTypes : []}
                                getOptionLabel={(articleType) => articleType.description}
                                getOptionKey={(articleType: articleType) => articleType.id}
                                isOptionEqualToValue={(option, value) => option.id === value.id}
                                className={styles.filterSelect}
                                size="small"
                                renderInput={(params: any) =>
                                    <TextField
                                        {...params}
                                        label="Tipo de artigo"/>
                                }
                                value={articleType}
                                onChange={(event, selectedArticleType) => onArticleTypeChange(selectedArticleType)}
                                ListboxProps={{
                                    style: { textAlign: 'left' },
                                }}
                            />
                        }
                        {onPartyChange &&
                            <Autocomplete
                                disablePortal
                                options={resource ? resource.parties : []}
                                getOptionLabel={(party) => `${party.acronym} - ${party.name}`}
                                getOptionKey={(party: Party) => party.id}
                                isOptionEqualToValue={(option, value) => option.id === value.id}
                                className={styles.filterSelect}
                                size="small"
                                renderInput={(params: any) =>
                                    <TextField
                                        {...params}
                                        label="Partido"/>
                                }
                                value={party}
                                onChange={(event, selectedParty) => onPartyChange(selectedParty)}
                                ListboxProps={{
                                    style: { textAlign: 'left' },
                                }}
                            />
                        }
                        {onDeputyChange &&
                            <Autocomplete
                                disablePortal
                                options={resource ? resource.deputies : []}
                                getOptionLabel={(deputy) => deputy.electoralName}
                                getOptionKey={(deputy: Deputy) => deputy.id}
                                isOptionEqualToValue={(option, value) => option.id === value.id}
                                className={styles.filterSelect}
                                size="small"
                                renderInput={(params: any) =>
                                    <TextField
                                        {...params}
                                        label="Deputado"/>
                                }
                                value={deputy}
                                onChange={(event, selectedDeputy) => onDeputyChange(selectedDeputy)}
                                ListboxProps={{
                                    style: { textAlign: 'left' },
                                }}
                            />
                        }
                        {onExternalAuthorChange &&
                            <Autocomplete
                                disablePortal
                                options={resource ? resource.externalAuthors : []}
                                getOptionLabel={(externalAuthor) => externalAuthor.name}
                                getOptionKey={(externalAuthor: ExternalAuthor) => externalAuthor.id}
                                isOptionEqualToValue={(option, value) => option.id === value.id}
                                className={styles.filterSelect}
                                size="small"
                                renderInput={(params: any) =>
                                    <TextField
                                        {...params}
                                        label="Autor Externo"/>
                                }
                                value={externalAuthor}
                                onChange={(event, selectedExternalAuthor) => onExternalAuthorChange(selectedExternalAuthor)}
                                ListboxProps={{
                                    style: { textAlign: 'left' },
                                }}
                            />
                        }

                        <div className={styles.buttonsRow}>
                            <Button
                                variant="contained"
                                className={styles.filterButton}
                                onClick={() => {
                                    onFilterClick();
                                    closeModal();
                                }}
                            >
                                <FaFilter aria-label="Botão de aplicação dos filtros." />
                                <label>Filtrar</label>
                            </Button>
                            <Button
                                variant="contained"
                                className={styles.clearButton}
                                onClick={() => {
                                    clearFilters();
                                }}
                            >
                                <FaTrash aria-label="Botão de limpeza dos filtros adicionados." />
                                <label className={styles.clearButtonLabel}>Limpar</label>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            {<div className={styles.modalOverlay} onClick={closeModal}/>}
        </>
    );
});

export default FiltersModal;
