"use client"

import { request } from "@/services/apiClient"

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useToast } from "@/components/ui/use-toast"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

import { Modal } from "@/components/ui/modal"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
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

import { FaRegTrashCan } from "react-icons/fa6"
import { MdAdd } from "react-icons/md"
import { FaAngleDown } from "react-icons/fa"

const formSchema = z.object({
  sensorType: z.string().min(1).max(100),
  hardwareId: z.string().min(1).max(100),
  hardwareNickname: z.string().min(1).max(100),
  targetTableName: z.string().min(1).max(100),
})

export const TypeModal = ({ isOpen, onClose, id }) => {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      sensorType: "",
      hardwareId: "",
      hardwareNickname: "",
      targetTableName: "",
      sensorInput: {},
    },
  })

  const [inputs, setInputs] = useState([{ inputName: "", inputValue: "TEXT" }])

  const handleAddInput = () => {
    setInputs([...inputs, { inputName: "", inputValue: "TEXT" }])
  }

  const handleChange = (event, index) => {
    let { name, value } = event.target || {}
    // Handle case where event might not have target or target properties
    if (!name) {
      name = "inputValue"
    }
    if (!value) {
      value = event // in case the value is directly passed as in DropdownMenuRadioGroup
    }
    let onChangeValue = [...inputs]
    onChangeValue[index][name] = value
    setInputs(onChangeValue)
  }

  const handleDeleteInput = (index) => {
    const newArray = [...inputs]
    newArray.splice(index, 1)
    setInputs(newArray)
  }

  function transformObject(obj) {
    let newSensorInput = {}

    obj.sensorInput.forEach((input) => {
      newSensorInput[input.inputName] = input.inputValue
    })

    return {
      sensor_type: obj.sensorType,
      hardware_id: obj.hardwareId,
      hardware_nickname: obj.hardwareNickname,
      target_table_name: obj.targetTableName,
      columns: newSensorInput,
    }
  }

  useEffect(() => {
    const fetchType = async () => {
      if (id !== "" && isOpen) {
        try {
          setLoading(true)
          const response = await request("GET", `/api/sensor-types/${id}`)
          const typeData = response.data?.attributes
          form.reset({ sensorName: typeData.sensorName })
        } catch (error) {
          console.log("error: ", error)
          toast({
            variant: "destructive",
            title: `${error}`,
            description: "Unable to load Product Type details.",
          })
        } finally {
          setLoading(false)
        }
      }
    }

    fetchType()
  }, [id, form, toast, isOpen])

  const onSubmit = async (values) => {
    values.sensorInput = inputs
    let transformedObj = transformObject(values)
    try {
      setLoading(true)
      if (id) {
        await request("PUT", `/api/sensor-types/${id}`, transformedObj)
      } else {
        // await request("POST", "/api/v1/sensor/type/create", transformedObj)
        await fetch("http://15.207.41.236:3001/api/v1/sensor/type/create", {
          method: "POST", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(transformedObj), // The data to send in the request body
        })
      }
      router.refresh()
      toast({
        title: `Product Type ${id ? "Updated" : "Created"} successfully`,
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
      title={`${id ? "Update " : "Create"} a Sensor Type`}
      description={`${id ? "Update" : "Add"} a new Sensor Type.`}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div>
        <div className="space-y-4 py-2 pb-4">
          <div className="space-y-2">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="sensorType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sensor Type</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder="Sensor Type"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="hardwareId"
                  render={({ field }) => (
                    <FormItem className="mt-2">
                      <FormLabel>Hardware Id</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder="Hardware Id"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="hardwareNickname"
                  render={({ field }) => (
                    <FormItem className="mt-2">
                      <FormLabel>Hardware Nickname</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder="Hardware Nickname"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="targetTableName"
                  render={({ field }) => (
                    <FormItem className="mt-2">
                      <FormLabel>Target Table Name</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder="Target Table Name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="max-h-72 mt-1 px-2 overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-400">
                  <div className="flex flex-col justify-center">
                    {inputs.map((item, index) => (
                      <div className="flex mt-3 mb-1 gap-3" key={index}>
                        <Input
                          name="inputName"
                          type="text"
                          placeholder="Input Name"
                          value={item.inputName}
                          onChange={(event) => handleChange(event, index)}
                        />
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline">
                              {item.inputValue === "TEXT"
                                ? "TEXT"
                                : item.inputValue === "DOUBLE(10,2)"
                                ? "DECIMAL"
                                : item.inputValue === "VARCHAR(255)"
                                ? "ALPHANUMERIC"
                                : ""}
                              <span className="ps-2">
                                <FaAngleDown />
                              </span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="w-56">
                            <DropdownMenuLabel>Type</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuRadioGroup
                              value={item.inputValue}
                              onValueChange={(value) =>
                                handleChange(
                                  { target: { name: "inputValue", value } },
                                  index
                                )
                              }
                            >
                              <DropdownMenuRadioItem value="VARCHAR(255)">
                                ALPHANUMERIC
                              </DropdownMenuRadioItem>
                              <DropdownMenuRadioItem value="DOUBLE(10,2)">
                                DECIMAL
                              </DropdownMenuRadioItem>
                              <DropdownMenuRadioItem value="TEXT">
                                TEXT
                              </DropdownMenuRadioItem>
                            </DropdownMenuRadioGroup>
                          </DropdownMenuContent>
                        </DropdownMenu>
                        {inputs.length > 1 && (
                          <Button onClick={() => handleDeleteInput(index)}>
                            <FaRegTrashCan />
                          </Button>
                        )}
                        {index === inputs.length - 1 && (
                          <Button onClick={() => handleAddInput()}>
                            <MdAdd className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
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
