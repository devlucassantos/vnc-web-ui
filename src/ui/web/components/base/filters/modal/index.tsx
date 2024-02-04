import React, {FC, memo, useEffect, useState} from 'react';
import Deputy from "@models/Deputy";
import styles from "./styles.module.scss";
import {FaTimes, FaFilter, FaBroom, FaTrash} from "react-icons/fa";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {Autocomplete} from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import DIContainer from "@web/dicontainer";
import Resource from "@models/Resource";
import Party from "@models/Party";
import Organization from "@models/Organization";

interface Props {
    className?: string;
    closeModal: any;
    startDate: Date | null;
    endDate: Date | null;
    party?: Party | null;
    deputy?: Deputy | null;
    organization?: Organization | null;
    onStartDateChange: (value: Date | null) => void;
    onEndDateChange: (value: Date | null) => void;
    onPartyChange?: (value: Party | null) => void;
    onDeputyChange?: (value: Deputy | null) => void;
    onOrganizationChange?: (value: Organization | null) => void;
    onFilterClick: () => void;
}

const resourceService = DIContainer.getResourceUseCase();

export const FiltersModal: FC<Props> = memo(function FiltersModal({
    closeModal,
    startDate,
    endDate,
    party,
    deputy,
    organization,
    onStartDateChange,
    onEndDateChange,
    onPartyChange,
    onDeputyChange,
    onOrganizationChange,
    onFilterClick,
    ...props
}) {
    const [applyFilters, setApplyFilters] = useState<boolean>(false);
    const [resource, setResource] = useState<Resource | null>(null);
    const fetchResources = async () => {
        try {
            const resource = await resourceService.getResources();
            setResource(resource);
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        fetchResources();
    }, []);

    useEffect(() => {
        onFilterClick();
    }, [applyFilters]);

    const clearFilters = () => {
        onStartDateChange(null);
        onEndDateChange(null);
        onPartyChange ? onPartyChange(null) : null;
        onDeputyChange ? onDeputyChange(null) : null;
        onOrganizationChange ? onOrganizationChange(null) : null;
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
                            <FaTimes className={styles.closeButton} onClick={closeModal}/>
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
                            />
                        }
                        {onDeputyChange &&
                            <Autocomplete
                                disablePortal
                                options={resource ? resource.deputies : []}
                                getOptionLabel={(deputy) => deputy.name}
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
                            />
                        }
                        {onOrganizationChange &&
                            <Autocomplete
                                disablePortal
                                options={resource ? resource.organizations : []}
                                getOptionLabel={(organization) => organization.name}
                                getOptionKey={(organization: Organization) => organization.id}
                                isOptionEqualToValue={(option, value) => option.id === value.id}
                                className={styles.filterSelect}
                                size="small"
                                renderInput={(params: any) =>
                                    <TextField
                                        {...params}
                                        label="Organização"/>
                                }
                                value={organization}
                                onChange={(event, selectedOrganization) => onOrganizationChange(selectedOrganization)}
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
                                <FaFilter/>
                                <label>Filtrar</label>
                            </Button>
                            <Button
                                variant="contained"
                                className={styles.clearButton}
                                onClick={() => {
                                    clearFilters();
                                }}
                            >
                                <FaTrash/>
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
