import React, {memo, useEffect, useState} from 'react';
import type {FC} from 'react';

import styles from './styles.module.scss';
import Navbar from "../../../components/base/navbar";
import DIContainer from "../../../dicontainer";
import PropositionDetailsCard from "../../../components/proposition/details";
import TrendingContainer from "../../../components/base/trending";
import {useParams} from "react-router-dom";
import Proposition from "../../../../../core/domain/models/Proposition";
import LongHorizontalRectangularAnnouncement from "@components/base/announcement/longRectangular/horizontal";
import {ArticleFilters} from "@typing/http/Filters";
import Article from "@models/Article";
import NoResultMessage from "@components/base/noResultMessage";
import {TitleTopic} from "@components/base/titleTopic";
import LongVerticalRectangularAnnouncement from "@components/base/announcement/longRectangular/vertical";
import Footer from "@components/base/footer";
import CustomCircularProgress from "@components/base/customCircularProgress";

interface Props {
    className?: string;
}

const propositionService = DIContainer.getPropositionUseCase();
const articleService = DIContainer.getArticleUseCase();

export const PropositionDetailsPage: FC<Props> = memo(function PropositionDetailsPage(props = {}) {
    const {id} = useParams();
    const [proposition, setProposition] = useState<Proposition>();
    const [trendingArticleList, setTrendingArticle] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);

    const findProposition = async () => {
        try {
            if (id) {
                setLoading(true);
                const data = await propositionService.getPropositionByID(id);
                setProposition(data);
                await fetchTrendingArticles(data.type.specificType.id);
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false);
        }
    };

    const fetchTrendingArticles = async (specificTypeId?: string) => {
        try {
            const queryFilters: ArticleFilters = {
                specificTypeId: specificTypeId,
                itemsPerPage: 5
            };

            const pagination = await articleService.getTrendingArticles(queryFilters);
            setTrendingArticle(pagination.data);
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        findProposition();
    }, []);

    return (
        <div className={`${styles.resets} ${styles.background}`}>
            <Navbar showFilter={false} />
            <div className={styles.body}>
                <LongHorizontalRectangularAnnouncement/>
                {loading ? (
                    <CustomCircularProgress />
                ) : (
                    proposition ? (
                        <div className={styles.detailsContainer}>
                            <div className={styles.detailsLeftColumn}>
                                <TitleTopic titleViewStyle={styles.propositionDetailsTitleView} label="Detalhes da Proposição" />
                                {proposition && <PropositionDetailsCard proposition={proposition}/>}
                            </div>
                            <div className={styles.detailsRightColumn}>
                                <TitleTopic titleViewStyle={styles.trendingTitleView} label="Em Destaque" />
                                <TrendingContainer trendingArticleList={trendingArticleList} />
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
