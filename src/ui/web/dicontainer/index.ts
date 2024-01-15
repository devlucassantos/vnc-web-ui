import {NewsService} from "../../../core/services/NewsService";
import NewsAPI from "../../../infra/api/news/NewsAPI";
import {PropositionService} from "../../../core/services/PropositionService";
import PropositionAPI from "../../../infra/api/news/PropositionAPI";
import {NewsletterService} from "@services/NewsletterService";
import NewsletterAPI from "@api/news/NewsletterAPI";
import {TrendingNewsService} from "@services/TrendingNewsService";
import TrendingNewsAPI from "@api/news/TrendingNewsAPI";


class DIContainer {
    static getNewsUseCase() {
        return new NewsService(new NewsAPI())
    }

    static getPropositionUseCase() {
        return new PropositionService(new PropositionAPI())
    }

    static getNewsletterUseCase() {
        return new NewsletterService(new NewsletterAPI())
    }

    static getTrendingNewsUseCase() {
        return new TrendingNewsService(new TrendingNewsAPI())
    }
}

export default DIContainer;
