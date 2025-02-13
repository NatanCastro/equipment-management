import { SubmitHandler, useForm } from "react-hook-form";
import { CreateEquipmentDTO, Equipment } from "../types";
import { FormInput } from "../components";
import { invoke } from "@tauri-apps/api/core";
import { Navigate, NavLink } from "react-router";

export default function CreateEquipment() {
  const {
    register,
    handleSubmit,
  } = useForm<CreateEquipmentDTO>();
  const onSubmit: SubmitHandler<CreateEquipmentDTO> = (data) => {
    console.log(data);
    (async () => {
      const newEquipment = await invoke("create_equipment", {
        dto: data,
      }) as Equipment;
      console.log(newEquipment);
      return <Navigate to="/" />;
    })()
  }
  return (
    <div>
      <NavLink to="/">Back</NavLink>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput label="Service Tag" inputName="service_tag">
          <input type="text" {...register("service_tag", { value: "" })} />
        </FormInput>
        <FormInput label="Name" inputName="name">
          <input type="text" {...register("name", { value: "" })} />
        </FormInput>
        <FormInput label="Description" inputName="description">
          <input type="text" {...register("description", { value: "" })} />
        </FormInput>
        <button type="submit">Create</button>
      </form>
    </div>
  )
}
