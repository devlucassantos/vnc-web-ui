import DTO from "../../../core/domain/types/http/DTO";
import {BackendClient} from "../clients/BackendClient";
import VotingAdapter from "@interfaces/adapters/VotingAdapter";
import Voting from "@models/Voting";


class VotingAPI implements VotingAdapter {
    async getVotingByID(id: string): Promise<Voting> {

        try {
            const response = await BackendClient.get(`/articles/` + id + `/voting`);
            const data = response.data

            return Voting.fromJSON(data as DTO);
        } catch (error) {
            throw error;
        }
    }
}

export default VotingAPI;
