export interface ArticleFilters {
    typeId?: string;
    specificTypeId?: string;
    page?: number;
    itemsPerPage?: number;
    content?: string;
    startDate?: string;
    endDate?: string;
    votingStartDate?: string;
    votingEndDate?: string;
    votingResult?: string;
    votingLegislativeBodyId?: string;
    eventStartDate?: string;
    eventEndDate?: string;
    eventSituationId?: string;
    eventLegislativeBodyId?: string;
    eventRapporteurId?: string;
    propositionPartyId?: string;
    propositionDeputyId?: string;
    propositionExternalAuthorId?: string;
    removeEventsInTheFuture?: boolean;
}

export interface ArticleTypeFilters {
    articleTypeIds?: string;
    articleSpecificTypeIds?: string;
    itemsPerPage?: number;
}
