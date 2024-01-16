import News from "../domain/models/News";
import {NewsFilters} from "@typing/http/Filters";
import {Pagination} from "@models/Pagination";
import TrendingNewsUsecase from "@interfaces/usecases/TrendingNewsUsecase";
import TrendingNewsAdapter from "@interfaces/adapters/TrendingNewsAdapter";

export class TrendingNewsService implements TrendingNewsUsecase {
    constructor(private trendingNewsAdapter: TrendingNewsAdapter) {}

    async getTrendingNews(queryFilters: NewsFilters): Promise<Pagination<News>> {
        return this.trendingNewsAdapter.getTrendingNews(queryFilters);
    }
}
