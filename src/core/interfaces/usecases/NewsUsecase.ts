import News from "../../domain/models/News";

abstract class NewsUsecase {
    abstract getNews(): Promise<News[]>;
}

export default NewsUsecase;
