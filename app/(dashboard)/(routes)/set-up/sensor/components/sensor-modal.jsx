"use client"

import { request } from "@/services/apiClient"

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"

import { Modal } from "@/components/ui/modal"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button"

import { Check, ChevronsUpDown } from "lucide-react"

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"

const formSchema = z.object({
  sensorName: z.string().min(1).max(100),
  protocolName: z.string().min(1).max(100),
})

export const SensorModal = ({
  isOpen,
  onClose,
  id,
  sensorTypeId,
  protocolId,
}) => {
  const { toast } = useToast()
  const router = useRouter()

  const [open, setOpen] = useState(false)
  const [protocolOpen, setProtocolOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [value, setValue] = useState("")
  const [protocolValue, setProtocolValue] = useState("")
  const [sensorTypeData, setSensorTypeData] = useState([])
  const [protocolData, setProtocolData] = useState([])

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      sensorName: "",
      protocolName: "",
    },
  })

  useEffect(() => {
    const fetchSensor = async () => {
      if (isOpen) {
        setLoading(true)
        try {
          const sensorTypeResponse = sensorTypeId
            ? await request("GET", `/api/sensor-types/${sensorTypeId}`)
            : null
          const protocolResponse = protocolId
            ? await request("GET", `/api/protocols/${protocolId}`)
            : null

          const sensorName = sensorTypeResponse?.data?.attributes?.sensorName
          const protocolName = protocolResponse?.data?.attributes?.protocolName

          setValue(sensorName)
          setProtocolValue(protocolName)

          form.reset({
            sensorName: sensorName || "",
            protocolName: protocolName || "",
          })
        } catch (error) {
          console.log("error: ", error)
          toast({
            variant: "destructive",
            title: `${error}`,
            description: "Unable to load details.",
          })
        } finally {
          setLoading(false)
        }
      }
    }

    fetchSensor()
  }, [form, toast, isOpen, sensorTypeId, protocolId])

  useEffect(() => {
    const fetchSensorType = async () => {
      if (isOpen) {
        setLoading(true)
        try {
          const response = await request("GET", "/api/sensor-types/")
          const formattedSensorTypeData = response.data?.map((item) => ({
            value: item.id,
            label: item.attributes?.sensorName,
          }))
          setSensorTypeData(formattedSensorTypeData)
        } catch (error) {
          toast({
            variant: "destructive",
            title: `${error}`,
            description: "Unable to load Sensor Type Details.",
          })
        } finally {
          setLoading(false)
        }
      }
    }
    const fetchProtocol = async () => {
      if (isOpen) {
        setLoading(true)
        try {
          const response = await request("GET", "/api/protocols/")
          const formattedProtocolData = response.data?.map((item) => ({
            value: item.id,
            label: item.attributes?.protocolName,
          }))
          setProtocolData(formattedProtocolData)
        } catch (error) {
          toast({
            variant: "destructive",
            title: `${error}`,
            description: "Unable to load Protocol Details.",
          })
        } finally {
          setLoading(false)
        }
      }
    }
    fetchSensorType()
    fetchProtocol()
  }, [isOpen, toast])

  const onSubmit = async () => {
    try {
      setLoading(true)
      const sensorTypeId = sensorTypeData.find(
        (category) => category.label === value
      )?.value
      const protocolId = protocolData.find(
        (category) => category.label === protocolValue
      )?.value
      const postValues = {
        sensor_type: {
          connect: [sensorTypeId],
        },
        protocol: {
          connect: [protocolId],
        },
      }
      if (id) {
        await request("PUT", `/api/sensors/${id}`, postValues)
      } else {
        await request("POST", "/api/sensors", postValues)
      }
      router.refresh()
      toast({
        title: `Sensor ${id ? "Updated" : "Created"} successfully`,
        description: "Time date will be updated",
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      })
    } finally {
      setLoading(false)
      onClose()
    }
  }

  return (
    <Modal
      title={`${id ? "Update " : "Create"} a Sensor`}
      description={`${id ? "Update" : "Add"} a new sensor`}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div>
        <div className="space-y-4 py-2 pb-4">
          <div className="space-y-2">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-2"
              >
                <FormField
                  control={form.control}
                  name="sensorName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sensor Type</FormLabel>
                      <FormControl>
                        <Popover open={open} onOpenChange={setOpen}>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              role="combobox"
                              aria-expanded={open}
                              className="w-full justify-between"
                            >
                              {value
                                ? sensorTypeData.find(
                                    (category) => category.label === value
                                  )?.label
                                : "Select Sensor Type..."}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-full p-0">
                            <Command>
                              <CommandInput
                                placeholder="Search Sensor Type..."
                                // {...field}
                              />
                              <CommandList>
                                <CommandEmpty>
                                  No Sensor Type found.
                                </CommandEmpty>
                                <CommandGroup>
                                  {sensorTypeData ? (
                                    sensorTypeData.map((category) => (
                                      <CommandItem
                                        key={category.value}
                                        value={category.label}
                                        onSelect={(currentValue) => {
                                          setValue(
                                            currentValue === value
                                              ? ""
                                              : currentValue
                                          )
                                          form.setValue(
                                            "sensorName",
                                            currentValue === value
                                              ? ""
                                              : currentValue
                                          )
                                          setOpen(false)
                                        }}
                                      >
                                        <Check
                                          className={cn(
                                            "mr-2 h-4 w-4",
                                            value === category.label
                                              ? "opacity-100"
                                              : "opacity-0"
                                          )}
                                        />
                                        {category.label}
                                      </CommandItem>
                                    ))
                                  ) : (
                                    <CommandItem>Loading...</CommandItem>
                                  )}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="protocolName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Protocol</FormLabel>
                      <FormControl>
                        <Popover
                          open={protocolOpen}
                          onOpenChange={setProtocolOpen}
                        >
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              role="combobox"
                              aria-expanded={protocolOpen}
                              className="w-full justify-between"
                            >
                              {protocolValue
                                ? protocolData.find(
                                    (category) =>
                                      category.label === protocolValue
                                  )?.label
                                : "Select Protocol Type..."}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-full p-0">
                            <Command>
                              <CommandInput placeholder="Search Protocol Type..." />
                              <CommandList>
                                <CommandEmpty>No Protocol found.</CommandEmpty>
                                <CommandGroup>
                                  {protocolData ? (
                                    protocolData.map((category) => (
                                      <CommandItem
                                        key={category.value}
                                        value={category.label}
                                        onSelect={(currentValue) => {
                                          setProtocolValue(
                                            currentValue === protocolValue
                                              ? ""
                                              : currentValue
                                          )
                                          form.setValue(
                                            "protocolName",
                                            currentValue === protocolValue
                                              ? ""
                                              : currentValue
                                          )
                                          setProtocolOpen(false)
                                        }}
                                      >
                                        <Check
                                          className={cn(
                                            "mr-2 h-4 w-4",
                                            protocolValue === category.label
                                              ? "opacity-100"
                                              : "opacity-0"
                                          )}
                                        />
                                        {category.label}
                                      </CommandItem>
                                    ))
                                  ) : (
                                    <CommandItem>Loading...</CommandItem>
                                  )}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                  <Button
                    disabled={loading}
                    variant="outline"
                    onClick={onClose}
                    type="button"
                  >
                    Cancel
                  </Button>
                  <Button disabled={loading} type="submit">
                    {loading ? (
                      <span className="spinner"></span>
                    ) : id ? (
                      "Update"
                    ) : (
                      "Create"
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </Modal>
  )
}
