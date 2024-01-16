import React, {memo, useEffect, useState} from 'react';
import type {FC} from 'react';

import style from './styles.module.scss';
import Navbar from "../../components/base/navbar";
import TimeLine from "../../components/base/timeLine";
import {Filters} from "../../components/base/filters";
import DIContainer from "../../dicontainer";
import News from "../../../../core/domain/models/News";
import {NewsFilters} from "@typing/http/Filters";
import ShortRectangularAnnouncement from "@components/base/announcement/shortRectangular";
import CustomPagination from "@components/base/customPagination";
import {PageTitle} from "@components/base/pageTitle";

interface Props {
    className?: string;
}

const trendingNewsService = DIContainer.getTrendingNewsUseCase();

export const TrendingPage: FC<Props> = memo(function TrendingPage(props = {}) {
    const [trendingNewsList, setTrendingNews] = useState<News[]>([]);
    const [maxPageCount, setMaxPageCount] = useState<number>(0);

    const fetchTrendingNews = async (page?: number) => {
        try {
            const queryFilters: NewsFilters = {
                page: page,
                itemsPerPage: 15
            };

            const pagination = await trendingNewsService.getTrendingNews(queryFilters);
            setTrendingNews(pagination.data);
            setMaxPageCount(pagination.maxPageCount);
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        fetchTrendingNews();
    }, []);

    const actionOnChangePagination = (page: number) => {
        fetchTrendingNews(page);
    };

    return (
        <div className={`${style.resets} ${style.root} ${style.background}`}>
            <Navbar/>
            <div className={style.body}>
                <PageTitle iconStyle={style.trendingsIcon} titleViewStyle={style.titleView} label="Trendings"/>
                <Filters filtersRowStyle={style.filtersRow}/>
                <div className={style.trendingNewsContainer}>
                    <div className={style.trendingNewsLeftColumn}>
                        {<TimeLine newsList={trendingNewsList} />}
                        {maxPageCount != 0 && <CustomPagination count={maxPageCount} actionOnChange={actionOnChangePagination} />}
                    </div>
                    <div className={style.trendingNewsRightColumn}>
                        <ShortRectangularAnnouncement/>
                        <ShortRectangularAnnouncement/>
                    </div>
                </div>
            </div>
        </div>
    );
});
