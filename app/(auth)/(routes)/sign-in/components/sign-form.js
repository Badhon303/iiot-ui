"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { Eye, EyeOff } from "lucide-react"

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { useState } from "react"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

const formSchema = z.object({
  identifier: z.string().min(3),
  password: z.string().min(6),
})

const SignInForm = () => {
  const { toast } = useToast()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [type, setType] = useState("password")

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  })

  const onSubmit = async (values) => {
    try {
      setLoading(true)
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
      const data = await response.json()
      if (data.error) {
        throw new Error(data.error?.message)
      } else {
        router.push("/dashboard")
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: `There was a problem with your Login request. (${error})`,
      })
    } finally {
      setLoading(false)
    }
  }

  const handleToggle = () => {
    if (type === "password") {
      setType("text")
    } else {
      setType("password")
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="identifier"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email or Name *</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="alam@iiot.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center">
                    <FormLabel>Password *</FormLabel>
                  </div>
                  <FormControl>
                    <div className="relative">
                      <Input
                        disabled={loading}
                        type={type}
                        placeholder={`******`}
                        {...field}
                      />
                      <span
                        className="flex absolute right-4 top-2 justify-around items-center"
                        onClick={handleToggle}
                      >
                        {type === "password" ? (
                          <EyeOff color="#64748b" />
                        ) : (
                          <Eye color="#64748b" />
                        )}
                      </span>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} type="submit" className="w-full">
            {loading ? <span className="spinner"></span> : "Login"}
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default SignInForm
