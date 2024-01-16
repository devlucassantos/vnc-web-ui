import News from "../../domain/models/News";
import {NewsFilters} from "@typing/http/Filters";
import {Pagination} from "@models/Pagination";

abstract class TrendingNewsAdapter {
    abstract getTrendingNews(queryFilters: NewsFilters): Promise<Pagination<News>>;
}

export default TrendingNewsAdapter;
