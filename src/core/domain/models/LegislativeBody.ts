import Model from "./model";
import {convertToISODate, formatCustomDateTime} from "../../utils/dateUtils";
import DTO from "@typing/http/DTO";
import Article from "@models/Article";
import SpecificType from "@models/SpecificType";
import LegislativeBodyType from "@models/LegislativeBodyType";

class ArticleType extends Model {
    private _id: string;
    private _code: string;
    private _name: string;
    private _acronym: string;
    private _type: LegislativeBodyType;

    constructor() {
        super();
        this._id = this._code = this._name = this._acronym = '';
        this._type = new LegislativeBodyType();
    }

    get id() {
        return this._id;
    }

    get code() {
        return this._code;
    }

    get name() {
        return this._name;
    }

    get acronym() {
        return this._acronym;
    }

    get type(): LegislativeBodyType {
        return this._type;
    }

    toJSON(): DTO {
        let dto = {} as DTO;
        dto['id'] = this._id;
        dto['code'] = this._code;
        dto['name'] = this._name;
        dto['acronym'] = this._acronym;
        dto['type'] = this.type?.toJSON();
        return dto;
    }

    static fromJSON(json: DTO<any>): ArticleType {
        const obj = new ArticleType();
        obj._id = String(json['id']);
        obj._code = String(json['code']);
        obj._name = String(json['name']);
        obj._acronym = String(json['acronym']);
        obj._type = json['type'] ? LegislativeBodyType.fromJSON(json['type']) : new LegislativeBodyType();
        return obj;
    }
}

export default ArticleType;
