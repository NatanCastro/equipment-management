import { SubmitHandler, useForm } from "react-hook-form";
import { type FindEquipmentsDTO } from "../../types";
import { FormInput } from "../";
import { Button } from "@/components/ui/button";

type EquipmentSearchProps = {
  setSearchState: (state: FindEquipmentsDTO) => void;
};

export function EquipmentSearch({ setSearchState }: EquipmentSearchProps) {
  const { register, handleSubmit } = useForm<FindEquipmentsDTO>();

  const onSubmit: SubmitHandler<FindEquipmentsDTO> = (data) => {
    setSearchState(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 p-4 rounded-lg shadow-md">
      <FormInput label="Service Tag" inputName="service_tag">
        <input
          type="text"
          {...register("service_tag", { value: "" })}
          className="p-2 border rounded w-full"
          placeholder="Enter Service Tag"
        />
      </FormInput>
      <FormInput label="Name" inputName="name">
        <input
          type="text"
          {...register("name", { value: "" })}
          className="p-2 border rounded w-full"
          placeholder="Enter Name"
        />
      </FormInput>
      <FormInput label="Description" inputName="description">
        <input
          type="text"
          {...register("description", { value: "" })}
          className="p-2 border rounded w-full"
          placeholder="Enter Description"
        />
      </FormInput>
      <Button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full">
        Search
      </Button>
    </form>
  );
}
