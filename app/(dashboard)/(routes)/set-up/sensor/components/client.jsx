import { format, parseISO } from "date-fns"
import { getSensorData } from "@/actions/sensor-actions"

import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"

import { columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"
import ModalBtn from "./modal-btn"

export default async function SensorClient() {
  const data = await getSensorData()
  const formattedData = data?.data?.map((item) => ({
    id: item.id,
    // materialName: item.attributes?.materialName,
    // product_category:
    //   item.attributes?.product_category?.data?.attributes?.categoryName,
    // product_category_id: item.attributes?.product_category?.data?.id,
    sensor_type: item.attributes?.sensor_type?.data?.attributes?.sensorName,
    sensor_type_id: item.attributes?.sensor_type?.data?.id,
    protocol: item.attributes?.protocol?.data?.attributes?.protocolName,
    protocol_id: item.attributes?.protocol?.data?.id,
    createdAt: format(parseISO(item.attributes?.createdAt), "MMMM do, yyyy"),
    updatedAt: format(parseISO(item.attributes?.updatedAt), "MMMM do, yyyy"),
  }))
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Sensors (${data?.meta?.pagination?.total})`}
          description="Manage Sensors"
        />
        <ModalBtn />
      </div>
      <Separator />
      {data && <DataTable columns={columns} data={formattedData} />}
    </>
  )
}
