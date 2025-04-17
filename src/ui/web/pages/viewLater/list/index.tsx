import React, {memo, useEffect, useState} from 'react';
import type {FC} from 'react';

import styles from './styles.module.scss';
import Navbar from "../../../components/base/navbar";
import TimeLine from "../../../components/base/timeLine";
import DIContainer from "../../../dicontainer";
import Article from "@models/Article";
import {ArticleFilters} from "@typing/http/Filters";
import CustomPagination from "@components/base/customPagination";
import TrendingContainer from "@components/base/trending";
import NoResultMessage from '@components/base/noResultMessage';
import Party from "@models/Party";
import Deputy from "@models/Deputy";
import ExternalAuthor from "@models/ExternalAuthor";
import {format} from "date-fns";
import {TitleTopic} from "@components/base/titleTopic";
import LongVerticalRectangularAnnouncement from "@components/base/announcement/longRectangular/vertical";
import Footer from "@components/base/footer";
import CustomCircularProgress from "@components/base/customCircularProgress";
import ArticleType from "@models/ArticleType";
import SpecificType from "@models/SpecificType";

interface Props {
    className?: string;
}

const articleService = DIContainer.getArticleUseCase();

export const ViewLaterListPage: FC<Props> = memo(function ViewLaterListPage(props = {}) {
    const [articleList, setArticle] = useState<Article[]>([]);
    const [trendingArticleList, setTrendingArticle] = useState<Article[]>([]);
    const [maxPageCount, setMaxPageCount] = useState<number>(0);
    const [content, setContent] = useState<string>('');
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [articleType, setArticleType] = useState<ArticleType | null>(null);
    const [specificType, setSpecificType] = useState<SpecificType | null>(null);
    const [party, setParty] = useState<Party | null>(null);
    const [deputy, setDeputy] = useState<Deputy | null>(null);
    const [externalAuthor, setExternalAuthor] = useState<ExternalAuthor | null>(null);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);

    const fetchSavedArticlesToViewLater = async (page?: number) => {
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
                specificTypeId: specificType ? specificType.id : '',
                propositionPartyId: party ? party.id : '',
                propositionDeputyId: deputy ? deputy.id : '',
                propositionExternalAuthorId: externalAuthor ? externalAuthor.id : '',
            };

            const pagination = await articleService.getSavedArticlesToViewLater(queryFilters);
            setArticle(pagination.data);
            setMaxPageCount(pagination.maxPageCount);
        } catch (error) {
            console.log(error)
            setArticle([]);
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

    useEffect(() => {
        fetchSavedArticlesToViewLater();
        fetchTrendingArticles();
    }, []);

    const actionOnChangePagination = (page: number) => {
        fetchSavedArticlesToViewLater(page);
    };

    const handleFilterClick = () => {
        fetchSavedArticlesToViewLater();
    };

    return (
        <div className={`${styles.resets} ${styles.root} ${styles.background}`}>
            <Navbar
                showFilter={true}
                startDate={startDate}
                endDate={endDate}
                articleType={articleType}
                specificType={specificType}
                // party={party}
                // deputy={deputy}
                // externalAuthor={externalAuthor}
                onContentChange={(value) => setContent(value)}
                onStartDateChange={(value) => setStartDate(value)}
                onEndDateChange={(value) => setEndDate(value)}
                onArticleTypeChange={(value) => {
                    setArticleType(value)
                    setSpecificType(null)
                }}
                onSpecificTypeChange={(value) => setSpecificType(value)}
                // onPartyChange={(value) => setParty(value)}
                // onDeputyChange={(value) => setDeputy(value)}
                // onExternalAuthorChange={(value) => setExternalAuthor(value)}
                useAllSpecificTypes={true}
                onFilterClick={handleFilterClick}
            />
            <div className={styles.body}>
                {loading ? (
                    <CustomCircularProgress />
                ) : (
                    articleList?.length > 0 ? (
                        <div className={styles.propositionsContainer}>
                            <div className={styles.propositionsLeftColumn}>
                                <TitleTopic titleViewStyle={styles.propositionsTitleView} label="Matérias salvas" />
                                <TimeLine articleList={articleList} />
                                {maxPageCount != 0 && <CustomPagination currentPage={currentPage} count={maxPageCount} actionOnChange={actionOnChangePagination} />}
                            </div>
                            <div className={styles.propositionsRightColumn}>
                                <TitleTopic titleViewStyle={styles.trendingTitleView} label="Em Destaque" />
                                <TrendingContainer trendingArticleList={trendingArticleList} />
                                <LongVerticalRectangularAnnouncement/>
                            </div>
                        </div>
                    ) : (
                        <NoResultMessage />
                    )
                )}
            </div>
            <Footer />
        </div>
    );
});
