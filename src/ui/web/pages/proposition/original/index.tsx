import React, {memo, useContext, useEffect, useState} from 'react';
import type {FC} from 'react';

import styles from './styles.module.scss';
import Navbar from "../../../components/base/navbar";
import DIContainer from "../../../dicontainer";
import TrendingContainer from "../../../components/base/trending";
import {useNavigate, useParams} from "react-router-dom";
import LongHorizontalRectangularAnnouncement from "@components/base/announcement/longRectangular/horizontal";
import {ArticleFilters} from "@typing/http/Filters";
import Article from "@models/Article";
import PdfViewer from "@components/proposition/pdfViewer";
import {TitleTopic} from "@components/base/titleTopic";
import Footer from "@components/base/footer";
import LongVerticalRectangularAnnouncement from "@components/base/announcement/longRectangular/vertical";
import CustomCircularProgress from "@components/base/customCircularProgress";
import {ResourceContext, ResourceContextType} from "@web/providers/resourceProvider";
import ArticleType from "@models/ArticleType";
import SpecificType from "@models/SpecificType";
import Party from "@models/Party";
import Deputy from "@models/Deputy";
import ExternalAuthor from "@models/ExternalAuthor";
import LegislativeBody from "@models/LegislativeBody";
import ArticleSituation from "@models/ArticleSituation";
import {format} from "date-fns";

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
    const [content, setContent] = useState<string>('');
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [articleType, setArticleType] = useState<ArticleType | null>(null);
    const [specificType, setSpecificType] = useState<SpecificType | null>(null);
    const [propositionParty, setPropositionParty] = useState<Party | null>(null);
    const [propositionDeputy, setPropositionDeputy] = useState<Deputy | null>(null);
    const [propositionExternalAuthor, setPropositionExternalAuthor] = useState<ExternalAuthor | null>(null);
    const [votingResult, setVotingResult] = useState<string | null>(null);
    const [votingLegislativeBody, setVotingLegislativeBody] = useState<LegislativeBody | null>(null);
    const [votingStartDate, setVotingStartDate] = useState<Date | null>(null);
    const [votingEndDate, setVotingEndDate] = useState<Date | null>(null);
    const [eventStartDate, setEventStartDate] = useState<Date | null>(null);
    const [eventEndDate, setEventEndDate] = useState<Date | null>(null);
    const [eventSituation, setEventSituation] = useState<ArticleSituation | null>(null);
    const [eventLegislativeBody, setEventLegislativeBody] = useState<LegislativeBody | null>(null);
    const [eventRapporteur, setEventRapporteur] = useState<Deputy | null>(null);
    const [removeEventsInTheFuture, setRemoveEventsInTheFuture] = useState<boolean>(true);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const fetchTrendingArticles = async (page?: number) => {
        try {
            setLoading(true);
            const propositionArticleType = resource?.articleTypes?.find((type) => type.codes == 'proposition');
            if (propositionArticleType) setArticleType(propositionArticleType);
            const queryFilters: ArticleFilters = {
                typeId: propositionArticleType?.id,
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

    const handleFilterClick = () => {
        if (!!(content || startDate || endDate || articleType)) {
            const queryParams = buildQueryParams();

            const filteredParams = Object.entries(queryParams)
              .filter(([_, value]) => value !== '' && value !== null && value !== undefined)
              .reduce((acc, [key, value]) => {
                  acc[key] = value;
                  return acc;
              }, {} as Record<string, string | boolean>);

            const searchParams = new URLSearchParams(filteredParams as Record<string, string>).toString();
            navigate(`/search?${searchParams}`);
        }
    };

    const buildQueryParams = () => {
        const queryParams: ArticleFilters = {
            content: content,
            startDate: startDate ? format(startDate, 'yyyy-MM-dd') : '',
            endDate: endDate ? format(endDate, 'yyyy-MM-dd') : '',
        };

        if (articleType) {
            queryParams.typeId = articleType ? articleType.id : '';
            if ( articleType.codes == 'proposition') {
                queryParams.specificTypeId = specificType ? specificType.id : '';
                queryParams.propositionPartyId = propositionParty ? propositionParty.id : '';
                queryParams.propositionDeputyId = propositionDeputy ? propositionDeputy.id : '';
                queryParams.propositionExternalAuthorId = propositionExternalAuthor ? propositionExternalAuthor.id : '';
            } else if ( articleType.codes == 'voting') {
                queryParams.votingStartDate = votingStartDate ? format(votingStartDate, 'yyyy-MM-dd') : '';
                queryParams.votingEndDate = votingEndDate ? format(votingEndDate, 'yyyy-MM-dd') : '';
                queryParams.votingResult = votingResult ? votingResult : '';
                queryParams.votingLegislativeBodyId = votingLegislativeBody ? votingLegislativeBody.id : '';
            } else if ( articleType.codes == 'event') {
                queryParams.specificTypeId = specificType ? specificType.id : '';
                queryParams.eventStartDate = eventStartDate ? format(eventStartDate, 'yyyy-MM-dd') : '';
                queryParams.eventEndDate = eventEndDate ? format(eventEndDate, 'yyyy-MM-dd') : '';
                queryParams.eventLegislativeBodyId = eventLegislativeBody ? eventLegislativeBody.id : '';
                queryParams.eventRapporteurId = eventRapporteur ? eventRapporteur.id : '';
                queryParams.eventSituationId = eventSituation ? eventSituation.id : '';
                queryParams.removeEventsInTheFuture = removeEventsInTheFuture;
            }
        }

        return queryParams;
    }

    return (
        <div className={`${styles.resets} ${styles.background}`}>
            <Navbar
              showFilter={true}
              startDate={startDate}
              endDate={endDate}
              articleType={articleType}
              specificType={specificType}
              propositionParty={propositionParty}
              propositionDeputy={propositionDeputy}
              propositionExternalAuthor={propositionExternalAuthor}
              votingResult={votingResult}
              votingLegislativeBody={votingLegislativeBody}
              votingStartDate={votingStartDate}
              votingEndDate={votingEndDate}
              eventStartDate={eventStartDate}
              eventEndDate={eventEndDate}
              eventSituation={eventSituation}
              eventLegislativeBody={eventLegislativeBody}
              eventRapporteur={eventRapporteur}
              removeEventsInTheFuture={removeEventsInTheFuture}
              onContentChange={(value) => setContent(value)}
              onStartDateChange={(value) => setStartDate(value)}
              onEndDateChange={(value) => setEndDate(value)}
              onArticleTypeChange={(value) => {
                  setArticleType(value)
                  setSpecificType(null)
              }}
              onSpecificTypeChange={(value) => setSpecificType(value)}
              onPropositionPartyChange={(value) => setPropositionParty(value)}
              onPropositionDeputyChange={(value) => setPropositionDeputy(value)}
              onPropositionExternalAuthorChange={(value) => setPropositionExternalAuthor(value)}
              onVotingResultChange={(value) => setVotingResult(value)}
              onVotingLegislativeBodyChange={(value) => setVotingLegislativeBody(value)}
              onVotingStartDateChange={(value) => setVotingStartDate(value)}
              onVotingEndDateChange={(value) => setVotingEndDate(value)}
              onEventStartDateChange={(value) => setEventStartDate(value)}
              onEventEndDateChange={(value) => setEventEndDate(value)}
              onEventSituationChange={(value) => setEventSituation(value)}
              onEventLegislativeBodyChange={(value) => setEventLegislativeBody(value)}
              onEventRapporteurChange={(value) => setEventRapporteur(value)}
              onRemoveEventsInTheFuture={(value) => setRemoveEventsInTheFuture(value)}
              useAllSpecificTypes={true}
              onFilterClick={handleFilterClick}
            />
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
