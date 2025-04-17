import Model from "./model";
import DTO from "../types/http/DTO";
import Party from "./Party";
import Deputy from "./Deputy";
import ExternalAuthor from "./ExternalAuthor";
import ArticleType from "@models/ArticleType";
import SpecificType from "@models/SpecificType";
import LegislativeBody from "@models/LegislativeBody";
import ArticleSituation from "@models/ArticleSituation";

class Resource extends Model {
    private _parties: Party[];
    private _deputies: Deputy[];
    private _externalAuthors: ExternalAuthor[];
    private _articleTypes: ArticleType[];
    private _propositionTypes: SpecificType[];
    private _eventTypes: SpecificType[];
    private _legislativeBodies: LegislativeBody[];
    private _eventSituations: ArticleSituation[];

    constructor() {
        super();
        this._parties = this._deputies = this._externalAuthors = this._articleTypes = this._propositionTypes = this._eventTypes = this._legislativeBodies = this._eventSituations = [];
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

    get propositionTypes() {
        return this._propositionTypes
    }

    get eventTypes() {
        return this._eventTypes
    }

    get legislativeBodies() {
        return this._legislativeBodies
    }

    get eventSituations() {
        return this._eventSituations
    }

    toJSON(): DTO {
        let dto = {} as DTO;
        dto['parties'] = this._parties.map(party => party.toJSON());
        dto['deputies'] = this._deputies.map(deputy => deputy.toJSON());
        dto['external_authors'] = this._externalAuthors.map(externalAuthor => externalAuthor.toJSON());
        dto['article_types'] = this._articleTypes.map(ArticleType => ArticleType.toJSON());
        dto['proposition_types'] = this._propositionTypes.map(PropositionType => PropositionType.toJSON());
        dto['event_types'] = this._eventTypes.map(EventType => EventType.toJSON());
        dto['legislative_bodies'] = this._legislativeBodies.map(LegislativeBody => LegislativeBody.toJSON());
        dto['event_situations'] = this._eventSituations.map(ArticleSituation => ArticleSituation.toJSON());
        return dto;
    }

    static fromJSON(json: DTO<any>): Resource {
        const resource = new Resource();
        resource._parties = json['parties'] ? json['parties'].map((partyJson: DTO) => Party.fromJSON(partyJson)) : [];
        resource._deputies = json['deputies'] ? json['deputies'].map((deputyJson: DTO) => Deputy.fromJSON(deputyJson)) : [];
        resource._externalAuthors = json['external_authors'] ? json['external_authors'].map((externalAuthorJson: DTO) => ExternalAuthor.fromJSON(externalAuthorJson)) : [];
        resource._articleTypes = json['article_types'] ? json['article_types'].map((articleTypeJSON: DTO) => ArticleType.fromJSON(articleTypeJSON)) : [];
        resource._propositionTypes = json['proposition_types'] ? json['proposition_types'].map((propositionTypeJSON: DTO) => SpecificType.fromJSON(propositionTypeJSON)) : [];
        resource._eventTypes = json['event_types'] ? json['event_types'].map((eventTypeJSON: DTO) => SpecificType.fromJSON(eventTypeJSON)) : [];
        resource._legislativeBodies = json['legislative_bodies'] ? json['legislative_bodies'].map((legislativeBodyJSON: DTO) => LegislativeBody.fromJSON(legislativeBodyJSON)) : [];
        resource._eventSituations = json['event_situations'] ? json['event_situations'].map((eventSituationJSON: DTO) => ArticleSituation.fromJSON(eventSituationJSON)) : [];
        return resource;
    }
}

export default Resource;
