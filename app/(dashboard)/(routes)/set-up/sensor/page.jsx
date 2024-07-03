import { Suspense } from "react"
import { ErrorBoundary } from "react-error-boundary"
import SensorClient from "./components/client"

export default async function RawPage() {
  return (
    <div className="p-6 bg-background rounded-3xl mb-2 shadow-basic space-y-2">
      <ErrorBoundary
        fallback={
          <div className="flex w-full items-center justify-center">
            Something went wrong 😥🙃
          </div>
        }
      >
        <Suspense
          fallback={
            <div className="flex w-full items-center justify-center">
              <span className="loader2"></span>
            </div>
          }
        >
          <SensorClient />
        </Suspense>
      </ErrorBoundary>
    </div>
  )
}
