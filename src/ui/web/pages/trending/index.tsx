import React, {memo, useEffect, useState} from 'react';
import type {FC} from 'react';

import style from './styles.module.scss';
import Navbar from "../../components/base/navbar";
import TimeLine from "../../components/base/timeLine";
import DIContainer from "../../dicontainer";
import Article from "@models/Article";
import {ArticleFilters} from "@typing/http/Filters";
import ShortRectangularAnnouncement from "@components/base/announcement/shortRectangular";
import CustomPagination from "@components/base/customPagination";
import NoResultMessage from "@components/base/noResultMessage";
import Party from "@models/Party";
import Deputy from "@models/Deputy";
import ExternalAuthor from "@models/ExternalAuthor";
import {format} from "date-fns";
import {TitleTopic} from "@components/base/titleTopic";
import styles from "@pages/trending/styles.module.scss";
import LongVerticalRectangularAnnouncement from "@components/base/announcement/longRectangular/vertical";
import Footer from "@components/base/footer";
import CustomCircularProgress from "@components/base/customCircularProgress";

interface Props {
    className?: string;
}

const articleService = DIContainer.getArticleUseCase();

export const TrendingPage: FC<Props> = memo(function TrendingPage(props = {}) {
    const [trendingArticleList, setTrendingArticle] = useState<Article[]>([]);
    const [maxPageCount, setMaxPageCount] = useState<number>(0);
    const [content, setContent] = useState<string>('');
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [party, setParty] = useState<Party | null>(null);
    const [deputy, setDeputy] = useState<Deputy | null>(null);
    const [externalAuthor, setExternalAuthor] = useState<ExternalAuthor | null>(null);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);

    const fetchTrendingArticles = async (page?: number) => {
        try {
            setLoading(true);
            setCurrentPage(page ?? 1)
            const queryFilters: ArticleFilters = {
                page: page,
                itemsPerPage: 15,
                content: content,
                startDate: startDate ? format(startDate, 'yyyy-MM-dd') : '',
                endDate: endDate ? format(endDate, 'yyyy-MM-dd') : '',
                partyId: party ? party.id : '',
                deputyId: deputy ? deputy.id : '',
                externalAuthorId: externalAuthor ? externalAuthor.id : '',
            };

            const pagination = await articleService.getTrendingArticles(queryFilters);
            setTrendingArticle(pagination.data);
            setMaxPageCount(pagination.maxPageCount);
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTrendingArticles();
    }, []);

    const actionOnChangePagination = (page: number) => {
        fetchTrendingArticles(page);
    };

    const handleFilterClick = () => {
        fetchTrendingArticles();
    };

    return (
        <div className={`${style.resets} ${style.root} ${style.background}`}>
            <Navbar
                showFilter={true}
                startDate={startDate}
                endDate={endDate}
                party={party}
                deputy={deputy}
                externalAuthor={externalAuthor}
                onContentChange={(value) => setContent(value)}
                onStartDateChange={(value) => setStartDate(value)}
                onEndDateChange={(value) => setEndDate(value)}
                onPartyChange={(value) => setParty(value)}
                onDeputyChange={(value) => setDeputy(value)}
                onExternalAuthorChange={(value) => setExternalAuthor(value)}
                onFilterClick={handleFilterClick}
            />
            <div className={style.body}>
                {loading ? (
                    <CustomCircularProgress />
                ) : (
                    trendingArticleList?.length > 0 ? (
                        <>
                            <TitleTopic titleViewStyle={styles.trendingsTitleView} label="Trendings" />
                            <div className={style.trendingArticleContainer}>
                                <div className={style.trendingArticleLeftColumn}>
                                    <TimeLine articleList={trendingArticleList} />
                                    {maxPageCount != 0 && <CustomPagination currentPage={currentPage} count={maxPageCount} actionOnChange={actionOnChangePagination} />}
                                </div>
                                <div className={style.trendingArticleRightColumn}>
                                    <ShortRectangularAnnouncement/>
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
