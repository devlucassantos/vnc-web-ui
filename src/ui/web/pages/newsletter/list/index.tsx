import React, {memo, useEffect, useState} from 'react';
import type {FC} from 'react';

import styles from './styles.module.scss';
import Navbar from "../../../components/base/navbar";
import TimeLine from "../../../components/base/timeLine";
import {Filters} from "../../../components/base/filters";
import DIContainer from "../../../dicontainer";
import News from "../../../../../core/domain/models/News";
import {PageTitle} from "../../../components/base/pageTitle";
import {NewsFilters} from "@typing/http/Filters";
import CustomPagination from "@components/base/customPagination";
import TrendingContainer from "@components/base/trending";
import ShortRectangularAnnouncement from "@components/base/announcement/shortRectangular";
import NoResultMessage from "@components/base/noResultMessage";
import { format } from 'date-fns';

interface Props {
    className?: string;
}

const newsService = DIContainer.getNewsUseCase();
const trendingNewsService = DIContainer.getTrendingNewsUseCase();

export const NewsletterListPage: FC<Props> = memo(function NewsletterListPage(props = {}) {
    const [newsList, setNews] = useState<News[]>([]);
    const [trendingNewsList, setTrendingNews] = useState<News[]>([]);
    const [maxPageCount, setMaxPageCount] = useState<number>(0);
    const [content, setContent] = useState<string>('');
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

    const fetchNews = async (page?: number) => {
        try {
            const queryFilters: NewsFilters = {
                page: page,
                type: 'Boletim',
                itemsPerPage: 15,
                content: content,
                startDate: startDate ? format(startDate, 'yyyy-MM-dd') : '',
                endDate: endDate ? format(endDate, 'yyyy-MM-dd') : '',
            };

            const pagination = await newsService.getNews(queryFilters);
            setNews(pagination.data);
            setMaxPageCount(pagination.maxPageCount);
        } catch (error) {
            console.log(error)
        }
    };

    const fetchTrendingNews = async () => {
        try {
            const queryFilters: NewsFilters = {
                type: 'Boletim',
                itemsPerPage: 5
            };

            const pagination = await trendingNewsService.getTrendingNews(queryFilters);
            setTrendingNews(pagination.data);
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        fetchNews();
        fetchTrendingNews();
    }, []);

    const actionOnChangePagination = (page: number) => {
        fetchNews(page);
    };

    const handleFilterClick = () => {
        fetchNews();
    };

    return (
        <div className={`${styles.resets} ${styles.root} ${styles.background}`}>
            <Navbar/>
            <div className={styles.body}>
                <PageTitle iconStyle={styles.newsletterIcon} titleViewStyle={styles.titleView} label="Boletins"/>
                <Filters
                    filtersRowStyle={styles.filtersRow}
                    startDate={startDate}
                    endDate={endDate}
                    onContentChange={(value) => setContent(value)}
                    onStartDateChange={(value) => setStartDate(value)}
                    onEndDateChange={(value) => setEndDate(value)}
                    onFilterClick={handleFilterClick}
                />
                {newsList?.length > 0 ? (
                    <div className={styles.newslettersContainer}>
                        <div className={styles.newslettersLeftColumn}>
                            <TimeLine newsList={newsList} />
                            {maxPageCount != 0 && <CustomPagination count={maxPageCount} actionOnChange={actionOnChangePagination} />}
                        </div>
                        <div className={styles.newslettersRightColumn}>
                            <TrendingContainer trendingNewsList={trendingNewsList} />
                            <ShortRectangularAnnouncement/>
                        </div>
                    </div>
                ) : (
                    <NoResultMessage />
                )}
            </div>
        </div>
    );
});
