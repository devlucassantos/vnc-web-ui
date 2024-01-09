import News from "../domain/models/News";
import NewsAdapter from "../interfaces/adapters/NewsAdapter";
import NewsUsecase from "../interfaces/usecases/NewsUsecase";

export class NewsService implements NewsUsecase {
    constructor(private newsAdapter: NewsAdapter) {}

    async getNews(): Promise<News[]> {
        return this.newsAdapter.getNews();
    }
}