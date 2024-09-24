import Article from "@models/Article";
import {ArticleFilters} from "@typing/http/Filters";
import {Pagination} from "@models/Pagination";

abstract class ArticleUsecase {
    abstract getArticles(queryFilters: ArticleFilters): Promise<Pagination<Article>>;
    abstract getTrendingArticles(queryFilters: ArticleFilters): Promise<Pagination<Article>>;
    abstract getSavedArticlesToViewLater(queryFilters: ArticleFilters): Promise<Pagination<Article>>;
    abstract saveArticleRating(articleId: string, rating: number): Promise<void>;
    abstract saveArticleToViewLater(articleId: string, viewLater: boolean): Promise<void>;
}

export default ArticleUsecase;
