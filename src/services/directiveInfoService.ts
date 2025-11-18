import axios from "axios";
import { DirectiveInfoData } from "../domain/directiveInfo";
import { SERVER_CONNECTION } from "./serverConstants";

class DiretiveInfoService {
    async createDirectiveInfo(directiveInfoData: DirectiveInfoData): Promise<void> {
        const url = SERVER_CONNECTION;
        const response = await axios.post(`${url}/directive/create`,directiveInfoData);
         
    }
    
    async fetchDirectives():Promise<DirectiveInfoData[]> {
        const url = SERVER_CONNECTION;
        const response = await axios.get(`${url}/directive`);
         
        return response.data
    }
}


export const directiveInfoService = new DiretiveInfoService();