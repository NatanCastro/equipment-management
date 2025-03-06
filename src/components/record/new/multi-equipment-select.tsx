import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import type { EquipmentWithLocation } from "@/domain/models"

type MultiEquipmentSelectProps = {
  equipments: EquipmentWithLocation[]
  selectedEquipments: EquipmentWithLocation[]
  setSelectedEquipments: (
    equipment: EquipmentWithLocation,
    action: "add" | "remove"
  ) => void
}

export function MultiEquipmentSelect({
  equipments,
  selectedEquipments,
  setSelectedEquipments
}: MultiEquipmentSelectProps) {
  const handleCheckedChange =
    (item: EquipmentWithLocation) => (checked: boolean) => {
      setSelectedEquipments(item, checked ? "add" : "remove")
    }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Select Equipments</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Equipments</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {equipments.map((item) => {
          const isSelected = selectedEquipments.some((i) => i.id === item.id)
          return (
            <DropdownMenuCheckboxItem
              key={item.id}
              checked={isSelected}
              onCheckedChange={handleCheckedChange(item)}
            >
              {item.service_tag}
            </DropdownMenuCheckboxItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
