import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ButtonApp } from "../../components/buttons/button";
import { HexagonBackground } from "../../components/hexagonBackground/hexagonBackg";
import { InputApp } from "../../components/input/input";
import { Title } from "../../components/title/title";
import { useProfileImg } from "../../context/contextImg";
import { LoginForm } from "../../domain/datosForm";
import { LoginRequestDTO } from "../../domain/Login";
import { authService } from "../../services/authService";
import "./login.css";
import { useLoader } from "../../context/loader/useLoader";
import { TIMELOADER } from "../../utils/config";
import { useToast } from "../../context/toast/useToast";

export const Login = () => {
	const [_, setUss] = useState("");
	const [__, setPass] = useState("");
	const navigate = useNavigate();

	const { setImg } = useProfileImg();
	const { open, openHTTP } = useToast();
	const { setIsLoading } = useLoader();

	const { register, handleSubmit, getValues, formState: { errors }, reset, } = useForm<LoginForm>({
		mode: "all",
		defaultValues: {
			user: "",
			password: "",
		},
	});

	const handleNavigation = () => {
		navigate("/home");
	};

	const handleLogin = async () => {
		setIsLoading(true);
		const { user, password } = getValues();
		setUss(user);
		setPass(password);

		try {
			const credentials = LoginRequestDTO.fromDto(user, password);
			 
			const loginSuccess = await authService.loginClient(credentials);
			 

			if (loginSuccess) {
				const img = sessionStorage.getItem("img") || "";
				setImg(img);
				reset();
				setTimeout(() => {
					setIsLoading(false);
					handleNavigation();
				}, TIMELOADER);
			} else {
				setTimeout(() => {
					setIsLoading(false);
					open("Credenciales incorrectas", "error");
					reset();
				}, TIMELOADER);
			}
		} catch (error) {
			 
			if (error instanceof Error && (error as any).response) {
				 
				openHTTP((error as any).response);
			} else {
				open("Ocurrió un error inesperado", "error");
			}
		}
	};



	return (
		<>
			<div className="login-box">

				<HexagonBackground></HexagonBackground>
				<form className="loginFormulary" onSubmit={handleSubmit(handleLogin)}>
					<Title title={"Event Nexus"} />
					<InputApp
						label="Usuario"
						type="text"
						register={register("user", {
							required: "El usuario es obligatorio",
						})}
						error={errors.user?.message || ""}
						readonly={false}
					/>

					<InputApp
						label="Contraseña"
						type="password"
						register={register("password", {
							required: "La contraseña es obligatoria",
						})}
						error={errors.password?.message || ""}
						readonly={false}
					/>

					<h2>
						<a className="forgotPassword" onClick={(_) => navigate("/recovery")}>

							Olvidaste tu contraseña?
						</a>
					</h2>

					<div className="buttonsLogin">
						<ButtonApp
							label="Ingresar"
							buttonType="submit"
							onSubmitMethod={handleSubmit(handleLogin)}
							method={handleSubmit(handleLogin)}
							isCancel={false}
						/>
					</div>
				</form>
			</div>
		</>
	);
};
