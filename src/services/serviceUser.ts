import axios from "axios";
import { DatosForm } from "../domain/datosForm";
import { HeaderDto, SesionStorage } from "../domain/user";
import { PermissionsApp, PermissionType } from "../utils/typeEvent";
import { SERVER_CONNECTION } from "./serverConstants";

class ServiceUser {


	async getPermissions(): Promise<PermissionsApp> {
		const url = SERVER_CONNECTION;
		const res = await axios.get(`${url}/admin/permissions-role`);
		return res.data;
	}

	async getPermissionsUser(id: number, type: PermissionType): Promise<string[]> {
		const url = SERVER_CONNECTION;
		const res = await axios.get(`${url}/user/permissions/${type}`);
		return res.data;
	}

	async getProfileDatos(id: number): Promise<DatosForm> {
		const url = SERVER_CONNECTION;
		const response = await axios.get<DatosForm>(`${url}/user/profile`);
		const entity = DatosForm.fromDto(response.data);

		return entity;
	}

	async getHeaderData(id: number): Promise<HeaderDto> {
		const url = SERVER_CONNECTION;
		const response = await axios.get(`${url}/user/header`);
		const entity = response.data;
		return HeaderDto.fromDto(entity);
	}

	async updateProfile(data: DatosForm): Promise<DatosForm> {
		const url = SERVER_CONNECTION;
		const response = await axios.put<DatosForm>(`${url}/user/profile`, data);
		const entity = DatosForm.fromDto(response.data);
		return entity;
	}

	async updateImg(img: string): Promise<void> {
		const url = SERVER_CONNECTION;
		const id = Number(sessionStorage.getItem("userId"));
		const update = { id, img };
		const res = await axios.put(`${url}/user/img`, update);
		 
	}

	async search(text: string): Promise<SesionStorage[]> {
		const url = SERVER_CONNECTION;
		const id = Number(sessionStorage.getItem("userId"));
		const response = await axios.get(`${url}/user`,
			{ params: { search: text } })
		// para qe no me traiga el usuario logueado, sino me elimino yo mismo
		return response.data.filter((user: SesionStorage) => user.id !== id);
	}
}



export const serviceUser = new ServiceUser();
