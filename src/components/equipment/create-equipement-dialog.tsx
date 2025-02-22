import { SubmitHandler, useForm } from "react-hook-form";
import { CreateEquipmentDTO } from "@/types/equipment";
import { invoke } from "@tauri-apps/api/core";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

type CreateEquipmentDialogProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function CreateEquipmentDialog({ isOpen, onClose }: CreateEquipmentDialogProps) {
  const form = useForm<CreateEquipmentDTO>();

  const onSubmit: SubmitHandler<CreateEquipmentDTO> = async (data) => {
    await invoke("create_equipment", { dto: data });
    form.reset(); // Limpa o formulário
    onClose(); // Fecha o modal após criar
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-800 text-white p-6 rounded-lg shadow-lg w-96">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">Create New Equipment</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="service_tag"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Service Tag</FormLabel>
                  <FormControl>
                    <Input {...field} className="bg-gray-700" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} className="bg-gray-700" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input {...field} className="bg-gray-700" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="flex justify-end gap-2">
              <Button variant="destructive" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">Create</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
