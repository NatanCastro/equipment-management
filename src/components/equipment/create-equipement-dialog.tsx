import { SubmitHandler, useForm } from "react-hook-form";
import { CreateEquipmentDTO, Equipment } from "../../types";
import { FormInput } from "..";
import { invoke } from "@tauri-apps/api/core";
import { Button } from "../ui/button";

type CreateEquipmentDialogProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function CreateEquipmentDialog({ isOpen, onClose }: CreateEquipmentDialogProps) {
  const { register, handleSubmit, reset } = useForm<CreateEquipmentDTO>();

  const onSubmit: SubmitHandler<CreateEquipmentDTO> = async (data) => {
    const newEquipment = await invoke("create_equipment", { dto: data }) as Equipment;
    console.log(newEquipment);
    reset(); // Clear the form
    onClose(); // Close modal after creating
  };
  return (
    <dialog open={isOpen} className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-bold mb-4">Create New Equipment</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <FormInput label="Service Tag" inputName="service_tag">
            <input type="text" {...register("service_tag")} className="w-full p-2 bg-gray-700 rounded" />
          </FormInput>
          <FormInput label="Name" inputName="name">
            <input type="text" {...register("name")} className="w-full p-2 bg-gray-700 rounded" />
          </FormInput>
          <FormInput label="Description" inputName="description">
            <input type="text" {...register("description")} className="w-full p-2 bg-gray-700 rounded" />
          </FormInput>
          <div className="flex justify-end gap-2">
            <Button onClick={onClose} className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded">
              Cancel
            </Button>
            <Button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded" type="submit">
              Create
            </Button>
          </div>
        </form>
      </div>
    </dialog>
  );
}

