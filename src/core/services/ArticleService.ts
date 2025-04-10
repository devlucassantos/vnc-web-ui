import Article from "@models/Article";
import ArticleAdapter from "../interfaces/adapters/ArticleAdapter";
import ArticleUsecase from "../interfaces/usecases/ArticleUsecase";
import {ArticleFilters} from "@typing/http/Filters";
import {Pagination} from "@models/Pagination";

export class ArticleService implements ArticleUsecase {
    constructor(private articleAdapter: ArticleAdapter) {}

    async getArticles(queryFilters: ArticleFilters): Promise<Pagination<Article>> {
        return this.articleAdapter.getArticles(queryFilters);
    }

    async getTrendingArticles(queryFilters: ArticleFilters): Promise<Pagination<Article>> {
        return this.articleAdapter.getTrendingArticles(queryFilters);
    }

    async getSavedArticlesToViewLater(queryFilters: ArticleFilters): Promise<Pagination<Article>> {
        return this.articleAdapter.getSavedArticlesToViewLater(queryFilters);
    }

    async saveArticleRating(articleId: string, rating: number | null): Promise<void> {
        return this.articleAdapter.saveArticleRating(articleId, rating);
    }

    async saveArticleToViewLater(articleId: string, viewLater: boolean): Promise<void> {
        return this.articleAdapter.saveArticleToViewLater(articleId, viewLater);
    }
}
