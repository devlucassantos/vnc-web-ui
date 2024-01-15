import {memo, useEffect, useState} from 'react';
import type {FC} from 'react';

import styles from './styles.module.scss';
import Navbar from "../../../components/base/navbar";
import TimeLine from "../../../components/base/timeLine";
import {Filters} from "../../../components/base/filters";
import DIContainer from "../../../dicontainer";
import News from "../../../../../core/domain/models/News";
import {PageTitle} from "../../../components/base/pageTitle";
import {NewsFilters} from "@typing/http/Filters";

interface Props {
    className?: string;
}

const newsService = DIContainer.getNewsUseCase();

export const PropositionListPage: FC<Props> = memo(function PropositionListPage(props = {}) {
    const [newsList, setNews] = useState<News[]>([]);
    const [maxPageCount, setMaxPageCount] = useState<number>(0);

    const fetchNews = async (page?: number) => {
        try {
            const queryFilters: NewsFilters = {
                page: page,
                type: 'Proposição',
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
        <div className={`${styles.resets} ${styles.root} ${styles.background}`}>
            <Navbar/>
            <div className={styles.body}>
                <PageTitle iconStyle={styles.lawDocumentIcon} titleViewStyle={styles.titleView} label="Proposições"/>
                <Filters filtersRowStyle={styles.filtersRow}/>
                {newsList.length > 0 && <TimeLine newsList={newsList} maxPageCount={maxPageCount}
                                                  actionOnChangePagination={actionOnChangePagination}/>}
            </div>
        </div>
    );
});

