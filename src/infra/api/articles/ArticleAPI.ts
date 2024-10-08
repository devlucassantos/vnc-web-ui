import Article from "@models/Article";
import ArticleAdapter from "../../../core/interfaces/adapters/ArticleAdapter";
import {BackendClient} from "../clients/BackendClient";
import {ArticleFilters} from "@typing/http/Filters";
import {Pagination} from "@models/Pagination";
class ArticleAPI implements ArticleAdapter {
    async getArticles(queryFilters: ArticleFilters): Promise<Pagination<Article>> {

       try {
           const response = await BackendClient.get(`/articles`, { params: queryFilters });

           return Pagination.fromJSON(response.data, Article.fromJSON);
       } catch (error) {
           throw error;
       }
    }

    async getTrendingArticles(queryFilters: ArticleFilters): Promise<Pagination<Article>> {

        try {
            const response = await BackendClient.get(`/articles/trending`, { params: queryFilters });

            return Pagination.fromJSON(response.data, Article.fromJSON);
        } catch (error) {
            throw error;
        }
    }

    async getSavedArticlesToViewLater(queryFilters: ArticleFilters): Promise<Pagination<Article>> {

        try {
            const response = await BackendClient.get(`/articles/view-later`, { params: queryFilters });

            return Pagination.fromJSON(response.data, Article.fromJSON);
        } catch (error) {
            throw error;
        }
    }

    async saveArticleRating(articleId: string, rating: number): Promise<void> {
        try {
            await BackendClient.put(`/articles/${articleId}/rating`, { rating: rating});
        } catch (error) {
            throw error;
        }
    }

    async saveArticleToViewLater(articleId: string, viewLater: boolean): Promise<void> {
        try {
            await BackendClient.put(`/articles/${articleId}/view-later`, { view_later: viewLater});
        } catch (error) {
            throw error;
        }
    }
}

export default ArticleAPI;
