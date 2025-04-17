import React, {FC, memo, useContext, useEffect, useState} from 'react';
import Deputy from "@models/Deputy";
import styles from "./styles.module.scss";
import {FaTimes, FaFilter, FaTrash} from "react-icons/fa";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {Autocomplete, Checkbox, FormControlLabel} from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import DIContainer from "@web/dicontainer";
import Party from "@models/Party";
import ExternalAuthor from "@models/ExternalAuthor";
import {ResourceContext, ResourceContextType} from "@web/providers/resourceProvider";
import ArticleType from "@models/ArticleType";
import articleType from "@models/ArticleType";
import SpecificType from "@models/SpecificType";
import specificType from "@models/SpecificType";
import LegislativeBody from "@models/LegislativeBody";
import ArticleSituation from "@models/ArticleSituation";
import Resource from "@models/Resource";

interface Props {
    className?: string;
    closeModal: any;
    useAllSpecificTypes?: boolean;
    startDate: Date | null;
    endDate: Date | null;
    votingStartDate: Date | null;
    votingEndDate: Date | null;
    eventStartDate: Date | null;
    eventEndDate: Date | null;
    articleType?: ArticleType | null;
    specificType?: SpecificType | null;
    party?: Party | null;
    deputy?: Deputy | null;
    eventRapporteur?: Deputy | null;
    externalAuthor?: ExternalAuthor | null;
    votingLegislativeBody?: LegislativeBody | null;
    eventLegislativeBody?: LegislativeBody | null;
    eventSituation?: ArticleSituation | null;
    removeEventsInTheFuture?: boolean;
    onStartDateChange?: (value: Date | null) => void;
    onEndDateChange?: (value: Date | null) => void;
    onVotingStartDateChange?: (value: Date | null) => void;
    onVotingEndDateChange?: (value: Date | null) => void;
    onEventStartDateChange?: (value: Date | null) => void;
    onEventEndDateChange?: (value: Date | null) => void;
    onArticleTypeChange?: (value: ArticleType | null) => void;
    onSpecificTypeChange?: (value: SpecificType | null) => void;
    onPartyChange?: (value: Party | null) => void;
    onDeputyChange?: (value: Deputy | null) => void;
    onEventRapporteurChange?: (value: Deputy | null) => void;
    onExternalAuthorChange?: (value: ExternalAuthor | null) => void;
    onVotingLegislativeBodyChange?: (value: LegislativeBody | null) => void;
    onEventLegislativeBodyChange?: (value: LegislativeBody | null) => void;
    onEventSituationChange?: (value: ArticleSituation | null) => void;
    onRemoveEventsInTheFuture?: (value: boolean) => void;
    onFilterClick: () => void;
}

const resourceService = DIContainer.getResourceUseCase();

