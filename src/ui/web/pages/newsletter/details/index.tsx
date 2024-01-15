import React, {memo, useEffect, useState} from 'react';
import type {FC} from 'react';

import styles from './styles.module.scss';
import Navbar from "../../../components/base/navbar";
import DIContainer from "../../../dicontainer";
import {PageTitle} from "../../../components/base/pageTitle";
import TrendingContainer from "../../../components/base/trending";
import ShortRectangularAnnouncement from "../../../components/base/announcement/shortRectangular";
import {useParams} from "react-router-dom";
import Newsletter from "../../../../../core/domain/models/Newsletter";
import LongRectangularAnnouncement from "@components/base/announcement/longRectangular";
import NewsletterDetailsCard from "@components/newsletter/details";
import News from "@models/News";
import {NewsFilters} from "@typing/http/Filters";

interface Props {
    className?: string;
}

const newsletterService = DIContainer.getNewsletterUseCase();
const trendingNewsService = DIContainer.getTrendingNewsUseCase();

export const NewsletterDetailsPage: FC<Props> = memo(function NewsletterDetailsPage(props = {}) {
    const { id } = useParams();
    const [newsletter, setNewsletter] = useState<Newsletter>();
    const [trendingNewsList, setTrendingNews] = useState<News[]>([]);

    const findNewsletter = async () => {
        try {
            if (id) {
                const data = await newsletterService.getNewsletterByID(id);
                setNewsletter(data);
            }
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
        findNewsletter();
        fetchTrendingNews();
    }, []);

    return (
        <div className={`${styles.resets} ${styles.background}`}>
            <Navbar/>
            <div className={styles.body}>
                <LongRectangularAnnouncement/>
                <PageTitle iconStyle={styles.infoIcon} titleViewStyle={styles.titleView} label="Detalhes do Boletim"/>
                <div className={styles.detailsContainer}>
                    <div className={styles.detailsLeftColumn}>
                        {newsletter && <NewsletterDetailsCard newsletter={newsletter}/>}
                    </div>
                    <div className={styles.detailsRightColumn}>
                        <TrendingContainer trendingNewsList={trendingNewsList}/>
                        <ShortRectangularAnnouncement/>
                    </div>
                </div>
            </div>
        </div>
    );
});
