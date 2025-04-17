import React, {memo, useContext, useEffect, useState} from 'react';
import type {FC} from 'react';

import styles from './styles.module.scss';
import Navbar from "../../../components/base/navbar";
import TimeLine from "../../../components/base/timeLine";
import DIContainer from "../../../dicontainer";
import Article from "@models/Article";
import {ArticleFilters} from "@typing/http/Filters";
import CustomPagination from "@components/base/customPagination";
import TrendingContainer from "@components/base/trending";
import NoResultMessage from "@components/base/noResultMessage";
import { format } from 'date-fns';
import {TitleTopic} from "@components/base/titleTopic";
import LongVerticalRectangularAnnouncement from "@components/base/announcement/longRectangular/vertical";
import Footer from "@components/base/footer";
import CustomCircularProgress from "@components/base/customCircularProgress";
import {ResourceContext, ResourceContextType} from "@web/providers/resourceProvider";
import ArticleNavigationBar from "@components/news/articleNavigationBar";
import SpecificType from "@models/SpecificType";
import ArticleSituation from "@models/ArticleSituation";
import LegislativeBody from "@models/LegislativeBody";

interface Props {
    className?: string;
}

const articleService = DIContainer.getArticleUseCase();

export const EventListPage: FC<Props> = memo(function EventListPage(props = {}) {
    const [articleList, setArticle] = useState<Article[]>([]);
    const [trendingArticleList, setTrendingArticle] = useState<Article[]>([]);
    const [maxPageCount, setMaxPageCount] = useState<number>(0);
    const [content, setContent] = useState<string>('');
    const [removeEventsInTheFuture, setRemoveEventsInTheFuture] = useState<boolean>(true);
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [specificType, setSpecificType] = useState<SpecificType | null>(null);
    const [eventSituation, setEventSituation] = useState<ArticleSituation | null>(null);
    const [eventLegislativeBody, setEventLegislativeBody] = useState<LegislativeBody | null>(null);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const resourceContext = useContext(ResourceContext);
    const { resource} = resourceContext ?? {
        resource: null,
        fetchResources: () => {},
    } as ResourceContextType;

    const fetchArticles = async (page?: number) => {
        try {
            setLoading(true);
            setCurrentPage(page ?? 1)
            const queryFilters: ArticleFilters = {
                page: page,
                typeId: resource?.articleTypes?.find((type) => type.codes == 'event')?.id,
                itemsPerPage: 15,
                removeEventsInTheFuture: removeEventsInTheFuture,
                content: content,
                startDate: startDate ? format(startDate, 'yyyy-MM-dd') : '',
                endDate: endDate ? format(endDate, 'yyyy-MM-dd') : '',
                specificTypeId: specificType ? specificType.id : '',
                eventSituationId: eventSituation ? eventSituation.id : '',
                eventLegislativeBodyId: eventLegislativeBody ? eventLegislativeBody.id : '',
            };

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
                typeId: resource?.articleTypes?.find((type) => type.codes == 'event')?.id,
                itemsPerPage: 5
            };

            const pagination = await articleService.getTrendingArticles(queryFilters);
            setTrendingArticle(pagination.data);
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        fetchArticles();
        fetchTrendingArticles();
    }, []);

    const actionOnChangePagination = (page: number) => {
        fetchArticles(page);
    };

    const handleFilterClick = () => {
        fetchArticles();
    };

    return (
        <div className={`${styles.resets} ${styles.root} ${styles.background}`}>
            <Navbar
                showFilter={true}
                startDate={startDate}
                endDate={endDate}
                articleType={resource?.articleTypes?.find((type) => type.codes == 'event')}
                specificType={specificType}
                eventSituation={eventSituation}
                eventLegislativeBody={eventLegislativeBody}
                removeEventsInTheFuture={removeEventsInTheFuture}
                onContentChange={(value) => setContent(value)}
                onStartDateChange={(value) => setStartDate(value)}
                onEndDateChange={(value) => setEndDate(value)}
                onSpecificTypeChange={(value) => setSpecificType(value)}
                onEventSituationChange={(value) => setEventSituation(value)}
                onEventLegislativeBodyChange={(value) => setEventLegislativeBody(value)}
                onRemoveEventsInTheFuture={(value) => setRemoveEventsInTheFuture(value)}
                onFilterClick={handleFilterClick}
            />
            <ArticleNavigationBar />
            <div className={styles.body}>
                {loading ? (
                    <CustomCircularProgress />
                ) : (
                    articleList?.length > 0 ? (
                        <div className={styles.newslettersContainer}>
                            <div className={styles.newslettersLeftColumn}>
                                <TitleTopic titleViewStyle={styles.newslettersTitleView} label="Eventos" color={articleList.at(0)!.type.color}/>
                                <TimeLine articleList={articleList} />
                                {maxPageCount != 0 && <CustomPagination currentPage={currentPage} count={maxPageCount} actionOnChange={actionOnChangePagination} color={articleList.at(0)!.type.color} />}
                            </div>
                            <div className={styles.newslettersRightColumn}>
                                <TitleTopic titleViewStyle={styles.trendingTitleView} label="Em Destaque" color={articleList.at(0)!.type.color} />
                                <TrendingContainer trendingArticleList={trendingArticleList} color={articleList.at(0)!.type.color} />
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
