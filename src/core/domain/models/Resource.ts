import Model from "./model";
import DTO from "../types/http/DTO";
import Party from "./Party";
import Deputy from "./Deputy";
import ExternalAuthor from "./ExternalAuthor";
import ArticleType from "@models/ArticleType";

class Resource extends Model {
    private _parties: Party[];
    private _deputies: Deputy[];
    private _externalAuthors: ExternalAuthor[];
    private _articleTypes: ArticleType[];

    constructor() {
        super();
        this._parties = [];
        this._deputies = [];
        this._externalAuthors = [];
        this._articleTypes = [];
    }

    get parties() {
        return this._parties;
    }

    get deputies() {
        return this._deputies;
    }

    get externalAuthors() {
        return this._externalAuthors;
    }

    get articleTypes() {
        return this._articleTypes
    }

    toJSON(): DTO {
        let dto = {} as DTO;
        dto['parties'] = this._parties.map(party => party.toJSON());
        dto['deputies'] = this._deputies.map(deputy => deputy.toJSON());
        dto['external_authors'] = this._externalAuthors.map(externalAuthor => externalAuthor.toJSON());
        dto['article_types'] = this._articleTypes.map(ArticleType => ArticleType.toJSON());
        return dto;
    }

    static fromJSON(json: DTO<any>): Resource {
        const resource = new Resource();
        resource._parties = json['parties'] ? json['parties'].map((partyJson: DTO) => Party.fromJSON(partyJson)) : [];
        resource._deputies = json['deputies'] ? json['deputies'].map((deputyJson: DTO) => Deputy.fromJSON(deputyJson)) : [];
        resource._externalAuthors = json['external_authors'] ? json['external_authors'].map((externalAuthorJson: DTO) => ExternalAuthor.fromJSON(externalAuthorJson)) : [];
        resource._articleTypes = json['article_types'] ? json['article_types'].map((articleTypeJSON: DTO) => ArticleType.fromJSON(articleTypeJSON)) : [];
        return resource;
    }
}

export default Resource;
