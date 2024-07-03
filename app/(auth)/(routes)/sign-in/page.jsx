import Link from "next/link"
import SignInForm from "./components/sign-form"

export default function Dashboard() {
  return (
    <div className="w-full h-full lg:grid lg:grid-cols-2">
      <div className="hidden bg-black lg:block">
        <div className="flex items-center justify-center w-full h-full">
          <span className="loader"></span>
        </div>
      </div>
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to login to your account.
            </p>
          </div>
          <SignInForm />
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="#" className="underline">
              contact
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
