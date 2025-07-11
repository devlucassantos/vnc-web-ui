import VotingAdapter from "@interfaces/adapters/VotingAdapter";
import VotingUsecase from "@interfaces/usecases/VotingUsecase";
import Voting from "@models/Voting";

export class VotingService implements VotingUsecase {
    constructor(private votingAdapter: VotingAdapter) {}

    async getVotingByID(id: string): Promise<Voting> {
        return this.votingAdapter.getVotingByID(id);
    }
}
