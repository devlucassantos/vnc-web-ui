import {memo, useEffect, useState} from 'react';
import type {FC} from 'react';

import style from './styles.module.scss';
import Navbar from "../../components/base/navbar";
import BigCard from "../../components/news/cards/bigCard";
import TimeLine from "../../components/base/timeLine";
import {Filters} from "../../components/base/filters";
import DIContainer from "../../dicontainer";
import News from "../../../../core/domain/models/News";
import {NewsFilters} from "@typing/http/Filters";

interface Props {
    className?: string;
}

const newsService = DIContainer.getNewsUseCase();

export const Home: FC<Props> = memo(function Home(props = {}) {
    const [newsList, setNews] = useState<News[]>([]);
    const [maxPageCount, setMaxPageCount] = useState<number>(0);

    const fetchNews = async (page?: number) => {
        try {
            const queryFilters: NewsFilters = {
                page: page,
                itemsPerPage: 8
            };

            const pagination = await newsService.getNews(queryFilters);
            setNews(pagination.data);
            setMaxPageCount(pagination.maxPageCount);
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        fetchNews();
    }, []);

    const actionOnChangePagination = (page: number) => {
        fetchNews(page);
    };

    return (
        <div className={`${style.resets} ${style.root} ${style.background}`}>
            <Navbar/>
            <div className={style.body}>
                <Filters filtersRowStyle={style.filtersRow}/>
                {newsList.length > 0 && <BigCard news={newsList[0]}/>}
                {<TimeLine newsList={newsList.slice(1)} maxPageCount={maxPageCount}
                           actionOnChangePagination={actionOnChangePagination}/>}
            </div>
        </div>
    );
});
