import { useLocation, useNavigate } from "react-router-dom";
import { HexagonBackground } from "../../components/hexagonBackground/hexagonBackg";
import { Title } from "../../components/title/title";
import { InputApp } from "../../components/input/input";
import { useForm } from "react-hook-form";
import { ButtonApp } from "../../components/buttons/button";
import './credentials.css'
import { CredentialsDto, CredentialsForm } from "../../domain/credentials";
import { credentialService } from "../../services/credentials.service";
import { useLoader } from "../../context/loader/useLoader";
import { useToast } from "../../context/toast/useToast";
import { TIMELOADER } from "../../utils/config";

export const CredentialsComponent = () => {


    const location = useLocation();
    const isRecovery = location.pathname === '/recovery';
    const {setIsLoading} = useLoader() 
    const {open} = useToast()
    const nav = useNavigate()



    const { register, handleSubmit, getValues, formState: { errors } } = useForm<CredentialsForm>({
        mode: "all",
        defaultValues: {
            user: "",
            password: "",
            mail: "",

        },
    });

    const createUser = async (data: CredentialsForm): Promise<void> => {
        const { password, confirmPassword } = getValues();
        if (password == confirmPassword) {
            const credentials = new CredentialsDto(data);
            sendData(credentials);
        }else{
            open("Contraseñas incorrectas","error")
        }
    }
    
    const sendData = async (data: CredentialsDto): Promise<void> => {
        setIsLoading(true)
        try{
            isRecovery ? await credentialService.changePassword(data) : await credentialService.confirmCredentials(data);
            setTimeout(() => {
                setIsLoading(false)
                nav('/login')
            }, TIMELOADER)
        }catch (error : any) {
            setTimeout(() => {
                setIsLoading(false)
                open(error.data,error.status)
            }, TIMELOADER)

        }

    }

    return (
        <div className="credentials-box">
            <HexagonBackground></HexagonBackground>
            <form className="credentialsFormulary" style={{overflowY:'scroll'}}>
                {!isRecovery ? <Title title={"Crear cuenta"} /> : <Title title={"Recuperar contraseña"} />}
                <InputApp
                    label="E-mail"
                    type="text"
                    register={register("mail", {
                        required: "El usuario es obligatorio",
                    })}
                    error={errors.mail?.message || ""}
                    readonly={false}
                />
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
                <InputApp
                    label="Contraseña"
                    type="password"
                    register={register("confirmPassword", {
                        required: "La contraseña es obligatoria",
                    })}
                    error={errors.password?.message || ""}
                    readonly={false}
                />

                <div className="buttonsCredentials">
                    <ButtonApp
                        label="Volver"
                        method={() => nav('/login')}
                        isCancel={true}
                    />
                        <ButtonApp
                            label="Enviar"
                            method={handleSubmit(createUser)}
                            isCancel={false}
                        />
                </div>
            </form>
        </div>
    )



}