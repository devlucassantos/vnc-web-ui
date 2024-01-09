import {NewsService} from "../../../core/services/NewsService";
import NewsAPI from "../../../infra/api/news/NewsAPI";


class DIContainer {
    static getNewsUseCase() {
        return new NewsService(new NewsAPI())
    }
}

export default DIContainer;