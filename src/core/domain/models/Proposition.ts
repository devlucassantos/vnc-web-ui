import Model from './model';
import DTO from "../types/http/DTO";
import { formatCustomDate } from "../../utils/dateUtils";
import Deputy from "./Deputy";
import Organization from "./Organization";
import Newsletter from "@models/Newsletter";

class Proposition extends Model {
    private _id: string;
    private _code: number;
    private _originalTextUrl: string;
    private _title: string;
    private _content: string;
    private _submittedAt: string;
    private _deputies: Deputy[];
    private _organizations: Organization[];
    private _newsletter: Newsletter | null;
    private _createdAt: string;
    private _updatedAt: string;

    constructor() {
        super();
        this._id = this._title = this._content = this._originalTextUrl = this._submittedAt = this._createdAt = this._updatedAt = '';
        this._code = 0;
        this._deputies = [];
        this._organizations = [];
        this._newsletter = null;
    }

    get id() {
        return this._id;
    }

    get code() {
        return this._code;
    }

    get originalTextUrl() {
        return this._originalTextUrl;
    }

    get title() {
        return this._title;
    }

    get content() {
        return this._content;
    }

    get submittedAt() {
        return this._submittedAt;
    }

    get deputies() {
        return this._deputies;
    }

    get organizations() {
        return this._organizations;
    }

    get newsletter() {
        return this._newsletter;
    }

    set setCode(code: number) {
        this._code = code;
    }

    set setOriginalTextUrl(originalTextUrl: string) {
        this._originalTextUrl = originalTextUrl;
    }

    set setTitle(title: string) {
        this._title = title;
    }

    set setContent(content: string) {
        this._content = content;
    }

    set setSubmittedAt(submittedAt: string) {
        this._submittedAt = submittedAt;
    }

    set setDeputies(deputies: Deputy[]) {
        this._deputies = deputies;
    }

    set setOrganizations(organizations: Organization[]) {
        this._organizations = organizations;
    }

    set setNewsletter(newsletter: Newsletter) {
        this._newsletter = newsletter;
    }

    get createdAt(): string {
        return this._createdAt;
    }

    get updatedAt(): string {
        return this._updatedAt;
    }

    set updatedAt(value: string) {
        this._updatedAt = value;
    }

    toJSON(): DTO {
        let dto = {} as DTO;
        dto['id'] = this._id;
        dto['code'] = this._code;
        dto['original_text_url'] = this._originalTextUrl;
        dto['title'] = this._title;
        dto['content'] = this._content;
        dto['submitted_at'] = this._submittedAt;
        dto['deputies'] = this._deputies?.map(deputy => deputy.toJSON());
        dto['organizations'] = this._organizations?.map(organization => organization.toJSON());
        dto['newsletter'] = this._newsletter?.toJSON();
        return dto;
    }

    static fromJSON(json: DTO<any>): Proposition {
        const obj = new Proposition();
        obj._id = String(json['id']);
        obj._code = Number(json['code']);
        obj._originalTextUrl = String(json['original_text_url']);
        obj._title = String(json['title']);
        obj._content = String(json['content']);
        obj._submittedAt = formatCustomDate(String(json['submitted_at']));
        obj._deputies = json['deputies']?.map((deputyJSON: DTO) => Deputy.fromJSON(deputyJSON));
        obj._organizations = json['organizations']?.map((organizationJSON: DTO) => Organization.fromJSON(organizationJSON));
        obj._createdAt = formatCustomDate(String(json['created_at']));
        obj._updatedAt = formatCustomDate(String(json['updated_at']));
        obj._newsletter = json['newsletter'] ? Newsletter.fromJSON(json['newsletter']) : null;
        return obj;
    }
}

export default Proposition;
