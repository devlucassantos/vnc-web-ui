import Proposition from "../../domain/models/Proposition";

abstract class PropositionAdapter {
    abstract getPropositionByID(id: string): Promise<Proposition>;
}

export default PropositionAdapter;
