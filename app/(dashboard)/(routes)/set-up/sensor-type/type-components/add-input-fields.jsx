"use client"

import { useState } from "react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { FaRegTrashCan } from "react-icons/fa6"

export default function AddDynamicInputFields() {
  const [inputs, setInputs] = useState([{ inputName: "", inputValue: "" }])

  const handleAddInput = () => {
    setInputs([...inputs, { inputName: "", inputValue: "" }])
  }

  const handleChange = (event, index) => {
    let { name, value } = event.target
    let onChangeValue = [...inputs]
    onChangeValue[index][name] = value
    setInputs(onChangeValue)
  }

  const handleDeleteInput = (index) => {
    const newArray = [...inputs]
    newArray.splice(index, 1)
    setInputs(newArray)
  }

  return (
    <div className="flex flex-col justify-center">
      {inputs.map((item, index) => (
        <div className="flex mt-3 gap-3" key={index}>
          <Input
            name="inputName"
            type="text"
            placeholder="Input Name"
            value={item.inputName}
            onChange={(event) => handleChange(event, index)}
          />
          <Input
            name="inputValue"
            type="text"
            placeholder="Input Value"
            value={item.inputValue}
            onChange={(event) => handleChange(event, index)}
          />
          {inputs.length > 1 && (
            <Button onClick={() => handleDeleteInput(index)}>
              <FaRegTrashCan />
            </Button>
          )}
          {index === inputs.length - 1 && (
            <Button onClick={() => handleAddInput()}>+</Button>
          )}
        </div>
      ))}

      <div> {JSON.stringify(inputs)} </div>
    </div>
  )
}
