import {NewsService} from "../../../core/services/NewsService";
import NewsAPI from "../../../infra/api/news/NewsAPI";
import {PropositionService} from "../../../core/services/PropositionService";
import PropositionAPI from "../../../infra/api/news/PropositionAPI";
import {NewsletterService} from "@services/NewsletterService";
import NewsletterAPI from "@api/news/NewsletterAPI";


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
}

export default DIContainer;
