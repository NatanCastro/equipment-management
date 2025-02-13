import { Equipment } from "../../types"


type Props = {
  equipments: Equipment[],
}


export function EquipmentsList(props: Props) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th className="p-4">Service Tag</th>
          <th className="p-4">Name</th>
          <th className="p-4">Description</th>
          <th className="p-4">Created At</th>
          <th className="p-4">Updated At</th>
        </tr>
      </thead>
      <tbody>
        {props.equipments.map((equipment) => (
          <tr key={equipment.id}>
            <td className="p-4">{equipment.service_tag}</td>
            <td className="p-4">{equipment.name}</td>
            <td className="p-4">{equipment.description.substring(0, 50)}</td>
            <td className="p-4">{new Date(equipment.created_at).toLocaleString()}</td>
            <td className="p-4">{new Date(equipment.updated_at).toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