export const FiltersModal: FC<Props> = memo(function FiltersModal({
    closeModal,
    useAllSpecificTypes = false,
    startDate,
    endDate,
    votingStartDate,
    votingEndDate,
    eventStartDate,
    eventEndDate,
    articleType,
    specificType,
    party,
    deputy,
    eventRapporteur,
    externalAuthor,
    votingLegislativeBody,
    eventLegislativeBody,
    eventSituation,
    removeEventsInTheFuture,
    onStartDateChange,
    onEndDateChange,
    onVotingStartDateChange,
    onVotingEndDateChange,
    onEventStartDateChange,
    onEventEndDateChange,
    onArticleTypeChange,
    onSpecificTypeChange,
    onPartyChange,
    onDeputyChange,
    onEventRapporteurChange,
    onExternalAuthorChange,
    onVotingLegislativeBodyChange,
    onEventLegislativeBodyChange,
    onEventSituationChange,
    onRemoveEventsInTheFuture,
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
    const specificTypeOptions = getSpecificTypeOptions(resource, useAllSpecificTypes, articleType)

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
        onStartDateChange ? onStartDateChange(null) : null;
        onEndDateChange ? onEndDateChange(null) : null;
        onVotingStartDateChange ? onVotingStartDateChange(null) : null;
        onVotingEndDateChange ? onVotingEndDateChange(null) : null;
        onEventStartDateChange ? onEventStartDateChange(null) : null;
        onEventEndDateChange ? onEventEndDateChange(null) : null;
        onArticleTypeChange ? onArticleTypeChange(null) : null;
        onSpecificTypeChange ? onSpecificTypeChange(null) : null;
        onPartyChange ? onPartyChange(null) : null;
        onDeputyChange ? onDeputyChange(null) : null;
        onEventRapporteurChange ? onEventRapporteurChange(null) : null;
        onExternalAuthorChange ? onExternalAuthorChange(null) : null;
        onVotingLegislativeBodyChange ? onVotingLegislativeBodyChange(null) : null;
        onEventLegislativeBodyChange ? onEventLegislativeBodyChange(null) : null;
        onEventSituationChange ? onEventSituationChange(null) : null;
        onRemoveEventsInTheFuture ? onRemoveEventsInTheFuture(true) : null;
        setApplyFilters(true)
    };

    function getSpecificTypeOptions(
      resource: Resource | null | undefined,
      useAllSpecificTypes: boolean,
      articleType?: ArticleType | null
    ): any[] {
      if (!resource) {
        return [];
      }

      if (articleType) {
        if (articleType.codes === 'proposition') {
            return resource.propositionTypes;
        } else if (articleType.codes === 'event') {
            return resource.eventTypes;
        }

        return [];
      }

      if (!useAllSpecificTypes) {
        return resource.propositionTypes;
      }

      return [...resource.propositionTypes, ...resource.eventTypes];
    }

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
                          {onStartDateChange && onEndDateChange && (
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <div className={styles.dateColumn}>
                                    <DatePicker
                                      label="Data Inicial do Artigo"
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
                                      label="Data Final do Artigo"
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
                        )}
                        {onVotingStartDateChange && onVotingEndDateChange && (
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                              <div className={styles.dateColumn}>
                                <DatePicker
                                  label="Data Inicial do Resultado da Votação"
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
                                  value={votingStartDate}
                                  onChange={(date: Date | null) => onVotingStartDateChange(date)}
                                />
                                <DatePicker
                                  label="Data Final do Resultado da Votação"
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
                                  value={votingEndDate}
                                  onChange={(date: Date | null) => onVotingEndDateChange(date)}
                                />
                              </div>
                            </LocalizationProvider>
                        )}
                        {onEventStartDateChange && onEventEndDateChange && (
                          <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <div className={styles.dateColumn}>
                              <DatePicker
                                label="Data Inicial do Evento"
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
                                value={eventStartDate}
                                onChange={(date: Date | null) => onEventStartDateChange(date)}
                              />
                              <DatePicker
                                label="Data Final do Evento"
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
                                value={eventEndDate}
                                onChange={(date: Date | null) => onEventEndDateChange(date)}
                              />
                            </div>
                          </LocalizationProvider>
                        )}
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
                        {onSpecificTypeChange &&
                          <Autocomplete
                            disablePortal
                            options={specificTypeOptions}
                            getOptionLabel={(specificType) => specificType.description}
                            getOptionKey={(specificType: specificType) => specificType.id}
                            isOptionEqualToValue={(option, value) => option.id === value.id}
                            className={styles.filterSelect}
                            size="small"
                            renderInput={(params: any) =>
                              <TextField
                                {...params}
                                label="Tipo especifico do artigo"/>
                            }
                            value={specificType}
                            onChange={(event, selectedSpecificType) => onSpecificTypeChange(selectedSpecificType)}
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
                        {onEventRapporteurChange &&
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
                                    label="Relator do Evento" />
                                }
                                value={eventRapporteur}
                                onChange={(event, selectedEventRapporteur) => onEventRapporteurChange(selectedEventRapporteur)}
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
                        {onVotingLegislativeBodyChange &&
                            <Autocomplete
                                disablePortal
                                options={resource ? resource.legislativeBodies : []}
                                getOptionLabel={(legislativeBody) => legislativeBody.name + ` (${legislativeBody.acronym})`}
                                getOptionKey={(legislativeBody: LegislativeBody) => legislativeBody.id}
                                isOptionEqualToValue={(option, value) => option.id === value.id}
                                className={styles.filterSelect}
                                size="small"
                                renderInput={(params: any) =>
                                  <TextField
                                    {...params}
                                    label="Órgão Legislativo da Votação"/>
                                }
                                value={votingLegislativeBody}
                                onChange={(event, selectedLegislativeBody) => onVotingLegislativeBodyChange(selectedLegislativeBody)}
                                ListboxProps={{
                                  style: { textAlign: 'left' },
                                }}
                            />
                        }
                        {onEventLegislativeBodyChange &&
                            <Autocomplete
                                disablePortal
                                options={resource ? resource.legislativeBodies : []}
                                getOptionLabel={(legislativeBody) => legislativeBody.name + ` (${legislativeBody.acronym})`}
                                getOptionKey={(legislativeBody: LegislativeBody) => legislativeBody.id}
                                isOptionEqualToValue={(option, value) => option.id === value.id}
                                className={styles.filterSelect}
                                size="small"
                                renderInput={(params: any) =>
                                  <TextField
                                    {...params}
                                    label="Órgão Legislativo do Evento"/>
                                }
                                value={eventLegislativeBody}
                                onChange={(event, selectedLegislativeBody) => onEventLegislativeBodyChange(selectedLegislativeBody)}
                                ListboxProps={{
                                  style: { textAlign: 'left' },
                                }}
                            />
                        }
                        {onEventSituationChange &&
                            <Autocomplete
                                disablePortal
                                options={resource ? resource.eventSituations : []}
                                getOptionLabel={(eventSituation) => eventSituation.description}
                                getOptionKey={(eventSituation: ArticleSituation) => eventSituation.id}
                                isOptionEqualToValue={(option, value) => option.id === value.id}
                                className={styles.filterSelect}
                                size="small"
                                renderInput={(params: any) =>
                                  <TextField
                                    {...params}
                                    label="Situação do Evento"/>
                                }
                                value={eventSituation}
                                onChange={(event, selectedEventSituation) => onEventSituationChange(selectedEventSituation)}
                                ListboxProps={{
                                  style: { textAlign: 'left' },
                                }}
                            />
                        }
                        {onRemoveEventsInTheFuture && (
                          <FormControlLabel
                            control={
                                <Checkbox
                                  size="small"
                                  checked={removeEventsInTheFuture}
                                  onChange={(e) => onRemoveEventsInTheFuture(e.target.checked)}
                                  sx={{
                                      transform: 'scale(1.3)',
                                      '&.Mui-checked': {
                                          color: '#0047ab',
                                      },
                                  }}
                                />
                            }
                            label="Remover eventos no futuro"
                            className={styles.filterCheckbox}
                          />
                        )}

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
