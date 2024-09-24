import {ArticleTypeFilters} from "@typing/http/Filters";
import ArticleType from "@models/ArticleType";

abstract class ArticleTypeAdapter {
    abstract getTrendingArticlesByType(queryFilters: ArticleTypeFilters): Promise<ArticleType[]>;
}

export default ArticleTypeAdapter;
