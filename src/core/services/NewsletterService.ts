import NewsletterUsecase from "../interfaces/usecases/NewsletterUsecase";
import Newsletter from "../domain/models/Newsletter";
import NewsletterAdapter from "../interfaces/adapters/NewsletterAdapter";

export class NewsletterService implements NewsletterUsecase {
    constructor(private newsletterAdapter: NewsletterAdapter) {}

    async getNewsletterByID(id: string): Promise<Newsletter> {
        return this.newsletterAdapter.getNewsletterByID(id);
    }
}
