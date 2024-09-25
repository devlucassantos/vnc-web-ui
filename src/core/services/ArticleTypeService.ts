import {ArticleTypeFilters} from "@typing/http/Filters";
import ArticleType from "@models/ArticleType";
import ArticleTypeUsecase from "@interfaces/usecases/ArticleTypeUsecase";
import ArticleTypeAdapter from "@interfaces/adapters/ArticleTypeAdapter";

export class ArticleTypeService implements ArticleTypeUsecase {
    constructor(private articleTypeAdapter: ArticleTypeAdapter) {}

    async getTrendingArticlesByType(queryFilters: ArticleTypeFilters): Promise<ArticleType[]> {
        return this.articleTypeAdapter.getTrendingArticlesByType(queryFilters);
    }
}
