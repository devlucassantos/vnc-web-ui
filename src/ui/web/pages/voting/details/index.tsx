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
import Voting from "@models/Voting";
import VotingDetailsCard from "@components/voting/details";

interface Props {
    className?: string;
}

const votingService = DIContainer.getVotingUseCase();
const articleService = DIContainer.getArticleUseCase();

export const VotingDetailsPage: FC<Props> = memo(function VotingDetailsPage(props = {}) {
    const {id} = useParams();
    const [voting, setVoting] = useState<Voting>();
    const [trendingArticleList, setTrendingArticle] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);

    const findVoting = async () => {
        try {
            if (id) {
                setLoading(true);
                const data = await votingService.getVotingByID(id);
                setVoting(data);
                await fetchTrendingArticles(data.type.id);
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false);
        }
    };

    const fetchTrendingArticles = async (typeId?: string) => {
        try {
            const queryFilters: ArticleFilters = {
                typeId: typeId,
                itemsPerPage: 5
            };

            const pagination = await articleService.getTrendingArticles(queryFilters);
            setTrendingArticle(pagination.data);
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        findVoting();
    }, []);

    return (
        <div className={`${styles.resets} ${styles.background}`}>
            <Navbar showFilter={false} />
            <div className={styles.body}>
                <LongHorizontalRectangularAnnouncement/>
                {loading ? (
                    <CustomCircularProgress />
                ) : (
                    voting ? (
                        <div className={styles.detailsContainer}>
                            <div className={styles.detailsLeftColumn}>
                                <TitleTopic titleViewStyle={styles.propositionDetailsTitleView} label="Detalhes da Votação" />
                                {voting && <VotingDetailsCard voting={voting}/>}
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
