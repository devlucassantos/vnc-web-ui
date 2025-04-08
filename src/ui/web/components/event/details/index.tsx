import React, {FC, memo, useState} from "react";
import styles from "./styles.module.scss";
import {Link} from "react-router-dom";
import styled from "styled-components";
import DIContainer from "@web/dicontainer";
import StarRating from "@components/base/startRating";
import StarIcon from "@mui/icons-material/Star";
import ViewLaterButton from "@components/base/viewLater";
import {Tooltip} from "@mui/material";
import Voting from "@models/Voting";
import {Check, Close} from "@mui/icons-material";
import AccordionItem from "@components/base/accordionItem";
import TimeLine from "@components/base/timeLine";
import Event from "@models/Event";
import VideoCard from "@components/base/videoCard";
import EventAgendaItem from "@models/EventAgendaItem";
import SmallCard from "@components/news/cards/smallCard";
import SmallVotingCard from "@components/voting/smallCard";
import DeputyCard from "@components/proposition/details/deputy/card";
import DeputyModal from "@components/proposition/details/deputy/modal";
import Deputy from "@models/Deputy";
import {formatEventDate} from "@utils/dateUtils";

interface Props {
  className?: string;
  event: Event
}

const RatingContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: start;
    flex-grow: 1;
`;

const RatingText = styled.span`
    font-size: 1.2rem;
    margin-left: 4px;
    margin-top: 2px;
`;

const CustomStarIcon = styled(StarIcon)`
    color: #0047AB;
    font-size: 28px;
`;

const RowContainer = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    margin-top: 0.2rem;
`;

const articleService = DIContainer.getArticleUseCase();

export const EventDetailsCard: FC<Props> = memo(function EventDetailsCard({
  event,
  ...props
}) {
  const handleRatingSubmit = async (rating: number) => {
    await articleService.saveArticleRating(event.id, rating);
  };

  const handleViewLaterSubmit = async (viewLater: boolean) => {
    await articleService.saveArticleToViewLater(event.id, viewLater);
  };

  const [selectedDeputy, setSelectedDeputy] = useState<Deputy | null>(null);
  const openModal = (deputy: Deputy | null) => setSelectedDeputy(deputy);
  const closeModal = () => setSelectedDeputy(null);


  const eventMainContainer = (event : Event) => {
    return (
      <div className={styles.mainEventContainer}>
        <div className={styles.leftCardColumn}>
          <VideoCard url={event.videoUrl} color={event.type.color} isSmallCard={false}/>
        </div>

        <div className={styles.cardColumn}>
          <div className={styles.titleContainer}>
            <div className={styles.title}>{event.title}</div>
          </div>
          <div className={styles.titleContainerRow}>
            <div className={styles.subTitle} style={{color: event.type.specificType.color}}>{event.type.specificType.description}</div>
          </div>
          <div className={styles.dateRow}>
            <div className={styles.eventDate}>{formatEventDate(event.startsAt, event.endsAt)}</div>
          </div>
          <div className={styles.titleContainerRow}>
            <div className={styles.content}>{event.descriptionContent}</div>
          </div>
          <div className={styles.titleContainerRow}>
            <div className={styles.subTitle}
                 style={{color: event.situation.color}}>{event.situation.description}</div>
          </div>
          <div className={styles.ratingContainer}>
            <RowContainer>
              <ViewLaterButton onViewLaterSubmit={handleViewLaterSubmit} initialSelected={event.viewLater}/>
            </RowContainer>
          </div>
        </div>
      </div>
    );
  }

  const agendaItem = (agendaItem : EventAgendaItem) => {
    return (
      <div className={styles.agendaItem}>
        <div className={styles.titleContainer}>
          <div className={styles.title}>{agendaItem.title}</div>
          <div className={styles.content}>{agendaItem.topic}</div>
          <div className={styles.content}>{agendaItem.regime}</div>
        </div>
        {agendaItem.rapporteur && (
          <div className={styles.rapporteurContainer}>
            <div className={styles.rapporteurTitle}>{'Relator: '}</div>
            <DeputyCard deputy={agendaItem.rapporteur} noMarginTop={true} removeTrace={true}/>
          </div>
        )}
        { agendaItem.situation && (
          <div className={styles.titleContainer}>
            <div className={styles.content}>{agendaItem.situation}</div>
          </div>
        )}
        {agendaItem.proposition && (
          <div className={styles.propositionColumn}>
            <div className={styles.title}>Proposição</div>
            <SmallCard article={agendaItem.proposition} />
          </div>
        )}
        { agendaItem.relatedProposition && (
          <div className={styles.propositionColumn}>
            <div className={styles.title}>Proposição Relacionada</div>
            <SmallCard article={agendaItem.relatedProposition} />
          </div>
        )}
        { agendaItem.voting && (
          <div className={styles.propositionColumn}>
            <div className={styles.title}>Votação</div>
            <SmallVotingCard article={agendaItem.voting} />
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={styles.card}>
      {eventMainContainer(event)}

      {event.agendaItems && event.agendaItems.length > 0 && (
        <div className={styles.agendaContainer} style={{marginBottom: event.newsletter ? '0' : '16px'}}>
          <div className={styles.agendaTitle}>Pautas</div>
          {event.agendaItems.map((item, index) => (
            <div key={item.id} className={styles.agendaColumn}>
              {agendaItem(item)}
            </div>
          ))}
        </div>
      )}
      {
        event.newsletter && (
          <div className={styles.newsletterColumn}>
            <div className={styles.followArticleLabel}>Acompanhe as outras notícias do dia:</div>
            <Link className={styles.newsletterTitleLabel} to={"/newsletter-details/" + event.newsletter.id}
                  aria-label="Ir para a página de detalhes do boletim">
              - {event.newsletter.title}
            </Link>
          </div>
        )}
    </div>
  );
});

export default EventDetailsCard;
