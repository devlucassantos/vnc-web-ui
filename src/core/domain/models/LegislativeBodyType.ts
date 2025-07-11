import Model from "./model";
import {convertToISODate, formatCustomDateTime} from "../../utils/dateUtils";
import DTO from "@typing/http/DTO";
import Article from "@models/Article";
import SpecificType from "@models/SpecificType";

class LegislativeBodyType extends Model {
    private _id: string;
    private _code: string;
    private _description: string;

    constructor() {
        super();
        this._id = this._code = this._description = '';
    }

    get id() {
        return this._id;
    }

    get code() {
        return this._code;
    }

    get description() {
        return this._description;
    }

    toJSON(): DTO {
        let dto = {} as DTO;
        dto['id'] = this._id;
        dto['code'] = this._code;
        dto['description'] = this._description;
        return dto;
    }

    static fromJSON(json: DTO<any>): LegislativeBodyType {
        const obj = new LegislativeBodyType();
        obj._id = String(json['id']);
        obj._code = String(json['code']);
        obj._description = String(json['description']);
        return obj;
    }
}

export default LegislativeBodyType;
