import { Button } from "@/components/ui/button"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import type { FindEquipmentLocationsDTO } from "@/data/dtos"
import { type SubmitHandler, useForm } from "react-hook-form"

type EquipmentSearchProps = {
	setSearchState: (state: FindEquipmentLocationsDTO) => void
}

export function EquipmentLocationSearch({
	setSearchState
}: EquipmentSearchProps) {
	const form = useForm<FindEquipmentLocationsDTO>()

	const onSubmit: SubmitHandler<FindEquipmentLocationsDTO> = (data) => {
		setSearchState({
			description: data.description ?? "",
			name: data.name ?? ""
		})
	}

	const onReset = () => {
		const resetValues: FindEquipmentLocationsDTO = {
			name: "",
			description: ""
		}
		form.reset(resetValues)
		setSearchState(resetValues)
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex flex-col gap-4 p-4"
			>
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Nome:</FormLabel>
							<FormControl>
								<Input placeholder="sala 07" {...field} />
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
								<Input placeholder="sala 07" {...field} />
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
