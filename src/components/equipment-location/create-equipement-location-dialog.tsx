import { Button } from "@/components/ui/button"
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle
} from "@/components/ui/dialog"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import type { CreateEquipmentLocationDTO } from "@/data/dtos"
import { useEquipmentLocationService } from "@/hooks/use-equipment-location-service"
import { type SubmitHandler, useForm } from "react-hook-form"

type CreateEquipmentLocationDialogProps = {
	isOpen: boolean
	onClose: () => void
}

export function CreateEquipmentLocationDialog({
	isOpen,
	onClose
}: CreateEquipmentLocationDialogProps) {
	const form = useForm<CreateEquipmentLocationDTO>()
	const { createEquipmentLocation } = useEquipmentLocationService()

	const onSubmit: SubmitHandler<CreateEquipmentLocationDTO> = async (data) => {
		await createEquipmentLocation(data)
		form.reset()
		onClose()
	}

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="bg-background text-white p-6 rounded-lg shadow-lg w-96">
				<DialogHeader>
					<DialogTitle className="text-lg font-bold">
						Create New Equipment Location
					</DialogTitle>
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
										<Input {...field} />
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
										<Input {...field} />
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
	)
}
