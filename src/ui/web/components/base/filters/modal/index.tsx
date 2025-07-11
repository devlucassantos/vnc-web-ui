import React, {FC, memo, useContext, useEffect, useState} from 'react';
import Deputy from "@models/Deputy";
import styles from "./styles.module.scss";
import {FaTimes, FaFilter, FaTrash} from "react-icons/fa";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {Autocomplete, Checkbox, FormControlLabel, ToggleButton, ToggleButtonGroup} from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import DIContainer from "@web/dicontainer";
import Party from "@models/Party";
import ExternalAuthor from "@models/ExternalAuthor";
import {ResourceContext, ResourceContextType} from "@web/providers/resourceProvider";
import ArticleType from "@models/ArticleType";
import SpecificType from "@models/SpecificType";
import specificType from "@models/SpecificType";
import LegislativeBody from "@models/LegislativeBody";
import ArticleSituation from "@models/ArticleSituation";
import Resource from "@models/Resource";

interface ArticleTypeSelectorProps {
  articleType: ArticleType | null | undefined;
  onChange: (value: ArticleType | null) => void;
}

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
  propositionParty?: Party | null;
  propositionDeputy?: Deputy | null;
  eventRapporteur?: Deputy | null;
  propositionExternalAuthor?: ExternalAuthor | null;
  votingResult?: string | null;
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
  onPropositionPartyChange?: (value: Party | null) => void;
  onPropositionDeputyChange?: (value: Deputy | null) => void;
  onEventRapporteurChange?: (value: Deputy | null) => void;
  onPropositionExternalAuthorChange?: (value: ExternalAuthor | null) => void;
  onVotingResultChange?: (value: string | null) => void;
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
  propositionParty,
  propositionDeputy,
  eventRapporteur,
  propositionExternalAuthor,
  votingResult,
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
  onPropositionPartyChange,
  onPropositionDeputyChange,
  onEventRapporteurChange,
  onPropositionExternalAuthorChange,
  onVotingResultChange,
  onVotingLegislativeBodyChange,
  onEventLegislativeBodyChange,
  onEventSituationChange,
  onRemoveEventsInTheFuture,
  onFilterClick,
  ...props
}) {
  const [applyFilters, setApplyFilters] = useState<boolean>(false);
  const resourceContext = useContext(ResourceContext);
  const {resource, fetchResources} = resourceContext ?? {
    resource: null,
    fetchResources: () => {
    },
  } as ResourceContextType;
  const [isFirstRender, setIsFirstRender] = useState(true);
  const specificTypeOptions = getSpecificTypeOptions(resource, useAllSpecificTypes, articleType)
  const propositionArticleTypeColor: string = resource?.articleTypes?.find((articleType, index) => articleType.codes == "proposition")?.color ?? ""
  const eventArticleTypeColor: string = resource?.articleTypes?.find((articleType, index) => articleType.codes == "event")?.color ?? ""
  const votingArticleTypeColor: string = resource?.articleTypes?.find((articleType, index) => articleType.codes == "voting")?.color ?? ""
  const newsletterArticleTypeColor: string = resource?.articleTypes?.find((articleType, index) => articleType.codes == "newsletter")?.color ?? ""

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
    onPropositionPartyChange ? onPropositionPartyChange(null) : null;
    onPropositionDeputyChange ? onPropositionDeputyChange(null) : null;
    onEventRapporteurChange ? onEventRapporteurChange(null) : null;
    onPropositionExternalAuthorChange ? onPropositionExternalAuthorChange(null) : null;
    onVotingResultChange ? onVotingResultChange(null) : null;
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

  const votingResults = [
    {code: 'approved', description: 'Aprovada'},
    {code: 'rejected', description: 'Rejeitada'},
    {code: 'undetermined', description: 'Indeterminada'},
  ];

  const ArticleTypeSelector: React.FC<ArticleTypeSelectorProps> = ({articleType, onChange}) => {
    return (
      <ToggleButtonGroup
        value={articleType?.codes}
        exclusive
        onChange={(event, newValue) => {
          const foundType = resource?.articleTypes?.find(type => type.codes === newValue);
          onChange(foundType || null);
        }}
        fullWidth
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          [`@media (max-width: 500px)`]: {
            '& .MuiToggleButton-root': {
              flex: '1 0 50%',
            },
          },
        }}
      >
        <ToggleButton
          value="event"
          sx={{
            backgroundColor: articleType?.codes === 'event' ? `${eventArticleTypeColor}` : 'white',
            color: articleType?.codes === 'event' ? '#fff' : `${eventArticleTypeColor}`,
            '&.Mui-selected': {
              backgroundColor: eventArticleTypeColor,
              color: '#fff',
              borderRight: 'none !important',
            },
            '&.Mui-selected:hover': {
              backgroundColor: eventArticleTypeColor,
              color: '#fff',
              borderRight: 'none !important',
            },
            '&:hover': {
              backgroundColor: `${eventArticleTypeColor}`,
              color: '#fff',
              borderRight: 'none !important',
            },
            [`@media (max-width: 500px)`]: {
              borderRight: 'none',
              '& .MuiToggleButton-root': {
                flex: '1 0 50%',
              },
            },
            borderRight: '1px solid #ddd',
            textTransform: 'none',
            fontWeight: 'bold',
            flex: 1
          }}
        >
          Eventos
        </ToggleButton>

        <ToggleButton
          value="voting"
          sx={{
            backgroundColor: articleType?.codes === 'voting' ? `${votingArticleTypeColor}` : 'white',
            color: articleType?.codes === 'voting' ? '#fff' : `${votingArticleTypeColor}`,
            '&.Mui-selected': {
              backgroundColor: votingArticleTypeColor,
              color: '#fff',
              borderRight: 'none !important',
              borderLeft: 'none !important',
            },
            '&.Mui-selected:hover': {
              backgroundColor: votingArticleTypeColor,
              color: '#fff',
              borderRight: 'none !important',
              borderLeft: 'none !important',
            },
            '&:hover': {
              backgroundColor: `${votingArticleTypeColor}`,
              color: '#fff',
              borderRight: 'none !important',
              borderLeft: 'none !important',
            },
            [`@media (max-width: 500px)`]: {
              borderTopRightRadius: '4px !important',
              borderBottomRightRadius: '4px !important'
            },
            borderRight: '1px solid #ddd',
            borderLeft: '1px solid #ddd !important',
            textTransform: 'none',
            fontWeight: 'bold',
            flex: 1
          }}
        >
          Votações
        </ToggleButton>
        <ToggleButton
          value="proposition"
          sx={{
            backgroundColor: articleType?.codes === 'proposition' ? `${propositionArticleTypeColor}` : 'white',
            color: articleType?.codes === 'proposition' ? '#fff' : `${propositionArticleTypeColor}`,
            '&.Mui-selected': {
              backgroundColor: propositionArticleTypeColor,
              color: '#fff',
              borderRight: 'none !important',
              borderLeft: 'none !important',
            },
            '&.Mui-selected:hover': {
              backgroundColor: propositionArticleTypeColor,
              color: '#fff',
              borderRight: 'none !important',
              borderLeft: 'none !important',
            },
            '&:hover': {
              backgroundColor: `${propositionArticleTypeColor}`,
              color: '#fff',
              borderRight: 'none !important',
              borderLeft: 'none !important',
            },
            [`@media (max-width: 500px)`]: {
              marginLeft: '0 !important',
              borderLeft: '1px solid #ddd !important',
              borderRight: 'none',
              borderTop: 'none',
              borderTopLeftRadius: '4px !important',
              borderBottomLeftRadius: '4px !important'
            },
            borderRight: '1px solid #ddd',
            borderLeft: '1px solid #ddd !important',
            textTransform: 'none',
            fontWeight: 'bold',
            flex: 1
          }}
        >
          Proposições
        </ToggleButton>
        <ToggleButton
          value="newsletter"
          sx={{
            backgroundColor: articleType?.codes === 'newsletter' ? `${newsletterArticleTypeColor}` : 'white',
            color: articleType?.codes === 'newsletter' ? '#fff' : `${newsletterArticleTypeColor}`,
            '&.Mui-selected': {
              backgroundColor: newsletterArticleTypeColor,
              color: '#fff',
              borderLeft: 'none !important',
            },
            '&.Mui-selected:hover': {
              backgroundColor: newsletterArticleTypeColor,
              color: '#fff',
              borderLeft: 'none !important',
            },
            '&:hover': {
              backgroundColor: `${newsletterArticleTypeColor}`,
              color: '#fff',
              borderLeft: 'none !important',
            },
            [`@media (max-width: 500px)`]: {
              borderTop: 'none',
            },
            borderLeft: '1px solid #ddd !important',
            textTransform: 'none',
            fontWeight: 'bold',
            flex: 1
          }}
        >
          Boletins
        </ToggleButton>
      </ToggleButtonGroup>
    );
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
            {onArticleTypeChange &&
                <ArticleTypeSelector articleType={articleType} onChange={onArticleTypeChange}/>
            }

            {articleType?.codes === 'proposition' && (
              <>
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
                          style: {textAlign: 'left'},
                        }}
                    />
                }
                {onPropositionPartyChange &&
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
                        value={propositionParty}
                        onChange={(event, selectedParty) => onPropositionPartyChange(selectedParty)}
                        ListboxProps={{
                          style: {textAlign: 'left'},
                        }}
                    />
                }
                {onPropositionDeputyChange &&
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
                        value={propositionDeputy}
                        onChange={(event, selectedDeputy) => onPropositionDeputyChange(selectedDeputy)}
                        ListboxProps={{
                          style: {textAlign: 'left'},
                        }}
                    />
                }
                {onPropositionExternalAuthorChange &&
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
                        value={propositionExternalAuthor}
                        onChange={(event, selectedExternalAuthor) => onPropositionExternalAuthorChange(selectedExternalAuthor)}
                        ListboxProps={{
                          style: {textAlign: 'left'},
                        }}
                    />
                }
              </>
            )}

            {articleType?.codes === 'voting' && (
              <>
                {onVotingStartDateChange && onVotingEndDateChange && (
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <div className={styles.dateColumn}>
                      <DatePicker
                        label="Data Inicial da Votação"
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
                        label="Data Final da Votação"
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
                {onVotingResultChange &&
                    <Autocomplete
                        disablePortal
                        options={votingResults}
                        getOptionLabel={(option) => option.description}
                        isOptionEqualToValue={(option, value) => option.code === value.code}
                        className={styles.filterSelect}
                        size="small"
                        renderInput={(params) =>
                          <TextField
                            {...params}
                            label="Resultado da Votação"
                          />
                        }
                        value={votingResults.find(opt => opt.code === votingResult) || null}
                        onChange={(event, selectedOption) =>
                          onVotingResultChange(selectedOption?.code || null)
                        }
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
                          style: {textAlign: 'left'},
                        }}
                    />
                }
              </>
            )}

            {articleType?.codes === 'event' && (
              <>
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
                          style: {textAlign: 'left'},
                        }}
                    />
                }
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
                            label="Relator do Evento"/>
                        }
                        value={eventRapporteur}
                        onChange={(event, selectedEventRapporteur) => onEventRapporteurChange(selectedEventRapporteur)}
                        ListboxProps={{
                          style: {textAlign: 'left'},
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
                          style: {textAlign: 'left'},
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
                          style: {textAlign: 'left'},
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
              </>
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
                <FaFilter aria-label="Botão de aplicação dos filtros."/>
                <label>Filtrar</label>
              </Button>
              <Button
                variant="contained"
                className={styles.clearButton}
                onClick={() => {
                  clearFilters();
                }}
              >
                <FaTrash aria-label="Botão de limpeza dos filtros adicionados."/>
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
