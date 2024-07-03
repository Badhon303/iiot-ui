"use client"

import { request } from "@/services/apiClient"

import { useState } from "react"
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { AlertModal } from "@/components/modals/alert-modal"
import { TypeModal } from "./type-modal"

export const CellAction = ({ data }) => {
  const router = useRouter()
  const { toast } = useToast()
  const [open, setOpen] = useState(false)
  const [typeModalOpen, setTypeModalOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const onConfirm = async () => {
    try {
      setLoading(true)
      await request("DELETE", `/api/sensor-types/${data.id}`)
      toast({
        title: `Sensor-Type Deleted`,
      })
      router.refresh()
    } catch (error) {
      toast({
        variant: "destructive",
        title: `Uh oh! Something went wrong. ${error}`,
        description: "There was a problem with your request.",
      })
    } finally {
      setOpen(false)
      setLoading(false)
    }
  }

  const onCopy = (id) => {
    navigator.clipboard.writeText(id)
    toast({
      title: `Size ID copied to clipboard.`,
    })
  }

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
      />
      <TypeModal
        isOpen={typeModalOpen}
        onClose={() => setTypeModalOpen(false)}
        id={data.id}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => onCopy(data.id)}>
            <Copy className="mr-2 h-4 w-4" /> Copy Id
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTypeModalOpen(true)}>
            <Edit className="mr-2 h-4 w-4" /> Update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="mr-2 h-4 w-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
