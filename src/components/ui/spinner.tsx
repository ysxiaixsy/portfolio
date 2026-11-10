import { cn } from "cn"
import { LoaderIcon } from "@/components/pixel-icons"

function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <LoaderIcon data-slot="spinner" role="status" aria-label="Loading" aria-hidden={false} className={cn("size-4 animate-spin [animation-timing-function:steps(8)]", className)} {...props} />
  )
}

export { Spinner }
