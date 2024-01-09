import News from "../../domain/models/News";

abstract class NewsAdapter {
    abstract getNews(): Promise<News[]>;
}

export default NewsAdapter;
