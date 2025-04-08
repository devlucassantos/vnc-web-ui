export interface ArticleFilters {
    typeId?: string;
    specificTypeId?: string;
    page?: number;
    itemsPerPage?: number;
    content?: string;
    startDate?: string;
    endDate?: string;
    partyId?: string;
    deputyId?: string;
    externalAuthorId?: string;
    removeEventsInTheFuture?: boolean;
}

export interface ArticleTypeFilters {
    articleTypeIds?: string;
    articleSpecificTypeIds?: string;
    itemsPerPage?: number;
}
