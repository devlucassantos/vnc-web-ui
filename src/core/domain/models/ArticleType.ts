import Model from "./model";
import {convertToISODate, formatCustomDateTime} from "../../utils/dateUtils";
import DTO from "@typing/http/DTO";
import Article from "@models/Article";
import SpecificType from "@models/SpecificType";

class ArticleType extends Model {
    private _id: string;
    private _codes: string;
    private _description: string;
    private _color: string;
    private _specificType: SpecificType;
    private _specificTypes: SpecificType[];

    constructor() {
        super();
        this._id = this._codes = this._description = this._color = '';
        this._specificType = new SpecificType();
        this._specificTypes = [];
    }

    get id() {
        return this._id;
    }

    get codes() {
        return this._codes;
    }

    get description() {
        return this._description;
    }

    get color() {
        return this._color;
    }

    get specificType(): SpecificType {
        return this._specificType;
    }

    get specificTypes(): SpecificType[] {
        return this._specificTypes ?? [];
    }

    toJSON(): DTO {
        let dto = {} as DTO;
        dto['id'] = this._id;
        dto['codes'] = this._codes;
        dto['description'] = this._description;
        dto['color'] = this._color;
        dto['specific_type'] = this._specificType?.toJSON();
        dto['specific_types'] = this.specificTypes?.map(specificType => specificType.toJSON());
        return dto;
    }

    static fromJSON(json: DTO<any>): ArticleType {
        const obj = new ArticleType();
        obj._id = String(json['id']);
        obj._codes = String(json['codes']);
        obj._description = String(json['description']);
        obj._color = String(json['color']);
        obj._specificType = json['specific_type'] ? SpecificType.fromJSON(json['specific_type']) : new SpecificType();
        obj._specificTypes = json['specific_types']?.map((specificTypeJSON: DTO) => SpecificType.fromJSON(specificTypeJSON));
        return obj;
    }
}

export default ArticleType;
