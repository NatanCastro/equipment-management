import { SubmitHandler, useForm } from "react-hook-form";
import { CreateEquipmentDTO, Equipment } from "@/types";
import { FormInput } from "..";
import { invoke } from "@tauri-apps/api/core";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-800 text-white p-6 rounded-lg shadow-lg w-96">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">Create New Equipment</DialogTitle>
        </DialogHeader>
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
          <DialogFooter className="flex justify-end gap-2">
            <Button className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded" variant="destructive" onClick={onClose}>
              Cancel
            </Button>
            <Button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded" type="submit">
              Create
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
