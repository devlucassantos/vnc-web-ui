import Newsletter from "../../domain/models/Newsletter";

abstract class NewsletterUsecase {
    abstract getNewsletterByID(id: string): Promise<Newsletter>;
}

export default NewsletterUsecase;
