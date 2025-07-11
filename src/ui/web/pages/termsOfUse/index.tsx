import React, {useState} from 'react';
import styles from "./styles.module.scss";
import {TitleTopic} from "@components/base/titleTopic";
import style from "@pages/home/styles.module.scss";
import Navbar from "@components/base/navbar";
import {ArticleFilters} from "@typing/http/Filters";
import {format} from "date-fns";
import ArticleType from "@models/ArticleType";
import SpecificType from "@models/SpecificType";
import Party from "@models/Party";
import Deputy from "@models/Deputy";
import ExternalAuthor from "@models/ExternalAuthor";
import LegislativeBody from "@models/LegislativeBody";
import ArticleSituation from "@models/ArticleSituation";
import {useNavigate} from "react-router-dom";
import Footer from "@components/base/footer";

const TermsOfUsePage = () => {
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
    <div className={`${style.root} ${style.background}`}>
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
        <TitleTopic titleViewStyle={styles.titleView} label={"Termos de Uso"}/>
        <p>Última atualização: 14/04/2025</p>

        <h2>1. Objetivo da Plataforma</h2>
        <p>A plataforma utiliza inteligência artificial para resumir automaticamente os textos legislativos e traduzi-los
          para uma linguagem clara, objetiva e acessível, promovendo maior transparência e participação cidadã.</p>

        <h2>2. Conta de Usuário</h2>
        <p>
          O usuário deve criar uma conta para possibilitar a utilização de funcionalidades associadas ao usuário, como avaliar as matérias e salvar as matérias para visualizar depois. Outrossim, o usuário é responsável pelas informações fornecidas
          e pela segurança da sua senha.
        </p>

        <h2>3. Uso Permitido</h2>
        <ul>
          <li>Não usar a plataforma de forma fraudulenta ou ilegal;</li>
          <li>Não fazer engenharia reversa ou extração massiva de dados;</li>
          <li>Não distorcer os conteúdos gerados pela IA.</li>
        </ul>

        <h2>4. Direitos Autorais e Conteúdo</h2>
        <p>
          Os resumos e imagens podem ser utilizados para fins informativos com citação da fonte. Além disso, a plataforma pode
          utilizar serviços de terceiros com suas próprias licenças.
        </p>

        <h2>5. Isenção de Responsabilidade</h2>
        <p>
          O conteúdo gerado não substitui os documentos oficiais. Dessa forma, a plataforma não se responsabiliza por decisões
          baseadas apenas nos resumos.
        </p>

        <h2>6. Alterações nos Termos</h2>
        <p>Os termos podem ser modificados a qualquer momento. Sendo assim, o uso continuado implica aceitação das alterações.</p>
      </div>
      <Footer/>
    </div>
  );
};

export default TermsOfUsePage;
