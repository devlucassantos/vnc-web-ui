import React, {memo, useContext, useEffect, useState} from 'react';
import type {FC} from 'react';

import styles from './styles.module.scss';
import Navbar from "../../../components/base/navbar";
import DIContainer from "../../../dicontainer";
import TrendingContainer from "../../../components/base/trending";
import {useParams} from "react-router-dom";
import Newsletter from "../../../../../core/domain/models/Newsletter";
import LongHorizontalRectangularAnnouncement from "@components/base/announcement/longRectangular/horizontal";
import NewsletterDetailsCard from "@components/newsletter/details";
import Article from "@models/Article";
import {ArticleFilters} from "@typing/http/Filters";
import NoResultMessage from "@components/base/noResultMessage";
import {TitleTopic} from "@components/base/titleTopic";
import LongVerticalRectangularAnnouncement from "@components/base/announcement/longRectangular/vertical";
import Footer from "@components/base/footer";
import CustomCircularProgress from "@components/base/customCircularProgress";
import {ResourceContext, ResourceContextType} from "@web/providers/resourceProvider";

interface Props {
    className?: string;
}

const newsletterService = DIContainer.getNewsletterUseCase();
const articleService = DIContainer.getArticleUseCase();

export const NewsletterDetailsPage: FC<Props> = memo(function NewsletterDetailsPage(props = {}) {
    const { id } = useParams();
    const [newsletter, setNewsletter] = useState<Newsletter>();
    const [trendingArticleList, setTrendingArticle] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);
    const resourceContext = useContext(ResourceContext);
    const { resource} = resourceContext ?? {
        resource: null,
        fetchResources: () => {},
    } as ResourceContextType;

    const findNewsletter = async () => {
        try {
            if (id) {
                setLoading(true);
                const data = await newsletterService.getNewsletterByID(id);
                setNewsletter(data);
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false);
        }
    };

    const fetchTrendingArticles = async () => {
        try {
            const queryFilters: ArticleFilters = {
                typeId: resource?.articleTypes?.find((type) => type.description == 'Boletins')?.id,
                itemsPerPage: 5
            };

            const pagination = await articleService.getTrendingArticles(queryFilters);
            setTrendingArticle(pagination.data);
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        findNewsletter();
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
                    newsletter ? (
                        <div className={styles.detailsContainer}>
                            <div className={styles.detailsLeftColumn}>
                                <TitleTopic titleViewStyle={styles.newsletterDetailsTitleView} label="Detalhes do Boletim" />
                                {newsletter && <NewsletterDetailsCard newsletter={newsletter}/>}
                            </div>
                            <div className={styles.detailsRightColumn}>
                                <TitleTopic titleViewStyle={styles.trendingTitleView} label="Em Destaque" />
                                <TrendingContainer trendingArticleList={trendingArticleList}/>
                                <LongVerticalRectangularAnnouncement/>
                            </div>
                        </div>
                    ) : (
                        <div className={styles.noResultContainer}>
                            <NoResultMessage />
                        </div>
                    )
                )}
            </div>
            <Footer />
        </div>
    );
});
