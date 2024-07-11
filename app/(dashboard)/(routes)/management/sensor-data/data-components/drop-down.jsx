"use client"

import { useState, useEffect } from "react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { FaAngleDown } from "react-icons/fa"

import { Separator } from "@/components/ui/separator"

import { columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"

export function Dropdown({ data }) {
  const [position, setPosition] = useState("")
  const [sensorData, setSensorData] = useState({})
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (position) {
          const response = await fetch(`/api/sensor/${position}`)
          const parsedData = await response.json()
          console.log("parsedData: ", parsedData.data)
          setSensorData(parsedData.data)
        }
      } catch (error) {
        throw new Error(`data error: ${error}`)
      }
    }
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [position])
  return (
    <>
      <div className="flex items-center justify-between">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              {position === "" ? "Select Hardware ID" : position}{" "}
              <span className="ps-2">
                <FaAngleDown />
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup
              value={position}
              onValueChange={setPosition}
            >
              {data.map((item) => (
                <DropdownMenuRadioItem key={item.id} value={item.hardware_id}>
                  {item.hardware_id}
                </DropdownMenuRadioItem>
              ))}
              {/* <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="bottom">Bottom</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="right">Right</DropdownMenuRadioItem> */}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Separator />
      {data && <DataTable columns={columns} data={[sensorData]} />}
    </>
  )
}
