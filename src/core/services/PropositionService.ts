import PropositionUsecase from "../interfaces/usecases/PropositionUsecase";
import Proposition from "../domain/models/Proposition";
import PropositionAdapter from "../interfaces/adapters/PropositionAdapter";

export class PropositionService implements PropositionUsecase {
    constructor(private propositionAdapter: PropositionAdapter) {}

    async getPropositionByID(id: string): Promise<Proposition> {
        return this.propositionAdapter.getPropositionByID(id);
    }
}
