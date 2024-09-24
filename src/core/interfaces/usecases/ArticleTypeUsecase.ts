import {ArticleTypeFilters} from "@typing/http/Filters";
import ArticleType from "@models/ArticleType";

abstract class ArticleTypeUsecase {
    abstract getTrendingArticlesByType(queryFilters: ArticleTypeFilters): Promise<ArticleType[]>;
}

export default ArticleTypeUsecase;
