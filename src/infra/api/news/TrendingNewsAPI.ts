import News from "../../../core/domain/models/News";
import {BackendClient} from "../clients/BackendClient";
import {NewsFilters} from "@typing/http/Filters";
import {Pagination} from "@models/Pagination";
import TrendingNewsAdapter from "@interfaces/adapters/TrendingNewsAdapter";


class TrendingNewsAPI implements TrendingNewsAdapter {
    async getTrendingNews(queryFilters: NewsFilters): Promise<Pagination<News>> {

       try {
           const response = await BackendClient.get(`/news/trending`, { params: queryFilters });

           return Pagination.fromJSON(response.data, News.fromJSON);
       } catch (error) {
           throw error;
       }
    }
}

export default TrendingNewsAPI;
