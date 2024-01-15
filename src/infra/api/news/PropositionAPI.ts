import DTO from "../../../core/domain/types/http/DTO";
import {BackendClient} from "../clients/BackendClient";
import PropositionAdapter from "../../../core/interfaces/adapters/PropositionAdapter";
import Proposition from "../../../core/domain/models/Proposition";


class PropositionAPI implements PropositionAdapter {
    async getPropositionByID(id: string): Promise<Proposition> {

        try {
            const response = await BackendClient.get(`/news/propositions/` + id);
            const data = response.data

            return Proposition.fromJSON(data as DTO);
        } catch (error) {
            throw error;
        }
    }
}

export default PropositionAPI;