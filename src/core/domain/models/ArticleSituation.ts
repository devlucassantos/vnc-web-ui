import Model from "./model";
import {convertToISODate, formatCustomDateTime} from "../../utils/dateUtils";
import DTO from "@typing/http/DTO";
import Article from "@models/Article";
import SpecificType from "@models/SpecificType";

class ArticleSituation extends Model {
    private _id: string;
    private _description: string;
    private _color: string;
    private _startsAt: string;
    private _endsAt: string;
    private _result: string;
    private _resultAnnouncedAt: string;
    private _isApproved: boolean | null;

    constructor() {
        super();
        this._id = this._description = this._color = this._startsAt = this._endsAt = this._result = this._resultAnnouncedAt = '';
        this._isApproved = null;
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

    get startsAt() {
        return this._startsAt;
    }

    get endsAt() {
        return this._endsAt;
    }

    get result() {
        return this._result;
    }

    get resultAnnouncedAt() {
        return this._resultAnnouncedAt;
    }

    get isApproved() {
        return this._isApproved;
    }

    toJSON(): DTO {
        let dto = {} as DTO;
        dto['id'] = this._id;
        dto['description'] = this._description;
        dto['color'] = this._color;
        dto['starts_at'] = this._startsAt;
        dto['ends_at'] = this._endsAt;
        dto['result'] = this._result;
        dto['result_announced_at'] = this._resultAnnouncedAt;
        dto['is_approved'] = this._isApproved;
        return dto;
    }

    static fromJSON(json: DTO<any>): ArticleSituation {
        const obj = new ArticleSituation();
        obj._id = String(json['id']);
        obj._description = String(json['description']);
        obj._color = String(json['color']);
        obj._startsAt = json['starts_at'] ? formatCustomDateTime(String(json['starts_at'])) : '';
        obj._endsAt = json['ends_at'] ? formatCustomDateTime(String(json['ends_at'])) : '';
        obj._result = String(json['result']);
        obj._resultAnnouncedAt = json['result_announced_at'] ? formatCustomDateTime(String(json['result_announced_at'])) : '';
        obj._isApproved = json['is_approved'] !== undefined ? Boolean(json['is_approved']) : null;
        return obj;
    }
}

export default ArticleSituation;
