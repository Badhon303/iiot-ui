import { Suspense } from "react"
import { ErrorBoundary } from "react-error-boundary"
import DataClient from "./data-components/client"

export default async function TypePage() {
  return (
    <>
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
            <DataClient />
          </Suspense>
        </ErrorBoundary>
      </div>
    </>
  )
}
