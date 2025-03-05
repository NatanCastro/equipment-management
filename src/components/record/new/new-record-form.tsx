import { Button } from "@/components/ui/button"
import { Form, FormItem, FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useEquipmentLocationService } from "@/hooks/use-equipment-location-service"
import { useEquipmentService } from "@/hooks/use-equipment-service"
import {
  type CreateRecordSchema,
  createRecordSchema
} from "@/schemas/create-record-schema"
import { useCreateRecordStore } from "@/stores/use-create-record-store"
import { isOk } from "@/types/result"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { Controller, useFieldArray, useForm } from "react-hook-form"
import { MultiEquipmentSelect } from "./multi-equipment-select"

export function CreateRecordForm() {
  const form = useForm<CreateRecordSchema>({
    resolver: zodResolver(createRecordSchema),
    defaultValues: {
      title: "",
      description: "",
      updated_equipments: []
    }
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "updated_equipments"
  })

  const removeEquipment = (index: number) => {
    remove(index)
  }

  const { findEquipments } = useEquipmentService()
  const { findEquipmentLocations } = useEquipmentLocationService()

  const {
    equipments,
    setEquipments,
    locations,
    setLocations,
    selectedEquipments,
    setSelectedEquipments
  } = useCreateRecordStore()

  useEffect(() => {
    ; (async () => {
      const result = await findEquipments({
        service_tag: "",
        name: "",
        description: "",
        location_id: "all"
      })
      const equipments = isOk(result) ? result.val : []

      setEquipments(equipments)
    })()
  }, [])

  useEffect(() => {
    ; (async () => {
      const result = await findEquipmentLocations({ name: "", description: "" })
      const locations = isOk(result) ? result.val : []

      setLocations(locations)
    })()
  }, [])

  const onSubmit = (data: CreateRecordSchema) => {
    console.log("Form Data:", data)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 p-4 border rounded"
      >
        <Controller
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <Input {...field} placeholder="titulo do registro" />
            </FormItem>
          )}
        />
        <Controller
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <Textarea {...field} placeholder="descrição do registro" />
            </FormItem>
          )}
        />

        <MultiEquipmentSelect
          equipments={equipments}
          selectedEquipments={selectedEquipments}
          setSelectedEquipments={setSelectedEquipments}
        />

        {fields.map((field, index) => (
          <div key={field.id} className="border p-2 rounded">
            <p>Equipamento: {field.service_tag}</p>

            <Controller
              control={form.control}
              name={`updated_equipments.${index}.id`}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="ID do equipamento"
                  hidden
                  disabled
                />
              )}
            />

            <Controller
              control={form.control}
              name={`updated_equipments.${index}.service_tag`}
              render={({ field }) => (
                <Input {...field} placeholder="Código do equipamento" />
              )}
            />

            <Controller
              control={form.control}
              name={`updated_equipments.${index}.name`}
              render={({ field }) => (
                <Input {...field} placeholder="Nome do equipamento" />
              )}
            />
            <Controller
              control={form.control}
              name={`updated_equipments.${index}.description`}
              render={({ field }) => (
                <Textarea {...field} placeholder="Descrição do equipamento" />
              )}
            />

            <Controller
              control={form.control}
              name={`updated_equipments.${index}.location_id`}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma localização" />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map((location) => (
                      <SelectItem key={location.id} value={location.id}>
                        {location.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />

            <Button
              variant="destructive"
              onClick={() => removeEquipment(index)}
            >
              Remover
            </Button>
          </div>
        ))}
      </form>
    </Form>
  )
}
