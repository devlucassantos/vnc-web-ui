import DTO from "../../../core/domain/types/http/DTO";
import {BackendClient} from "../clients/BackendClient";
import NewsletterAdapter from "../../../core/interfaces/adapters/NewsletterAdapter";
import Newsletter from "../../../core/domain/models/Newsletter";
import { newsletterList } from "../../../infra/mock/news/data";


class NewsletterAPI implements NewsletterAdapter {
    async getNewsletterByID(id: string): Promise<Newsletter> {

        try {
            const response = await BackendClient.get(`/news/newsletters/` + id);
            const data = response.data

            return Newsletter.fromJSON(data);
        } catch (error) {
            throw error;
        }
    }
}

export default NewsletterAPI;
