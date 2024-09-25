import Model from './model';
import DTO from "../types/http/DTO";
import { formatCustomDateTime } from "../../utils/dateUtils";
import Deputy from "./Deputy";
import ExternalAuthor from "./ExternalAuthor";
import Article from "@models/Article";
import ArticleType from "@models/ArticleType";

class Proposition extends Model {
    private _id: string;
    private _originalTextUrl: string;
    private _title: string;
    private _content: string;
    private _imageUrl: string;
    private _viewLater: boolean;
    private _numberOfRatings: number;
    private _averageRating: number;
    private _userRating: number;
    private _submittedAt: string;
    private _referenceDateTime: string;
    private _deputies: Deputy[];
    private _externalAuthors: ExternalAuthor[];
    private _newsletterArticle: Article | null;
    private _type: ArticleType;
    private _createdAt: string;
    private _updatedAt: string;

    constructor() {
        super();
        this._id = this._title = this._content = this._imageUrl = this._originalTextUrl = this._referenceDateTime = this._submittedAt = this._createdAt = this._updatedAt = '';
        this._deputies = this._externalAuthors = [];
        this._newsletterArticle = null;
        this._viewLater = false;
        this._numberOfRatings = this._averageRating = this._userRating = 0;
        this._type = new ArticleType()
    }

    get id() {
        return this._id;
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

    get externalAuthors() {
        return this._externalAuthors;
    }

    get newsletterArticle() {
        return this._newsletterArticle;
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

    set setExternalAuthors(externalAuthors: ExternalAuthor[]) {
        this._externalAuthors = externalAuthors;
    }

    set setNewsletterArticle(newsletterArticle: Article) {
        this._newsletterArticle = newsletterArticle;
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

    get imageUrl(): string {
        return this._imageUrl;
    }

    set imageUrl(value: string) {
        this._imageUrl = value;
    }

    get viewLater(): boolean {
        return this._viewLater;
    }

    set viewLater(value: boolean) {
        this._viewLater = value;
    }

    get numberOfRatings(): number {
        return this._numberOfRatings;
    }

    set numberOfRatings(value: number) {
        this._numberOfRatings = value;
    }

    get averageRating(): number {
        return this._averageRating;
    }

    set averageRating(value: number) {
        this._averageRating = value;
    }

    get userRating(): number {
        return this._userRating;
    }

    set userRating(value: number) {
        this._userRating = value;
    }

    get referenceDateTime(): string {
        return this._referenceDateTime;
    }

    set referenceDateTime(value: string) {
        this._referenceDateTime = value;
    }

    get type(): ArticleType {
        return this._type;
    }

    set type(value: ArticleType) {
        this._type = value;
    }

    toJSON(): DTO {
        let dto = {} as DTO;
        dto['id'] = this._id;
        dto['original_text_url'] = this._originalTextUrl;
        dto['title'] = this._title;
        dto['content'] = this._content;
        dto['image_url'] = this._imageUrl;
        dto['view_later'] = this._viewLater;
        dto['number_of_ratings'] = this._numberOfRatings;
        dto['average_rating'] = this._averageRating;
        dto['user_rating'] = this._userRating;
        dto['submitted_at'] = this._submittedAt;
        dto['reference_date_time'] = this._referenceDateTime;
        dto['deputies'] = this._deputies?.map(deputy => deputy.toJSON());
        dto['external_authors'] = this._externalAuthors?.map(externalAuthor => externalAuthor.toJSON());
        dto['newsletter_article'] = this._newsletterArticle?.toJSON();
        dto['type'] = this._type?.toJSON();
        return dto;
    }

    static fromJSON(json: DTO<any>): Proposition {
        const obj = new Proposition();
        obj._id = String(json['id']);
        obj._originalTextUrl = String(json['original_text_url']);
        obj._title = String(json['title']);
        obj._content = String(json['content']);
        obj._imageUrl = String(json['image_url']);
        obj._viewLater = Boolean(json['view_later']);
        obj._numberOfRatings = Number(json['number_of_ratings']);
        obj._averageRating = Number(json['average_rating']);
        obj._userRating = Number(json['user_rating']);
        obj._submittedAt = formatCustomDateTime(String(json['submitted_at']));
        obj._referenceDateTime = formatCustomDateTime(String(json['reference_date_time']));
        obj._deputies = json['deputies']?.map((deputyJSON: DTO) => Deputy.fromJSON(deputyJSON));
        obj._externalAuthors = json['external_authors']?.map((externalAuthorJSON: DTO) => ExternalAuthor.fromJSON(externalAuthorJSON));
        obj._createdAt = formatCustomDateTime(String(json['created_at']));
        obj._updatedAt = formatCustomDateTime(String(json['updated_at']));
        obj._newsletterArticle = json['newsletter_article'] ? Article.fromJSON(json['newsletter_article']) : null;
        obj._type = ArticleType.fromJSON(json['type']);
        return obj;
    }
}

export default Proposition;
