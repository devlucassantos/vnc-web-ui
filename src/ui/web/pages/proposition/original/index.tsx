import React, {memo, useEffect, useState} from 'react';
import type {FC} from 'react';

import styles from './styles.module.scss';
import Navbar from "../../../components/base/navbar";
import DIContainer from "../../../dicontainer";
import {PageTitle} from "../../../components/base/pageTitle";
import PropositionDetailsCard from "../../../components/proposition/details";
import TrendingContainer from "../../../components/base/trending";
import ShortRectangularAnnouncement from "../../../components/base/announcement/shortRectangular";
import {useLocation, useParams} from "react-router-dom";
import Proposition from "../../../../../core/domain/models/Proposition";
import LongRectangularAnnouncement from "@components/base/announcement/longRectangular";
import {NewsFilters} from "@typing/http/Filters";
import News from "@models/News";
import PdfViewer from "@components/proposition/pdfViewer";

interface Props {
    className?: string;
}

const trendingNewsService = DIContainer.getTrendingNewsUseCase();

export const OriginalPropositionPage: FC<Props> = memo(function OriginalPropositionPage(props = {}) {
    const {codteor} = useParams();

    const [trendingNewsList, setTrendingNews] = useState<News[]>([]);
    const fetchTrendingNews = async (page?: number) => {
        try {
            const queryFilters: NewsFilters = {
                type: "Proposição",
                itemsPerPage: 5
            };

            const pagination = await trendingNewsService.getTrendingNews(queryFilters);
            setTrendingNews(pagination.data);
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        fetchTrendingNews();
    }, []);

    return (
        <div className={`${styles.resets} ${styles.background}`}>
            <Navbar/>
            <div className={styles.body}>
                <LongRectangularAnnouncement/>
                <PageTitle iconStyle={styles.pdfIcon} titleViewStyle={styles.titleView}
                           label="Proposição Original"/>
                <div className={styles.detailsContainer}>
                    <div className={styles.detailsLeftColumn}>
                        <PdfViewer pdfUrl={`/pdf?codteor=${codteor}`} />
                    </div>
                    <div className={styles.detailsRightColumn}>
                        <TrendingContainer trendingNewsList={trendingNewsList} />
                        <ShortRectangularAnnouncement/>
                    </div>
                </div>
            </div>
        </div>
    );
});
