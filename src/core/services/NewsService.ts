import News from "../domain/models/News";
import NewsAdapter from "../interfaces/adapters/NewsAdapter";
import NewsUsecase from "../interfaces/usecases/NewsUsecase";
import {NewsFilters} from "@typing/http/Filters";
import {Pagination} from "@models/Pagination";

export class NewsService implements NewsUsecase {
    constructor(private newsAdapter: NewsAdapter) {}

    async getNews(queryFilters: NewsFilters): Promise<Pagination<News>> {
        return this.newsAdapter.getNews(queryFilters);
    }
}
