import React, {memo, useContext, useEffect, useState} from 'react';
import type {FC} from 'react';

import styles from './styles.module.scss';
import Navbar from "../../../components/base/navbar";
import TimeLine from "../../../components/base/timeLine";
import DIContainer from "../../../dicontainer";
import Article from "@models/Article";
import {ArticleFilters, ArticleTypeFilters} from "@typing/http/Filters";
import CustomPagination from "@components/base/customPagination";
import TrendingContainer from "@components/base/trending";
import NoResultMessage from '@components/base/noResultMessage';
import Party from "@models/Party";
import Deputy from "@models/Deputy";
import ExternalAuthor from "@models/ExternalAuthor";
import {format} from "date-fns";
import style from "./styles.module.scss";
import {TitleTopic} from "@components/base/titleTopic";
import ArticleNavigationBar from "ui/web/components/news/articleNavigationBar";
import BigCard from "@components/news/cards/bigCard";
import {useNavigate, useParams} from "react-router-dom";
import LongVerticalRectangularAnnouncement from "@components/base/announcement/longRectangular/vertical";
import Footer from "@components/base/footer";
import CustomCircularProgress from "@components/base/customCircularProgress";
import ArticleType from "@models/ArticleType";
import {ResourceContext, ResourceContextType} from "@web/providers/resourceProvider";
import SpecificType from "@models/SpecificType";
import LegislativeBody from "@models/LegislativeBody";
import ArticleSituation from "@models/ArticleSituation";

interface Props {
    className?: string;
}

const articleService = DIContainer.getArticleUseCase();
const ArticleTypeService = DIContainer.getArticleTypeUseCase();

export const PropositionListByTypePage: FC<Props> = memo(function PropositionListByTypePage(props = {}) {
    const [articleList, setArticleList] = useState<Article[]>([]);
    const [trendingArticleListByType, setTrendingArticleListByType] = useState<ArticleType[]>([]);
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
    const {id} = useParams();
    const [loading, setLoading] = useState(true);
    const resourceContext = useContext(ResourceContext);
    const { resource} = resourceContext ?? {
        resource: null,
        fetchResources: () => {},
    } as ResourceContextType;
    const propositionArticleType = resource?.articleTypes?.find((articleType, index) => articleType.codes == 'proposition')
    const articleTypeColor : string = resource?.propositionTypes?.find((articleType, index) => articleType.id == id)?.color ?? "#0047AB"
    const articleTypeDescription : string = resource?.propositionTypes?.find((articleType, index) => articleType.id == id)?.description ?? ""
    const [currentPage, setCurrentPage] = useState(1);

    const fetchArticles = async (page?: number) => {
        try {
            setLoading(true);
            setCurrentPage(page ?? 1)
            if (propositionArticleType) setArticleType(propositionArticleType)
            const specificArticleType = resource?.propositionTypes?.find((type) => type.id == id)
            if (specificArticleType) setSpecificType(specificArticleType)
            const queryFilters: ArticleFilters = {
                page: page,
                specificTypeId: id,
                itemsPerPage: 15,
            };

            const pagination = await articleService.getArticles(queryFilters);
            setArticleList(pagination.data);
            setMaxPageCount(pagination.maxPageCount);
        } catch (error) {
            console.log(error)
            setArticleList([]);
        } finally {
            setLoading(false);
        }
    };

    const fetchTrendingArticlesByType = async () => {
        try {
            const queryFilters: ArticleTypeFilters = {
                itemsPerPage: 5,
                articleSpecificTypeIds: `${id}`
            };

            const articleTypes = await ArticleTypeService.getTrendingArticlesByType(queryFilters);
            setTrendingArticleListByType(articleTypes);
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        if (id) {
            fetchArticles();
            fetchTrendingArticlesByType();
        }
    }, [id]);

    const actionOnChangePagination = (page: number) => {
        fetchArticles(page);
    };

    const handleFilterClick = () => {
        if (!!(content || startDate || endDate || (articleType && articleType.codes !== 'proposition') || (specificType && specificType.id !== id) || propositionParty || propositionDeputy || propositionExternalAuthor)) {
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
            <ArticleNavigationBar />
            <div className={styles.body}>
                {loading ? (
                    <div className={style.loadingContainer}>
                        <CustomCircularProgress color={articleTypeColor}/>
                    </div>
                ) : (
                    articleList?.length > 0 ? (
                        <>
                            {trendingArticleListByType && trendingArticleListByType[0]?.specificTypes && trendingArticleListByType[0]?.specificTypes[0].articles?.length >= 3 && trendingArticleListByType[0]?.specificTypes[0]?.description !== "Outras Proposições" &&
                                <>
                                    <TitleTopic titleViewStyle={style.propositionTypeTitleView} label={articleTypeDescription} color={articleTypeColor} />
                                    <div className={style.gridContainer}>
                                        <BigCard article={trendingArticleListByType[0]?.specificTypes[0]?.articles[0]} typePropositionLabel={articleTypeDescription} cardStyle={style.bigCard}
                                                 imageContainerStyle={style.bigCardImageContainer} titleStyle={style.bigCardTitle} isHidden={false}/>
                                        <div className={style.gridColumn}>
                                            <BigCard article={trendingArticleListByType[0]?.specificTypes[0]?.articles[1]} typePropositionLabel={articleTypeDescription} cardStyle={style.mediumCard}
                                                     imageContainerStyle={style.gridMediumCardImageContainer} titleStyle={style.mediumCardTitle} isHidden={false}/>
                                            <BigCard article={trendingArticleListByType[0]?.specificTypes[0]?.articles[2]} typePropositionLabel={articleTypeDescription} cardStyle={style.mediumCard}
                                                     imageContainerStyle={style.gridMediumCardImageContainer} titleStyle={style.mediumCardTitle} isHidden={false}/>
                                        </div>
                                    </div>
                                </>
                            }
                            <div className={styles.propositionsContainer}>
                                <div className={styles.propositionsLeftColumn}>
                                    <TitleTopic titleViewStyle={style.lastArticleTitleView} label="Últimas Notícias" color={articleTypeColor}/>
                                    <TimeLine articleList={articleList} />
                                    {maxPageCount != 0 && <CustomPagination currentPage={currentPage} count={maxPageCount} actionOnChange={actionOnChangePagination} color={articleTypeColor} />}
                                </div>
                                <div className={styles.propositionsRightColumn}>
                                    {trendingArticleListByType[0]?.specificTypes[0]?.articles?.length > 0 &&
                                        <>
                                            <TitleTopic titleViewStyle={style.trendingTitleView} label="Em Destaque" color={articleTypeColor} />
                                        </>
                                    }
                                    <TrendingContainer trendingArticleList={trendingArticleListByType[0]?.specificTypes[0]?.articles} color={articleTypeColor}/>
                                    <LongVerticalRectangularAnnouncement/>
                                </div>
                            </div>
                        </>
                    ) : (
                        <NoResultMessage />
                    )
                )}
            </div>
            <Footer />
        </div>
    );
});
