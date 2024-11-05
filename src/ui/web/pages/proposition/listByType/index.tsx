import React, {memo, useContext, useEffect, useState} from 'react';
import type {FC} from 'react';

import styles from './styles.module.scss';
import Navbar from "../../../components/base/navbar";
import TimeLine from "../../../components/base/timeLine";
import DIContainer from "../../../dicontainer";
import Article from "@models/Article";
import {ArticleFilters, ArticleTypeFilters} from "@typing/http/Filters";
import CustomPagination from "@components/base/customPagination";
import TrendingContainer from "@components/base/trending";
import NoResultMessage from '@components/base/noResultMessage';
import Party from "@models/Party";
import Deputy from "@models/Deputy";
import ExternalAuthor from "@models/ExternalAuthor";
import {format} from "date-fns";
import style from "./styles.module.scss";
import {TitleTopic} from "@components/base/titleTopic";
import PropositionNavigationBar from "@components/proposition/propositionNavigationBar";
import BigCard from "@components/news/cards/bigCard";
import {useParams} from "react-router-dom";
import LongVerticalRectangularAnnouncement from "@components/base/announcement/longRectangular/vertical";
import Footer from "@components/base/footer";
import CustomCircularProgress from "@components/base/customCircularProgress";
import ArticleType from "@models/ArticleType";
import {ResourceContext, ResourceContextType} from "@web/providers/resourceProvider";

interface Props {
    className?: string;
}

const articleService = DIContainer.getArticleUseCase();
const ArticleTypeService = DIContainer.getArticleTypeUseCase();

export const PropositionListByTypePage: FC<Props> = memo(function PropositionListByTypePage(props = {}) {
    const [articleList, setArticleList] = useState<Article[]>([]);
    const [trendingArticleListByType, setTrendingArticleListByType] = useState<ArticleType[]>([]);
    const [maxPageCount, setMaxPageCount] = useState<number>(0);
    const [content, setContent] = useState<string>('');
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [party, setParty] = useState<Party | null>(null);
    const [deputy, setDeputy] = useState<Deputy | null>(null);
    const [externalAuthor, setExternalAuthor] = useState<ExternalAuthor | null>(null);
    const {id} = useParams();
    const [loading, setLoading] = useState(true);
    const resourceContext = useContext(ResourceContext);
    const { resource} = resourceContext ?? {
        resource: null,
        fetchResources: () => {},
    } as ResourceContextType;
    const articleTypeColor : string = resource?.articleTypes?.find((articleType, index) => articleType.id == id)?.color ?? "#0047AB"
    const articleTypeDescription : string = resource?.articleTypes?.find((articleType, index) => articleType.id == id)?.description ?? ""
    const [currentPage, setCurrentPage] = useState(1);

    const fetchArticles = async (page?: number) => {
        try {
            setLoading(true);
            setCurrentPage(page ?? 1)
            const queryFilters: ArticleFilters = {
                page: page,
                typeId: id,
                itemsPerPage: 15,
                content: content,
                startDate: startDate ? format(startDate, 'yyyy-MM-dd') : '',
                endDate: endDate ? format(endDate, 'yyyy-MM-dd') : '',
                partyId: party ? party.id : '',
                deputyId: deputy ? deputy.id : '',
                externalAuthorId: externalAuthor ? externalAuthor.id : '',
            };

            const pagination = await articleService.getArticles(queryFilters);
            setArticleList(pagination.data);
            setMaxPageCount(pagination.maxPageCount);
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false);
        }
    };

    const fetchTrendingArticlesByType = async () => {
        try {
            const queryFilters: ArticleTypeFilters = {
                itemsPerPage: 5,
                articleTypeIds: `${id}`
            };

            const articleTypes = await ArticleTypeService.getTrendingArticlesByType(queryFilters);
            setTrendingArticleListByType(articleTypes);
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        if (id) {
            fetchArticles();
            fetchTrendingArticlesByType();
        }
    }, [id]);

    const actionOnChangePagination = (page: number) => {
        fetchArticles(page);
    };

    const handleFilterClick = () => {
        fetchArticles();
    };

    return (
        <div className={`${styles.resets} ${styles.root} ${styles.background}`}>
            <Navbar
                showFilter={true}
                startDate={startDate}
                endDate={endDate}
                party={party}
                deputy={deputy}
                externalAuthor={externalAuthor}
                onContentChange={(value) => setContent(value)}
                onStartDateChange={(value) => setStartDate(value)}
                onEndDateChange={(value) => setEndDate(value)}
                onPartyChange={(value) => setParty(value)}
                onDeputyChange={(value) => setDeputy(value)}
                onExternalAuthorChange={(value) => setExternalAuthor(value)}
                onFilterClick={handleFilterClick}
            />
            <PropositionNavigationBar />
            <div className={styles.body}>
                {loading ? (
                    <div className={style.loadingContainer}>
                        <CustomCircularProgress color={articleTypeColor}/>
                    </div>
                ) : (
                    articleList?.length > 0 ? (
                        <>
                            {trendingArticleListByType && trendingArticleListByType[0]?.propositionArticles?.length >= 3 && trendingArticleListByType[0]?.description !== "Outras Proposições" &&
                                <>
                                    <TitleTopic titleViewStyle={style.propositionTypeTitleView} label={articleTypeDescription} color={articleTypeColor} />
                                    <div className={style.gridContainer}>
                                        <BigCard article={trendingArticleListByType[0]?.propositionArticles[0]} typePropositionLabel={articleTypeDescription} cardStyle={style.bigCard}
                                                 imageContainerStyle={style.bigCardImageContainer} titleStyle={style.bigCardTitle}/>
                                        <div className={style.gridColumn}>
                                            <BigCard article={trendingArticleListByType[0]?.propositionArticles[1]} typePropositionLabel={articleTypeDescription} cardStyle={style.mediumCard}
                                                     imageContainerStyle={style.gridMediumCardImageContainer} titleStyle={style.mediumCardTitle}/>
                                            <BigCard article={trendingArticleListByType[0]?.propositionArticles[2]} typePropositionLabel={articleTypeDescription} cardStyle={style.mediumCard}
                                                     imageContainerStyle={style.gridMediumCardImageContainer} titleStyle={style.mediumCardTitle}/>
                                        </div>
                                    </div>
                                </>
                            }
                            <div className={styles.propositionsContainer}>
                                <div className={styles.propositionsLeftColumn}>
                                    <TitleTopic titleViewStyle={style.lastArticleTitleView} label="Últimas Notícias" color={articleTypeColor}/>
                                    <TimeLine articleList={articleList} />
                                    {maxPageCount != 0 && <CustomPagination currentPage={currentPage} count={maxPageCount} actionOnChange={actionOnChangePagination} color={articleTypeColor} />}
                                </div>
                                <div className={styles.propositionsRightColumn}>
                                    {trendingArticleListByType[0]?.propositionArticles?.length > 0 &&
                                        <>
                                            <TitleTopic titleViewStyle={style.trendingTitleView} label="Em Destaque" color={articleTypeColor} />
                                        </>
                                    }
                                    <TrendingContainer trendingArticleList={trendingArticleListByType[0]?.propositionArticles} color={articleTypeColor}/>
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
