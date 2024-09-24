export interface ArticleFilters {
    typeId?: string;
    page?: number;
    itemsPerPage?: number;
    content?: string;
    startDate?: string;
    endDate?: string;
    partyId?: string;
    deputyId?: string;
    externalAuthorId?: string;
}

export interface ArticleTypeFilters {
    ids?: string;
    itemsPerPage?: number;
}
