import React, {memo, useEffect, useState} from 'react';
import type {FC} from 'react';

import style from './styles.module.scss';
import Navbar from "../../components/base/navbar";
import TimeLine from "../../components/base/timeLine";
import DIContainer from "../../dicontainer";
import Article from "@models/Article";
import {ArticleFilters, ArticleTypeFilters} from "@typing/http/Filters";
import TrendingContainer from "@components/base/trending";
import CustomPagination from "@components/base/customPagination";
import NoResultMessage from '@components/base/noResultMessage';
import {format} from "date-fns";
import Party from "@models/Party";
import Deputy from "@models/Deputy";
import ExternalAuthor from "@models/ExternalAuthor";
import {TitleTopic} from "@components/base/titleTopic";
import LongVerticalRectangularAnnouncement from "@components/base/announcement/longRectangular/vertical";
import Footer from "@components/base/footer";
import CustomCarousel from "@components/base/carousel";
import PropositionNavigationBar from "@components/proposition/propositionNavigationBar";
import CustomCircularProgress from "@components/base/customCircularProgress";
import ArticleType from "@models/ArticleType";
import BannerActivation from "@components/base/bannerActivation";
import User from "@models/User";

interface Props {
    className?: string;
}

const articleService = DIContainer.getArticleUseCase();
const articleTypeService = DIContainer.getArticleTypeUseCase();
const authenticationService = DIContainer.getAuthenticationUseCase();

