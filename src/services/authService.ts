import axios from "axios";
import { LoginRequestDTO, loginResponseDTO, LoginResponseDTO } from "../domain/Login";
import { SERVER_CONNECTION } from "./serverConstants";

class AuthService {

    async loginClient(data: LoginRequestDTO): Promise<boolean> {
        const url = SERVER_CONNECTION;
        try {
            const res = await axios.post<LoginResponseDTO>(`${url}/auth/login`, data);
            const userData = loginResponseDTO.fromDto(res.data);
            sessionStorage.setItem("userId", res.data.id.toString());
            sessionStorage.setItem("userRole", userData.role.toUpperCase());
            sessionStorage.setItem("img", userData.img);
            sessionStorage.setItem("token", userData.token.toString());
            return res.status === 200;
        } catch (error) {
            return false;
        }
    }

}

export const authService = new AuthService()