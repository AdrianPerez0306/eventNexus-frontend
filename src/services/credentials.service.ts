import axios from "axios";
import { CredentialsDto } from "../domain/credentials";
import { SERVER_CONNECTION } from "./serverConstants";

class CredentialsService {
    async changePassword(data: CredentialsDto) : Promise<any> {
        const url = SERVER_CONNECTION;
        const res = await axios.put(`${url}/admin/recovery`, data);
        return res;
    }

    async confirmCredentials(data: CredentialsDto): Promise<any> {
        const url = SERVER_CONNECTION;
        const res = await axios.put(`${url}/admin/register`, data);
        return res;
    }
}

export const credentialService = new CredentialsService();