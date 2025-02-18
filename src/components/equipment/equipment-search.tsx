import { SubmitHandler, useForm } from "react-hook-form";
import { type FindEquipmentsDTO } from "@/types";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

type EquipmentSearchProps = {
  setSearchState: (state: FindEquipmentsDTO) => void;
};

export function EquipmentSearch({ setSearchState }: EquipmentSearchProps) {
  const form = useForm<FindEquipmentsDTO>();

  const onSubmit: SubmitHandler<FindEquipmentsDTO> = (data) => {
    setSearchState(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 p-4">
        <FormField
          control={form.control}
          name="service_tag"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tag de Serviço:</FormLabel>
              <FormControl>
                <Input placeholder="145142" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome:</FormLabel>
              <FormControl>
                <Input placeholder="computador dell" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição:</FormLabel>
              <FormControl>
                <Input placeholder="16gb de ram..." {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full bg-blue-700">
          Pesquisar
        </Button>
      </form>
    </Form>
  );
}
