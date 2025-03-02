import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from "@/components/ui/select"
import type { FindEquipmentsDTO } from "@/data/dtos"
import type { EquipmentLocation } from "@/domain/models"
import { useEquipmentLocationService } from "@/hooks/use-equipment-location-service"
import { isErr } from "@/types/result"
import { useEffect, useState } from "react"
import { type SubmitHandler, useForm } from "react-hook-form"

type EquipmentSearchProps = {
	setSearchState: (state: FindEquipmentsDTO) => void
}

export function EquipmentSearch({ setSearchState }: EquipmentSearchProps) {
	const form = useForm<FindEquipmentsDTO>()
	const { findEquipmentLocations } = useEquipmentLocationService()
	const [locations, setLocations] = useState<EquipmentLocation[]>([])

	const onSubmit: SubmitHandler<FindEquipmentsDTO> = (data) => {
		console.log(data)
		setSearchState({
			description: data.description,
			name: data.name,
			service_tag: data.service_tag,
			location_id: data.location_id ?? "all"
		})
	}
	const onReset = () => {
		const resetValues: FindEquipmentsDTO = {
			description: "",
			name: "",
			service_tag: "",
			location_id: "all"
		}
		form.reset(resetValues)
		setSearchState(resetValues)
	}

	useEffect(() => {
		findEquipmentLocations({
			name: "",
			description: ""
		}).then((result) => {
			if (isErr(result)) {
				console.error(result.err)
			} else {
				setLocations(result.val)
			}
		})
	}, [findEquipmentLocations])

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
								<Input placeholder="computador dell" {...field} defaultValue="" />
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
								<Input placeholder="16gb de ram..." {...field} defaultValue="" />
							</FormControl>
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="location_id"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Localização:</FormLabel>
							<FormControl>
								<Select
									onValueChange={field.onChange}
									value={field.value}
									defaultValue="all"
								>
									<SelectTrigger>
										<SelectValue placeholder="Selecione uma localização" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="all">Todos</SelectItem>
										{locations.map((location) => (
											<SelectItem key={location.id} value={location.id}>
												{location.name}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</FormControl>
						</FormItem>
					)}
				/>

				<div className="flex justify-between">
					<Button type="reset" variant="outline" onClick={onReset}>
						Limpar
					</Button>
					<Button type="submit">Pesquisar</Button>
				</div>
			</form>
		</Form>
	)
}
