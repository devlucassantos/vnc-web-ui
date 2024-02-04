import React, {memo, useEffect, useState} from 'react';
import type {FC} from 'react';

import style from './styles.module.scss';
import Navbar from "../../components/base/navbar";
import TimeLine from "../../components/base/timeLine";
import {Filters} from "../../components/base/filters";
import DIContainer from "../../dicontainer";
import News from "../../../../core/domain/models/News";
import {NewsFilters} from "@typing/http/Filters";
import ShortRectangularAnnouncement from "@components/base/announcement/shortRectangular";
import CustomPagination from "@components/base/customPagination";
import {PageTitle} from "@components/base/pageTitle";
import NoResultMessage from "@components/base/noResultMessage";
import Party from "@models/Party";
import Deputy from "@models/Deputy";
import Organization from "@models/Organization";
import {format} from "date-fns";

interface Props {
    className?: string;
}

const trendingNewsService = DIContainer.getTrendingNewsUseCase();

export const TrendingPage: FC<Props> = memo(function TrendingPage(props = {}) {
    const [trendingNewsList, setTrendingNews] = useState<News[]>([]);
    const [maxPageCount, setMaxPageCount] = useState<number>(0);
    const [content, setContent] = useState<string>('');
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [party, setParty] = useState<Party | null>(null);
    const [deputy, setDeputy] = useState<Deputy | null>(null);
    const [organization, setOrganization] = useState<Organization | null>(null);

    const fetchTrendingNews = async (page?: number) => {
        try {
            const queryFilters: NewsFilters = {
                page: page,
                itemsPerPage: 15,
                content: content,
                startDate: startDate ? format(startDate, 'yyyy-MM-dd') : '',
                endDate: endDate ? format(endDate, 'yyyy-MM-dd') : '',
                partyId: party ? party.id : '',
                deputyId: deputy ? deputy.id : '',
                organizationId: organization ? organization.id : '',
            };

            const pagination = await trendingNewsService.getTrendingNews(queryFilters);
            setTrendingNews(pagination.data);
            setMaxPageCount(pagination.maxPageCount);
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        fetchTrendingNews();
    }, []);

    const actionOnChangePagination = (page: number) => {
        fetchTrendingNews(page);
    };

    const handleFilterClick = () => {
        fetchTrendingNews();
    };

    return (
        <div className={`${style.resets} ${style.root} ${style.background}`}>
            <Navbar/>
            <div className={style.body}>
                <PageTitle iconStyle={style.trendingsIcon} titleViewStyle={style.titleView} label="Trendings"/>
                <Filters
                    filtersRowStyle={style.filtersRow}
                    startDate={startDate}
                    endDate={endDate}
                    party={party}
                    deputy={deputy}
                    organization={organization}
                    onContentChange={(value) => setContent(value)}
                    onStartDateChange={(value) => setStartDate(value)}
                    onEndDateChange={(value) => setEndDate(value)}
                    onPartyChange={(value) => setParty(value)}
                    onDeputyChange={(value) => setDeputy(value)}
                    onOrganizationChange={(value) => setOrganization(value)}
                    onFilterClick={handleFilterClick}
                />
                {trendingNewsList?.length > 0 ? (
                    <div className={style.trendingNewsContainer}>
                        <div className={style.trendingNewsLeftColumn}>
                            <TimeLine newsList={trendingNewsList} />
                            {maxPageCount != 0 && <CustomPagination count={maxPageCount} actionOnChange={actionOnChangePagination} />}
                        </div>
                        <div className={style.trendingNewsRightColumn}>
                            <ShortRectangularAnnouncement/>
                            <ShortRectangularAnnouncement/>
                        </div>
                    </div>
                ) : (
                    <NoResultMessage />
                )}
            </div>
        </div>
    );
});
