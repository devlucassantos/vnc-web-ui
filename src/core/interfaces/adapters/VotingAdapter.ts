import Voting from "@models/Voting";

abstract class VotingAdapter {
    abstract getVotingByID(id: string): Promise<Voting>;
}

export default VotingAdapter;
