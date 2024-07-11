// import { format, parseISO } from "date-fns"
import {
  getSensorDropDownData,
  getSensorDataById,
} from "@/actions/sensor-actions"

import { Dropdown } from "./drop-down"
// import { columns } from "./columns"
// import { DataTable } from "@/components/ui/data-table"

export default async function TypeClient() {
  const data = await getSensorDropDownData()
  //   const dataID = await getSensorDataById()
  //   console.log("dataID: ", dataID)
  const formattedDropDownData = data.map((item) => ({
    id: item.id,
    hardware_id: item.hardware_id,
  }))
  return (
    <Dropdown data={formattedDropDownData} />
    //   {/* <Separator /> */}
    //   {/* {data && <DataTable columns={columns} data={formattedData} />} */}
  )
}
