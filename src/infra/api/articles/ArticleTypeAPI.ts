import {BackendClient} from "../clients/BackendClient";
import {ArticleTypeFilters} from "@typing/http/Filters";
import ArticleTypeAdapter from "@interfaces/adapters/ArticleTypeAdapter";
import ArticleType from "@models/ArticleType";
import DTO from "@typing/http/DTO";


class ArticleTypeAPI implements ArticleTypeAdapter {
    async getTrendingArticlesByType(queryFilters: ArticleTypeFilters): Promise<ArticleType[]> {

       try {
           const response = await BackendClient.get(`/articles/trending/type`, { params: queryFilters });

           return (response.data as DTO[])?.map((articleTypeJSON) => ArticleType.fromJSON(articleTypeJSON));
       } catch (error) {
           throw error;
       }
    }
}

export default ArticleTypeAPI;
