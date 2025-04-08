import React, {memo, useContext, useEffect, useState} from 'react';
import type {FC} from 'react';

import styles from './styles.module.scss';
import Navbar from "../../../components/base/navbar";
import DIContainer from "../../../dicontainer";
import TrendingContainer from "../../../components/base/trending";
import {useParams} from "react-router-dom";
import LongHorizontalRectangularAnnouncement from "@components/base/announcement/longRectangular/horizontal";
import {ArticleFilters} from "@typing/http/Filters";
import Article from "@models/Article";
import PdfViewer from "@components/proposition/pdfViewer";
import {TitleTopic} from "@components/base/titleTopic";
import Footer from "@components/base/footer";
import LongVerticalRectangularAnnouncement from "@components/base/announcement/longRectangular/vertical";
import CustomCircularProgress from "@components/base/customCircularProgress";
import {ResourceContext, ResourceContextType} from "@web/providers/resourceProvider";

interface Props {
    className?: string;
}

const articleService = DIContainer.getArticleUseCase();

export const OriginalPropositionPage: FC<Props> = memo(function OriginalPropositionPage(props = {}) {
    const {codteor} = useParams();

    const resourceContext = useContext(ResourceContext);
    const { resource} = resourceContext ?? {
        resource: null,
        fetchResources: () => {},
    } as ResourceContextType;
    const [trendingArticleList, setTrendingArticleList] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);
    const fetchTrendingArticles = async (page?: number) => {
        try {
            setLoading(true);
            const queryFilters: ArticleFilters = {
                typeId: resource?.articleTypes?.find((type) => type.codes == 'proposition')?.id,
                itemsPerPage: 5
            };

            const pagination = await articleService.getTrendingArticles(queryFilters);
            setTrendingArticleList(pagination.data);
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTrendingArticles();
    }, []);

    return (
        <div className={`${styles.resets} ${styles.background}`}>
            <Navbar showFilter={false} />
            <div className={styles.body}>
                <LongHorizontalRectangularAnnouncement/>
                {loading ? (
                    <CustomCircularProgress />
                ) : (
                    <div className={styles.detailsContainer}>
                        <div className={styles.detailsLeftColumn}>
                            <TitleTopic titleViewStyle={styles.originalPropostionTitleView} label="Proposição Original" />
                            <PdfViewer pdfUrl={`/pdf?codteor=${codteor}`} />
                        </div>
                        <div className={styles.detailsRightColumn}>
                            <TitleTopic titleViewStyle={styles.trendingTitleView} label="Em Destaque" />
                            <TrendingContainer trendingArticleList={trendingArticleList} />
                            <LongVerticalRectangularAnnouncement/>
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
});