export const Home: FC<Props> = memo(function Home(props = {}) {
    const [articleList, setArticle] = useState<Article[]>([]);
    const [trendingArticleList, setTrendingArticle] = useState<Article[]>([]);
    const [trendingArticleListByType, setTrendingArticleListByType] = useState<ArticleType[]>([]);
    const [maxPageCount, setMaxPageCount] = useState<number>(0);
    const [content, setContent] = useState<string>('');
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [articleType, setArticleType] = useState<ArticleType | null>(null);
    const [party, setParty] = useState<Party | null>(null);
    const [deputy, setDeputy] = useState<Deputy | null>(null);
    const [externalAuthor, setExternalAuthor] = useState<ExternalAuthor | null>(null);
    const [loading, setLoading] = useState(true);
    const [isAnyFilterApplied, setIsAnyFilterApplied] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [user, setUser] = useState<User | null>(
        authenticationService.getCachedUser() as User
    );

    const fetchArticles = async (page?: number) => {
        try {
            setLoading(true);
            setCurrentPage(page ?? 1)
            const queryFilters: ArticleFilters = {
                page: page,
                itemsPerPage: 15,
                content: content,
                startDate: startDate ? format(startDate, 'yyyy-MM-dd') : '',
                endDate: endDate ? format(endDate, 'yyyy-MM-dd') : '',
                typeId: articleType ? articleType.id : '',
                partyId: party ? party.id : '',
                deputyId: deputy ? deputy.id : '',
                externalAuthorId: externalAuthor ? externalAuthor.id : '',
            };

            const pagination = await articleService.getArticles(queryFilters);
            setIsAnyFilterApplied(!!(content || startDate || endDate || articleType || party || deputy || externalAuthor))
            setArticle(pagination.data);
            setMaxPageCount(pagination.maxPageCount);
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false);
        }
    };

    const fetchTrendingArticles = async () => {
        try {
            const queryFilters: ArticleFilters = {
                itemsPerPage: 5
            };

            const pagination = await articleService.getTrendingArticles(queryFilters);
            setTrendingArticle(pagination.data);
        } catch (error) {
            console.log(error)
        }
    };

    const fetchTrendingArticlesByType = async () => {
        try {
            const queryFilters: ArticleTypeFilters = {
                itemsPerPage: 5
            };

            const articleTypes = await articleTypeService.getTrendingArticlesByType(queryFilters);
            setTrendingArticleListByType(articleTypes);
        } catch (error) {
            console.log(error)
        }
    };


    useEffect(() => {
        fetchArticles();
        fetchTrendingArticles();
        fetchTrendingArticlesByType();
    }, []);

    const actionOnChangePagination = (page: number) => {
        fetchArticles(page);
    };

    const handleFilterClick = () => {
        fetchArticles();
    };

    return (
        <div className={`${style.resets} ${style.root} ${style.background}`}>
            <Navbar
                showFilter={true}
                startDate={startDate}
                endDate={endDate}
                articleType={articleType}
                party={party}
                deputy={deputy}
                externalAuthor={externalAuthor}
                onContentChange={(value) => setContent(value)}
                onStartDateChange={(value) => setStartDate(value)}
                onEndDateChange={(value) => setEndDate(value)}
                onArticleTypeChange={(value) => setArticleType(value)}
                onPartyChange={(value) => setParty(value)}
                onDeputyChange={(value) => setDeputy(value)}
                onExternalAuthorChange={(value) => setExternalAuthor(value)}
                onFilterClick={handleFilterClick}
            />
            { user && <BannerActivation roles={user.roles} /> }
            <PropositionNavigationBar />
            <div className={style.body}>

                {loading ? (
                    <CustomCircularProgress />
                ) : (
                    articleList?.length > 0 ? (
                        <>
                            {!isAnyFilterApplied && trendingArticleListByType?.length > 0 &&
                                <>
                                    <TitleTopic titleViewStyle={style.emphasisArticleTitleView} label="Notícias em Destaque" />
                                    <div className={style.gridContainer}>
                                        <CustomCarousel carouselStyle={style.gridBigCarousel} articleList={trendingArticleListByType.at(1)!.propositionArticles} typePropositionLabel={trendingArticleListByType.at(1)!.description} cardStyle={style.card} imageContainerStyle={style.gridBigCardImageContainer} titleStyle={style.bigCardTitle} dotColor={trendingArticleListByType.at(1)!.color} />
                                        <div className={style.gridColumn}>
                                            <CustomCarousel carouselStyle={style.mediumCarousel} articleList={trendingArticleListByType.at(2)!.propositionArticles} typePropositionLabel={trendingArticleListByType.at(2)!.description} cardStyle={style.card} imageContainerStyle={style.gridMediumCardImageContainer} titleStyle={style.mediumCardTitle} dotColor={trendingArticleListByType.at(2)!.color} />
                                            <CustomCarousel carouselStyle={style.mediumCarousel} articleList={trendingArticleListByType.at(3)!.propositionArticles} typePropositionLabel={trendingArticleListByType.at(3)!.description} cardStyle={style.card} imageContainerStyle={style.gridMediumCardImageContainer} titleStyle={style.mediumCardTitle} dotColor={trendingArticleListByType.at(3)!.color} />
                                        </div>
                                    </div>
                                    <div className={style.gridContainer}>
                                        <div className={style.gridColumn}>
                                            <CustomCarousel carouselStyle={style.mediumCarousel} articleList={trendingArticleListByType.at(4)!.propositionArticles} typePropositionLabel={trendingArticleListByType.at(4)!.description} cardStyle={style.card} imageContainerStyle={style.gridMediumCardImageContainer} titleStyle={style.mediumCardTitle} dotColor={trendingArticleListByType.at(4)!.color} />
                                            <CustomCarousel carouselStyle={style.mediumCarousel} articleList={trendingArticleListByType.at(5)!.propositionArticles} typePropositionLabel={trendingArticleListByType.at(5)!.description} cardStyle={style.card} imageContainerStyle={style.gridMediumCardImageContainer} titleStyle={style.mediumCardTitle} dotColor={trendingArticleListByType.at(5)!.color} />
                                        </div>
                                        <CustomCarousel carouselStyle={`${style.gridBigCarousel} ${style.otherPropositionCarousel}`} articleList={trendingArticleListByType.at(6)!.propositionArticles} typePropositionLabel={trendingArticleListByType.at(6)!.description} cardStyle={style.card} imageContainerStyle={style.gridBigCardImageContainer} titleStyle={style.bigCardTitle} dotColor={trendingArticleListByType.at(6)!.color} />
                                    </div>
                                </>
                            }
                            <div className={style.articleContainer}>
                                <div className={style.articleLeftColumn}>
                                    <TitleTopic titleViewStyle={style.lastArticleTitleView} label="Últimas Notícias" />
                                    {<TimeLine articleList={articleList} />}
                                    {maxPageCount != 0 && <CustomPagination currentPage={currentPage} count={maxPageCount} actionOnChange={actionOnChangePagination} />}
                                </div>
                                <div className={style.articleRightColumn}>
                                    <TitleTopic titleViewStyle={style.trendingTitleView} label="Em Destaque" />
                                    <TrendingContainer trendingArticleList={trendingArticleList} />
                                    <LongVerticalRectangularAnnouncement/>
                                </div>
                            </div>
                        </>
                    ) : (
                        <NoResultMessage />
                    )
                )}
            </div>
            <Footer />
        </div>
    );
});
