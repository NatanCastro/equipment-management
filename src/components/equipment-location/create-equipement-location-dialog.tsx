import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CreateEquipmentLocationDTO } from "@/data/dtos";
import { equipmentLocationService } from "@/domain/services";
import { SubmitHandler, useForm } from "react-hook-form";

type CreateEquipmentLocationDialogProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function CreateEquipmentLocationDialog({ isOpen, onClose }: CreateEquipmentLocationDialogProps) {
  const form = useForm<CreateEquipmentLocationDTO>();

  const onSubmit: SubmitHandler<CreateEquipmentLocationDTO> = async (data) => {
    await equipmentLocationService.createEquipmentLocation(data);
    form.reset();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-800 text-white p-6 rounded-lg shadow-lg w-96">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">Create New Equipment Location</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
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
