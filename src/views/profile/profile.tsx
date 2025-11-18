import { useEffect, useState } from "react";
import { ProfileFormulary } from "../../components/profileForm/profileFormulary";
import { datosForm, DatosForm } from "../../domain/datosForm";
import { serviceUser } from "../../services/serviceUser";
import "./profile.css";
import "../../components/title/title.css"
import { ProfileImg } from "../../components/profileImg/profileImg";
import { useToast } from "../../context/toast/useToast";

export const Profile = () => {
	const [datos, setDatos] = useState<DatosForm>(datosForm);
	const id = Number(sessionStorage.getItem("userId"));
	const { open } = useToast();


	const getProfile = async () => {
		try {
			const res = await serviceUser.getProfileDatos(id);
			setDatos(res);
		} catch (error) {
			console.error("Error al obtener el perfil:", error);
		}
	};

	const changeImg = async (img: string) => {
		try {
			await serviceUser.updateImg(img);
			open("Imagen actualizada", "success");
		} catch (error) {
			open("Error al actualizar la imagen", "error");
		}
	}

	const changeData = async (data: DatosForm) => {
		// setIsLoading(true);
		try {
			await serviceUser.updateProfile(data);
			setDatos(data);
			 
		} catch (error) {
			open("Error al actualizar los datos", "error");
		}
		// setTimeout(() => {
		// setIsLoading(false);
		open("Perfil actualizado", "success");
		// }, TIMELOADER)
	}

	useEffect(() => {
		getProfile();
	}, []);

	return (
		<div className="profile__container">
			<ProfileImg change={changeImg}></ProfileImg>
			<h1 className="titleStyle">{datos.nombre + " " + datos.apellido}</h1>
			<ProfileFormulary info={datos} uploadData={changeData} />
		</div>
	);
};
