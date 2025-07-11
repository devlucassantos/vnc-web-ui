import React, {memo, useEffect, useState} from 'react';
import type {FC} from 'react';

import styles from './styles.module.scss';
import Navbar from "../../../components/base/navbar";
import TimeLine from "../../../components/base/timeLine";
import DIContainer from "../../../dicontainer";
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
import {useNavigate} from "react-router-dom";

interface Props {
    className?: string;
}

const articleService = DIContainer.getArticleUseCase();

export const ViewLaterListPage: FC<Props> = memo(function ViewLaterListPage(props = {}) {
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
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);

    const fetchSavedArticlesToViewLater = async (page?: number) => {
        try {
            setLoading(true);
            setCurrentPage(page ?? 1)
            const queryFilters: ArticleFilters = {
                page: page,
                itemsPerPage: 15,
            };

            const pagination = await articleService.getSavedArticlesToViewLater(queryFilters);
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

    useEffect(() => {
        fetchSavedArticlesToViewLater();
        fetchTrendingArticles();
    }, []);

    const actionOnChangePagination = (page: number) => {
        fetchSavedArticlesToViewLater(page);
    };

    const handleFilterClick = () => {
        if (!!(content || startDate || endDate || articleType)) {
            const queryParams = buildQueryParams();

            const filteredParams = Object.entries(queryParams)
              .filter(([_, value]) => value !== '' && value !== null && value !== undefined)
              .reduce((acc, [key, value]) => {
                  acc[key] = value;
                  return acc;
              }, {} as Record<string, string | boolean>);

            const searchParams = new URLSearchParams(filteredParams as Record<string, string>).toString();
            navigate(`/search?${searchParams}`);
        }
    };

    const buildQueryParams = () => {
        const queryParams: ArticleFilters = {
            content: content,
            startDate: startDate ? format(startDate, 'yyyy-MM-dd') : '',
            endDate: endDate ? format(endDate, 'yyyy-MM-dd') : '',
        };

        if (articleType) {
            queryParams.typeId = articleType ? articleType.id : '';
            if ( articleType.codes == 'proposition') {
                queryParams.specificTypeId = specificType ? specificType.id : '';
                queryParams.propositionPartyId = propositionParty ? propositionParty.id : '';
                queryParams.propositionDeputyId = propositionDeputy ? propositionDeputy.id : '';
                queryParams.propositionExternalAuthorId = propositionExternalAuthor ? propositionExternalAuthor.id : '';
            } else if ( articleType.codes == 'voting') {
                queryParams.votingStartDate = votingStartDate ? format(votingStartDate, 'yyyy-MM-dd') : '';
                queryParams.votingEndDate = votingEndDate ? format(votingEndDate, 'yyyy-MM-dd') : '';
                queryParams.votingResult = votingResult ? votingResult : '';
                queryParams.votingLegislativeBodyId = votingLegislativeBody ? votingLegislativeBody.id : '';
            } else if ( articleType.codes == 'event') {
                queryParams.specificTypeId = specificType ? specificType.id : '';
                queryParams.eventStartDate = eventStartDate ? format(eventStartDate, 'yyyy-MM-dd') : '';
                queryParams.eventEndDate = eventEndDate ? format(eventEndDate, 'yyyy-MM-dd') : '';
                queryParams.eventLegislativeBodyId = eventLegislativeBody ? eventLegislativeBody.id : '';
                queryParams.eventRapporteurId = eventRapporteur ? eventRapporteur.id : '';
                queryParams.eventSituationId = eventSituation ? eventSituation.id : '';
                queryParams.removeEventsInTheFuture = removeEventsInTheFuture;
            }
        }

        return queryParams;
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
            <div className={styles.body}>
                {loading ? (
                    <CustomCircularProgress />
                ) : (
                    articleList?.length > 0 ? (
                        <div className={styles.propositionsContainer}>
                            <div className={styles.propositionsLeftColumn}>
                                <TitleTopic titleViewStyle={styles.propositionsTitleView} label="Matérias salvas" />
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
