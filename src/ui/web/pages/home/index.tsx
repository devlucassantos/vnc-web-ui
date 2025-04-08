import React, {memo, useContext, useEffect, useState} from 'react';
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
import ArticleNavigationBar from "ui/web/components/news/articleNavigationBar";
import CustomCircularProgress from "@components/base/customCircularProgress";
import ArticleType from "@models/ArticleType";
import BannerActivation from "@components/base/bannerActivation";
import User from "@models/User";
import {ResourceContext, ResourceContextType} from "@web/providers/resourceProvider";
import VideoCard from "@components/base/videoCard";
import BigCard from "@components/event/largeCard";
import LargeEventCard from "@components/event/largeCard";

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
    const [eventList, setEventList] = useState<Article[]>([]);
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
    const resourceContext = useContext(ResourceContext);
    const { resource} = resourceContext ?? {
        resource: null,
        fetchResources: () => {},
    } as ResourceContextType;
    const propositionArticleTypeId : string = resource?.articleTypes?.find((articleType, index) => articleType.codes == "proposition")?.id ?? ""
    const eventArticleTypeId : string = resource?.articleTypes?.find((articleType, index) => articleType.codes == "event")?.id ?? ""
    const specificTypeIds: string = resource?.propositionTypes
      ?.filter((propositionType) =>
        ["Projetos de Lei", "Medidas Provisórias", "Propostas de Emenda à Constituição"].includes(propositionType.description)
      )
      ?.map((propositionType) => propositionType.id)
      .join(",") ?? "";

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
                typeId: propositionArticleTypeId ? propositionArticleTypeId : articleType ? articleType.id : '',
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
                itemsPerPage: 5,
                typeId: propositionArticleTypeId,
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
                itemsPerPage: 5,
                articleTypeIds: propositionArticleTypeId,
                articleSpecificTypeIds: specificTypeIds
            };

            const articleTypes = await articleTypeService.getTrendingArticlesByType(queryFilters);
            setTrendingArticleListByType(articleTypes);
        } catch (error) {
            console.log(error)
        }
    };

    const fetchEvents = async () => {
        try {
            const queryFilters: ArticleFilters = {
                itemsPerPage: 5,
                page: 1,
                typeId: eventArticleTypeId,
                removeEventsInTheFuture: true,
            };

            const pagination = await articleService.getArticles(queryFilters);
            setEventList(pagination.data);
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        fetchArticles();
        fetchTrendingArticles();
        fetchTrendingArticlesByType();
        fetchEvents();
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
            <ArticleNavigationBar />
            <div className={style.body}>

                {loading ? (
                    <CustomCircularProgress />
                ) : (
                    articleList?.length > 0 ? (
                        <>
                            {!isAnyFilterApplied && eventList?.length > 0 &&
                                <>
                                    <TitleTopic titleViewStyle={style.emphasisArticleTitleView} label={"Eventos em Destaque"} color={eventList.at(0)!.type.color}/>
                                    <div className={style.mainGridContainer}>
                                        <CustomCarousel carouselStyle={style.mainGridCarousel}
                                                        articleList={eventList}
                                                        isEvent={true}/>
                                    </div>
                                </>
                            }

                            {!isAnyFilterApplied && trendingArticleListByType?.length > 0 &&
                                <>
                                    <div className={style.splitCarouselContainer}>
                                        { trendingArticleListByType.at(0) && trendingArticleListByType!.at(0)!.specificTypes && trendingArticleListByType!.at(0)!.specificTypes!.at(0) && trendingArticleListByType!.at(0)!.specificTypes!.at(0)!.articles && trendingArticleListByType!.at(0)!.specificTypes!.at(0)!.articles!.length > 0 && (
                                          <div className={style.splitCarouselColumn}>
                                              <TitleTopic titleViewStyle={style.splitCarouselTitleView}
                                                          label={trendingArticleListByType.at(0)!.specificTypes!.at(0)!.description}
                                                          color={trendingArticleListByType.at(0)!.specificTypes!.at(0)!.color}/>
                                              <CustomCarousel carouselStyle={style.splitCarousel}
                                                              articleList={trendingArticleListByType.at(0)!.specificTypes!.at(0)!.articles}
                                                              isSplitCard={true}/>
                                          </div>
                                        )}
                                        { trendingArticleListByType.at(0) && trendingArticleListByType!.at(0)!.specificTypes && trendingArticleListByType!.at(0)!.specificTypes!.at(1) && trendingArticleListByType!.at(0)!.specificTypes!.at(1)!.articles && trendingArticleListByType!.at(0)!.specificTypes!.at(1)!.articles!.length > 0 && (
                                          <div className={style.splitCarouselColumn}>
                                              <TitleTopic titleViewStyle={style.splitCarouselTitleView}
                                                          label={trendingArticleListByType.at(0)!.specificTypes!.at(1)!.description}
                                                          color={trendingArticleListByType.at(0)!.specificTypes!.at(1)!.color}/>
                                              <CustomCarousel carouselStyle={style.splitCarousel}
                                                              articleList={trendingArticleListByType.at(0)!.specificTypes!.at(1)!.articles}
                                                              isSplitCard={true}/>
                                          </div>
                                        )}
                                        { trendingArticleListByType.at(0) && trendingArticleListByType!.at(0)!.specificTypes && trendingArticleListByType!.at(0)!.specificTypes!.at(2) && trendingArticleListByType!.at(0)!.specificTypes!.at(2)!.articles && trendingArticleListByType!.at(0)!.specificTypes!.at(2)!.articles!.length > 0 && (
                                          <div className={style.splitCarouselColumn}>
                                              <TitleTopic titleViewStyle={style.splitCarouselTitleView}
                                                          label={"Emenda à Constituição"}
                                                          color={trendingArticleListByType.at(0)!.specificTypes!.at(2)!.color}/>
                                              <CustomCarousel carouselStyle={style.splitCarousel}
                                                              articleList={trendingArticleListByType.at(0)!.specificTypes!.at(2)!.articles}
                                                              isSplitCard={true}/>
                                          </div>
                                        )}
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
