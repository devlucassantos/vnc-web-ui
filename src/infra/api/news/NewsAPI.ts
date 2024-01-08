import News from "../../../core/domain/models/News";
import DTO from "../../../core/domain/types/http/DTO";
import newsMockData from "../../mock/news/data";
import NewsAdapter from "../../../core/interfaces/adapters/NewsAdapter";
import {BackendClient} from "../clients/BackendClient";


class NewsAPI implements NewsAdapter {
    async getNews(): Promise<News[]> {

       try {
           const response = await BackendClient.get(`/news`);
           const data = response.data.data

           const newsResponse = await Promise.all((data as DTO[]).map(async (news: DTO<any>) => {
               return News.fromJSON(news);
           }));

           return newsResponse;
       } catch (error) {
           throw error;
       }
    }
}

export default NewsAPI;