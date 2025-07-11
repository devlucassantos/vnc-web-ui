import React, {memo, useContext, useEffect, useState} from 'react';
import type {FC} from 'react';

import styles from './styles.module.scss';
import Navbar from "@components/base/navbar";
import TimeLine from "@components/base/timeLine";
import DIContainer from "../../dicontainer";
import Article from "@models/Article";
import {ArticleFilters} from "@typing/http/Filters";
import CustomPagination from "@components/base/customPagination";
import TrendingContainer from "@components/base/trending";
import NoResultMessage from '@components/base/noResultMessage';
import Party from "@models/Party";
import Deputy from "@models/Deputy";
import ExternalAuthor from "@models/ExternalAuthor";
import {format} from "date-fns";
import {TitleTopic} from "@components/base/titleTopic";
import LongVerticalRectangularAnnouncement from "@components/base/announcement/longRectangular/vertical";
import Footer from "@components/base/footer";
import CustomCircularProgress from "@components/base/customCircularProgress";
import ArticleType from "@models/ArticleType";
import SpecificType from "@models/SpecificType";
import LegislativeBody from "@models/LegislativeBody";
import ArticleSituation from "@models/ArticleSituation";
import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import {ResourceContext, ResourceContextType} from "@web/providers/resourceProvider";
import dayjs from 'dayjs';
import ArticleNavigationBar from "@components/news/articleNavigationBar";

interface Props {
    className?: string;
}

const articleService = DIContainer.getArticleUseCase();

