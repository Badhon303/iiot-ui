// import { format, parseISO } from "date-fns"
import { getSensorTypeData } from "@/actions/sensor-actions"

import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"

import { columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"
import ModalBtn from "./modal-btn"

export default async function TypeClient() {
  const data = await getSensorTypeData()
  const formattedData = data.map((item) => ({
    target_table_name: item.target_table_name,
    hardware_id: item.hardware_id,
    // sensorInputs: JSON.stringify(item.attributes?.sensorInput),
    hardware_nickname: item.hardware_nickname,
    table_col_structure: item.table_col_structure,
  }))
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Sensor-Type (${data.length})`}
          description="Manage sensor types"
        />
        <ModalBtn />
      </div>
      <Separator />
      {data && <DataTable columns={columns} data={formattedData} />}
    </>
  )
}
