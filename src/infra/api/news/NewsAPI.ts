import News from "../../../core/domain/models/News";
import NewsAdapter from "../../../core/interfaces/adapters/NewsAdapter";
import {BackendClient} from "../clients/BackendClient";
import {NewsFilters} from "@typing/http/Filters";
import {Pagination} from "@models/Pagination";


class NewsAPI implements NewsAdapter {
    async getNews(queryFilters: NewsFilters): Promise<Pagination<News>> {

       try {
           const response = await BackendClient.get(`/news`, { params: queryFilters });

           return Pagination.fromJSON(response.data, News.fromJSON);
       } catch (error) {
           throw error;
       }
    }
}

export default NewsAPI;