export const SearchPage: FC<Props> = memo(function SearchPage(props = {}) {
    const [articleList, setArticle] = useState<Article[]>([]);
    const [trendingArticleList, setTrendingArticle] = useState<Article[]>([]);
    const [maxPageCount, setMaxPageCount] = useState<number>(0);
    const [content, setContent] = useState<string>('');
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [articleType, setArticleType] = useState<ArticleType | null>(null);
    const [specificType, setSpecificType] = useState<SpecificType | null>(null);
    const [propositionParty, setPropositionParty] = useState<Party | null>(null);
    const [propositionDeputy, setPropositionDeputy] = useState<Deputy | null>(null);
    const [propositionExternalAuthor, setPropositionExternalAuthor] = useState<ExternalAuthor | null>(null);
    const [votingResult, setVotingResult] = useState<string | null>(null);
    const [votingLegislativeBody, setVotingLegislativeBody] = useState<LegislativeBody | null>(null);
    const [votingStartDate, setVotingStartDate] = useState<Date | null>(null);
    const [votingEndDate, setVotingEndDate] = useState<Date | null>(null);
    const [eventStartDate, setEventStartDate] = useState<Date | null>(null);
    const [eventEndDate, setEventEndDate] = useState<Date | null>(null);
    const [eventSituation, setEventSituation] = useState<ArticleSituation | null>(null);
    const [eventLegislativeBody, setEventLegislativeBody] = useState<LegislativeBody | null>(null);
    const [eventRapporteur, setEventRapporteur] = useState<Deputy | null>(null);
    const [removeEventsInTheFuture, setRemoveEventsInTheFuture] = useState<boolean>(true);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const location = useLocation();
    const navigate = useNavigate();
    const resourceContext = useContext(ResourceContext);
    const { resource} = resourceContext ?? {
        resource: null,
        fetchResources: () => {},
    } as ResourceContextType;
    const [filtersLoaded, setFiltersLoaded] = useState(false);

    useEffect(() => {
        if (!resource || filtersLoaded) {
            return
        }

        const params = queryString.parse(location.search);

        const applyFiltersFromParams = async () => {
            if (params.page) setCurrentPage(Number(params.page));
            if (params.content) setContent(String(params.content));
            if (params.startDate && typeof params.startDate === 'string') {
                setStartDate(dayjs(params.startDate).toDate());
            }
            if (params.endDate && typeof params.endDate === 'string') {
                setEndDate(dayjs(params.endDate).toDate());
            }

            if (params.typeId) {
                const type = resource?.articleTypes?.find((articleType) => articleType.id === params.typeId);
                if (type) {
                    setArticleType(type);

                    if (type.codes === 'proposition') {
                        if (params.specificTypeId) {
                            const type = resource?.propositionTypes?.find((specificType) => specificType.id === params.specificTypeId);
                            if (type) setSpecificType(type);
                        }

                        if (params.propositionPartyId) {
                            const party = resource?.parties?.find((party) => party.id === params.propositionPartyId);
                            if (party) setPropositionParty(party);
                        }

                        if (params.propositionDeputyId) {
                            const deputy = resource?.deputies?.find((deputy) => deputy.id === params.propositionDeputyId);
                            if (deputy) setPropositionDeputy(deputy);
                        }

                        if (params.propositionExternalAuthorId) {
                            const externalAuthor = resource?.externalAuthors?.find((ea) => ea.id === params.propositionExternalAuthorId);
                            if (externalAuthor) setPropositionExternalAuthor(externalAuthor);
                        }
                    } else if (type.codes === 'voting') {
                        if (params.votingStartDate && typeof params.votingStartDate === 'string') {
                            setVotingStartDate(dayjs(params.votingStartDate).toDate());
                        }
                        if (params.votingEndDate && typeof params.votingEndDate === 'string') {
                            setVotingEndDate(dayjs(params.votingEndDate).toDate());
                        }
                        if (params.votingResult) setVotingResult(String(params.votingResult));
                        if (params.votingLegislativeBodyId) {
                            const legBody = resource?.legislativeBodies?.find((lb) => lb.id === params.votingLegislativeBodyId);
                            if (legBody) setVotingLegislativeBody(legBody);
                        }
                    } else if (type.codes === 'event') {
                        if (params.specificTypeId) {
                            const type = resource?.eventTypes?.find((specificType) => specificType.id === params.specificTypeId);
                            if (type) setSpecificType(type);
                        }
                        if (params.eventStartDate && typeof params.eventStartDate === 'string') {
                            setEventStartDate(dayjs(params.eventStartDate).toDate());
                        }
                        if (params.eventEndDate && typeof params.eventEndDate === 'string') {
                            setEventEndDate(dayjs(params.eventEndDate).toDate());
                        }
                        if (params.eventLegislativeBodyId) {
                            const legBody = resource?.legislativeBodies?.find((lb) => lb.id === params.eventLegislativeBodyId);
                            if (legBody) setEventLegislativeBody(legBody);
                        }
                        if (params.eventRapporteurId) {
                            const rapporteur = resource?.deputies?.find((d) => d.id === params.eventRapporteurId);
                            if (rapporteur) setEventRapporteur(rapporteur);
                        }
                        if (params.eventSituationId) {
                            const situation = resource?.eventSituations?.find((s) => s.id === params.eventSituationId);
                            if (situation) setEventSituation(situation);
                        }
                        if (params.removeEventsInTheFuture !== undefined) {
                            setRemoveEventsInTheFuture(params.removeEventsInTheFuture !== 'false');
                        }
                    }
                }
            }

            setFiltersLoaded(true);
        };

        applyFiltersFromParams();
    }, [resource]);

    useEffect(() => {
        if (filtersLoaded) {
            fetchArticles(currentPage);
            fetchTrendingArticles();
        }
    }, [filtersLoaded]);


    const fetchArticles = async (page?: number) => {
        try {
            setLoading(true);
            setCurrentPage(page ?? 1)
            const queryFilters: ArticleFilters = {
                page: page,
                content: content,
                startDate: startDate ? format(startDate, 'yyyy-MM-dd') : '',
                endDate: endDate ? format(endDate, 'yyyy-MM-dd') : '',
            };

            if (articleType) {
                queryFilters.typeId = articleType ? articleType.id : '';
                if ( articleType.codes == 'proposition') {
                    queryFilters.specificTypeId = specificType ? specificType.id : '';
                    queryFilters.propositionPartyId = propositionParty ? propositionParty.id : '';
                    queryFilters.propositionDeputyId = propositionDeputy ? propositionDeputy.id : '';
                    queryFilters.propositionExternalAuthorId = propositionExternalAuthor ? propositionExternalAuthor.id : '';
                } else if ( articleType.codes == 'voting') {
                    queryFilters.votingStartDate = votingStartDate ? format(votingStartDate, 'yyyy-MM-dd') : '';
                    queryFilters.votingEndDate = votingEndDate ? format(votingEndDate, 'yyyy-MM-dd') : '';
                    queryFilters.votingResult = votingResult ? votingResult : '';
                    queryFilters.votingLegislativeBodyId = votingLegislativeBody ? votingLegislativeBody.id : '';
                } else if ( articleType.codes == 'event') {
                    queryFilters.specificTypeId = specificType ? specificType.id : '';
                    queryFilters.eventStartDate = eventStartDate ? format(eventStartDate, 'yyyy-MM-dd') : '';
                    queryFilters.eventEndDate = eventEndDate ? format(eventEndDate, 'yyyy-MM-dd') : '';
                    queryFilters.eventLegislativeBodyId = eventLegislativeBody ? eventLegislativeBody.id : '';
                    queryFilters.eventRapporteurId = eventRapporteur ? eventRapporteur.id : '';
                    queryFilters.eventSituationId = eventSituation ? eventSituation.id : '';
                    queryFilters.removeEventsInTheFuture = removeEventsInTheFuture;
                }
            }

            const filteredParams = Object.fromEntries(
              Object.entries(queryFilters).filter(([_, v]) => v !== undefined && v !== '')
            );
            const query = queryString.stringify(filteredParams);
            navigate(`/search?${query}`, { replace: true });

            queryFilters.itemsPerPage = 15;

            const pagination = await articleService.getArticles(queryFilters);
            setArticle(pagination.data);
            setMaxPageCount(pagination.maxPageCount);
        } catch (error) {
            console.log(error)
            setArticle([]);
        } finally {
            setLoading(false);
        }
    };

    const fetchTrendingArticles = async () => {
        try {
            const queryFilters: ArticleFilters = {
                itemsPerPage: 5
            };

            const pagination = await articleService.getTrendingArticles(queryFilters);
            setTrendingArticle(pagination.data);
        } catch (error) {
            console.log(error)
        }
    };

    const actionOnChangePagination = (page: number) => {
        fetchArticles(page);
    };

    const handleFilterClick = () => {
        if (articleType) {
            if (articleType.codes === 'proposition') {
                clearVotingFilters();
                clearEventFilters();
            } else if (articleType.codes === 'voting') {
                clearPropositionFilters();
                clearEventFilters();
            } else if (articleType.codes === 'event') {
                clearPropositionFilters();
                clearVotingFilters();
            }
        }

        fetchArticles();
    };

    const clearPropositionFilters = () => {
        setPropositionParty(null)
        setPropositionDeputy(null)
        setPropositionExternalAuthor(null)
    }

    const clearVotingFilters = () => {
        setVotingResult(null)
        setVotingEndDate(null)
        setVotingStartDate(null)
        setVotingLegislativeBody(null)
    }

    const clearEventFilters = () => {
        setEventRapporteur(null)
        setEventStartDate(null)
        setEventEndDate(null)
        setEventSituation(null)
        setEventLegislativeBody(null)
    }

    return (
        <div className={`${styles.resets} ${styles.root} ${styles.background}`}>
            <Navbar
                showFilter={true}
                startDate={startDate}
                endDate={endDate}
                articleType={articleType}
                specificType={specificType}
                propositionParty={propositionParty}
                propositionDeputy={propositionDeputy}
                propositionExternalAuthor={propositionExternalAuthor}
                votingResult={votingResult}
                votingLegislativeBody={votingLegislativeBody}
                votingStartDate={votingStartDate}
                votingEndDate={votingEndDate}
                eventStartDate={eventStartDate}
                eventEndDate={eventEndDate}
                eventSituation={eventSituation}
                eventLegislativeBody={eventLegislativeBody}
                eventRapporteur={eventRapporteur}
                removeEventsInTheFuture={removeEventsInTheFuture}
                onContentChange={(value) => setContent(value)}
                onStartDateChange={(value) => setStartDate(value)}
                onEndDateChange={(value) => setEndDate(value)}
                onArticleTypeChange={(value) => {
                    setArticleType(value)
                    setSpecificType(null)
                }}
                onSpecificTypeChange={(value) => setSpecificType(value)}
                onPropositionPartyChange={(value) => setPropositionParty(value)}
                onPropositionDeputyChange={(value) => setPropositionDeputy(value)}
                onPropositionExternalAuthorChange={(value) => setPropositionExternalAuthor(value)}
                onVotingResultChange={(value) => setVotingResult(value)}
                onVotingLegislativeBodyChange={(value) => setVotingLegislativeBody(value)}
                onVotingStartDateChange={(value) => setVotingStartDate(value)}
                onVotingEndDateChange={(value) => setVotingEndDate(value)}
                onEventStartDateChange={(value) => setEventStartDate(value)}
                onEventEndDateChange={(value) => setEventEndDate(value)}
                onEventSituationChange={(value) => setEventSituation(value)}
                onEventLegislativeBodyChange={(value) => setEventLegislativeBody(value)}
                onEventRapporteurChange={(value) => setEventRapporteur(value)}
                onRemoveEventsInTheFuture={(value) => setRemoveEventsInTheFuture(value)}
                useAllSpecificTypes={true}
                onFilterClick={handleFilterClick}
            />
            <ArticleNavigationBar />
            <div className={styles.body}>
                {loading ? (
                    <CustomCircularProgress />
                ) : (
                    articleList?.length > 0 ? (
                        <div className={styles.propositionsContainer}>
                            <div className={styles.propositionsLeftColumn}>
                                <TitleTopic titleViewStyle={styles.propositionsTitleView} label="Matérias em Busca" />
                                <TimeLine articleList={articleList} />
                                {maxPageCount != 0 && <CustomPagination currentPage={currentPage} count={maxPageCount} actionOnChange={actionOnChangePagination} />}
                            </div>
                            <div className={styles.propositionsRightColumn}>
                                <TitleTopic titleViewStyle={styles.trendingTitleView} label="Em Destaque" />
                                <TrendingContainer trendingArticleList={trendingArticleList} />
                                <LongVerticalRectangularAnnouncement/>
                            </div>
                        </div>
                    ) : (
                        <NoResultMessage />
                    )
                )}
            </div>
            <Footer />
        </div>
    );
});
