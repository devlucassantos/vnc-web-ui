import Model from "./model";
import DTO from "../types/http/DTO";
import Party from "./Party";
import {formatCustomDate} from "../../utils/dateUtils";

class Deputy extends Model {
    private _id: string;
    private _code: number;
    private _cpf: string;
    private _name: string;
    private _electoralName: string;
    private _imageUrl: string;
    private _party: Party;
    private _partyInTheProposal: Party | null;
    private _createdAt: string;
    private _updatedAt: string;

    constructor() {
        super();
        this._id = this._name = this._cpf = this._electoralName = this._imageUrl = this._createdAt = this._updatedAt = '';
        this._code = 0;
        this._party = new Party();
        this._partyInTheProposal = new Party();
    }

    get id() {
        return this._id;
    }

    get code() {
        return this._code;
    }

    get cpf() {
        return this._cpf;
    }

    get name() {
        return this._name;
    }

    get electoralName() {
        return this._electoralName;
    }

    get imageUrl() {
        return this._imageUrl;
    }

    get party() {
        return this._party;
    }

    get partyInTheProposal() {
        return this._partyInTheProposal;
    }

    set setCode(code: number) {
        this._code = code;
    }

    set setCpf(cpf: string) {
        this._cpf = cpf;
    }

    set setName(name: string) {
        this._name = name;
    }

    set setElectoralName(electoralName: string) {
        this._electoralName = electoralName;
    }

    set setImageUrl(imageUrl: string) {
        this._imageUrl = imageUrl;
    }

    set setParty(party: Party) {
        this._party = party;
    }

    set setPartyInTheProposal(partyInTheProposal: Party) {
        this._partyInTheProposal = partyInTheProposal;
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
        dto['cpf'] = this._cpf;
        dto['name'] = this._name;
        dto['electoral_name'] = this._electoralName;
        dto['image_url'] = this._imageUrl;
        dto['party'] = this._party.toJSON();
        dto['party_in_the_proposal'] = this._partyInTheProposal?.toJSON();
        return dto;
    }

    static fromJSON(json: DTO<any>): Deputy {
        const obj = new Deputy();
        obj._id = String(json['id']);
        obj._code = Number(json['code']);
        obj._cpf = String(json['cpf']);
        obj._name = String(json['name']);
        obj._electoralName = String(json['electoral_name']);
        obj._imageUrl = String(json['image_url']);
        obj._party = Party.fromJSON(json['party']);
        obj._partyInTheProposal = json['party_in_the_proposal'] ? Party.fromJSON(json['party_in_the_proposal']) : null;
        obj._createdAt = formatCustomDate(String(json['created_at']));
        obj._updatedAt = formatCustomDate(String(json['updated_at']));
        return obj;
    }
}

export default Deputy;
