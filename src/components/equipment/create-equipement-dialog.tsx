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
import type { CreateEquipmentDTO } from "@/data/dtos"
import { useEquipmentService } from "@/hooks/use-equipment-service"
import { type SubmitHandler, useForm } from "react-hook-form"

type CreateEquipmentDialogProps = {
	isOpen: boolean
	onClose: () => void
}

export function CreateEquipmentDialog({ isOpen, onClose }: CreateEquipmentDialogProps) {
	const form = useForm<CreateEquipmentDTO>()
	const { createEquipment } = useEquipmentService()

	const onSubmit: SubmitHandler<CreateEquipmentDTO> = async (data) => {
		await createEquipment(data)
		form.reset()
		onClose()
	}

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="bg-background text-white p-6 rounded-lg shadow-lg w-96">
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
										<Input {...field} />
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
							<Button type="submit" className="text-foreground">
								Create
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}
