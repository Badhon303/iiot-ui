import { format, parseISO } from "date-fns"
import { getSensorTypeData } from "@/actions/sensor-actions"

import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"

import { columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"
import ModalBtn from "./modal-btn"

export default async function TypeClient() {
  const data = await getSensorTypeData()
  const formattedData = data?.data?.map((item) => ({
    id: item.id,
    type: item.attributes?.sensorName,
    sensorInputs: JSON.stringify(item.attributes?.sensorInput),
    createdAt: format(parseISO(item.attributes?.createdAt), "MMMM do, yyyy"),
    updatedAt: format(parseISO(item.attributes?.updatedAt), "MMMM do, yyyy"),
  }))
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Sensor-Type (${data?.meta?.pagination?.total})`}
          description="Manage sensor types"
        />
        <ModalBtn />
      </div>
      <Separator />
      {data && <DataTable columns={columns} data={formattedData} />}
    </>
  )
}
