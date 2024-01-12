import Newsletter from "../../domain/models/Newsletter";

abstract class NewsletterAdapter {
    abstract getNewsletterByID(id: string): Promise<Newsletter>;
}

export default NewsletterAdapter;
