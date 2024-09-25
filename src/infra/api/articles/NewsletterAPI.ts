import {BackendClient} from "../clients/BackendClient";
import NewsletterAdapter from "../../../core/interfaces/adapters/NewsletterAdapter";
import Newsletter from "../../../core/domain/models/Newsletter";


class NewsletterAPI implements NewsletterAdapter {
    async getNewsletterByID(id: string): Promise<Newsletter> {

        try {
            const response = await BackendClient.get(`/articles/` + id + `/newsletter`);
            const data = response.data

            return Newsletter.fromJSON(data);
        } catch (error) {
            throw error;
        }
    }
}

export default NewsletterAPI;
