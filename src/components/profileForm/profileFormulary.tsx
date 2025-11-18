import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { DatosForm } from "../../domain/datosForm";
import { InputApp } from "../input/input";
import { ButtonApp } from "./../buttons/button";
import './profileFormulary.css';
import { useToast } from "../../context/toast/useToast";

interface PropsFormulary {
  info: DatosForm;
  uploadData: (data: DatosForm) => void;
}

export const ProfileFormulary = ({ info, uploadData }: PropsFormulary) => {
	const { register, handleSubmit, formState: { errors }, reset} = useForm({
		mode: "all",
		defaultValues: info,
	});

	const {open} = useToast();

	useEffect(() => {
		reset(info);
	}, [info, reset]);

	const onclick = (data: DatosForm) => {
		
		if (JSON.stringify(data) !== JSON.stringify(info)) {
		uploadData(data);
		} else {
		open("No hay cambios en el formulario", "error");
		}
	};


	const HandleCancel = () => {
		reset(info);
		open("Cambios cancelados", "warning");
	};
  
/*
 <InputApp
        label="Nombre"
        type="text"
        register={register("nombre")}
        readonly={true}
        error={errors.nombre?.message || ""}
      />

      <InputApp
        label="Apellido"
        type="text"
        register={register("apellido")}
        readonly={true}
        error={errors.apellido?.message || ""}
      />
*/

  return (
    <form className='profileFormulary' style={{overflowY:'scroll'}} >
     

      <InputApp
        label="Telefono"
        type="number"
        register={register("phone", {
          required: "El teléfono es obligatorio",
          pattern: {
            value: /^[0-9]{10}$/,
            message: "Debe contener 10 dígitos"
          }
        })}
        readonly={false}
        error={errors.phone?.message || ""}
      />

      <InputApp
        label="E-Mail"
        type="email"
        register={register("email", {
          required: "El email es obligatorio",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Correo electrónico inválido"
          }
        })}
        readonly={false}
        error={errors.email?.message || ""}
      />

      <InputApp
        label="Direccion"
        type="text"
        register={register("address", {
          required: "La dirección es obligatoria",
          minLength: {
            value: 5,
            message: "Debe tener al menos 5 caracteres"
          }
        })}
        readonly={false}
        error={errors.address?.message || ""}
      />

      <div className="buttons">
        <ButtonApp label="Cancelar" method={HandleCancel} isCancel={true} />
        <ButtonApp label="Aceptar" method={handleSubmit(onclick)} isCancel={false} />
      </div>
    </form>
  );
};
