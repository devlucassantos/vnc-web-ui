import Model from "./model";
import DTO from "@typing/http/DTO";
import Article from "@models/Article";

class SpecificType extends Model {
    private _id: string;
    private _description: string;
    private _color: string;
    private _articles: Article[];

    constructor() {
        super();
        this._id = this._description = this._color = '';
        this._articles = [];
    }

    get id() {
        return this._id;
    }

    get description() {
        return this._description;
    }

    get color() {
        return this._color;
    }

    get articles(): Article[] {
        return this._articles ?? [];
    }

    toJSON(): DTO {
        let dto = {} as DTO;
        dto['id'] = this._id;
        dto['description'] = this._description;
        dto['color'] = this._color;
        dto['articles'] = this.articles?.map(propositionArticle => propositionArticle.toJSON());
        return dto;
    }

    static fromJSON(json: DTO<any>): SpecificType {
        const obj = new SpecificType();
        obj._id = String(json['id']);
        obj._description = String(json['description']);
        obj._color = String(json['color']);
        obj._articles = json['articles']?.map((propositionArticleJSON: DTO) => Article.fromJSON(propositionArticleJSON));
        return obj;
    }
}

export default SpecificType;
