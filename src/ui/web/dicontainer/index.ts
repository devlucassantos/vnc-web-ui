import {ArticleService} from "@services/ArticleService";
import ArticleAPI from "@api/articles/ArticleAPI";
import {PropositionService} from "../../../core/services/PropositionService";
import PropositionAPI from "@api/articles/PropositionAPI";
import {NewsletterService} from "@services/NewsletterService";
import NewsletterAPI from "@api/articles/NewsletterAPI";
import {ResourceService} from "@services/ResourceService";
import ResourceAPI from "@api/resources/ResourceAPI";
import {ArticleTypeService} from "@services/ArticleTypeService";
import ArticleTypeAPI from "@api/articles/ArticleTypeAPI";
import {AuthenticationService} from "@services/AuthenticationService";
import AuthenticationAPI from "@api/auth/AuthenticationAPI";
import {UserService} from "@services/UserService";
import UserAPI from "@api/user/UserAPI";

class DIContainer {
    static getArticleUseCase() {
        return new ArticleService(new ArticleAPI())
    }

    static getPropositionUseCase() {
        return new PropositionService(new PropositionAPI())
    }

    static getNewsletterUseCase() {
        return new NewsletterService(new NewsletterAPI())
    }

    static getResourceUseCase() {
        return new ResourceService(new ResourceAPI())
    }

    static getArticleTypeUseCase() {
        return new ArticleTypeService(new ArticleTypeAPI())
    }

    static getAuthenticationUseCase() {
        return new AuthenticationService(new AuthenticationAPI())
    }

    static getUserUseCase() {
        return new UserService(new UserAPI())
    }
}

export default DIContainer;
