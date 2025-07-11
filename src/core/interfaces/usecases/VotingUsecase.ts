import Voting from "@models/Voting";

abstract class VotingUsecase {
    abstract getVotingByID(id: string): Promise<Voting>;
}

export default VotingUsecase;
