import Proposition from "../../domain/models/Proposition";

abstract class PropositionUsecase {
    abstract getPropositionByID(id: string): Promise<Proposition>;
}

export default PropositionUsecase;
