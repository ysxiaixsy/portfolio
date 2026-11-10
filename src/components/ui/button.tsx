import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

// Pixel buttons: filled and outline variants sit in a notched pixel frame,
// and a press drops the button one art pixel. Hover is the accent signal on
// every variant (see AGENTS.md); focus is the global square outline.
const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center text-sm whitespace-nowrap transition-[color,background-color,box-shadow] duration-150 ease-pixel outline-none select-none motion-reduce:transition-none active:not-aria-[haspopup]:translate-y-(--pixel) disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        // The frame takes the fill colour, so the button reads as one block.
        default:
          "pixel-frame bg-primary text-primary-foreground [--frame-color:var(--primary)] hover:bg-highlight hover:text-highlight-foreground hover:[--frame-color:var(--highlight)]",
        outline:
          "pixel-frame bg-background hover:text-highlight hover:[--frame-color:var(--highlight)] aria-expanded:text-highlight",
        secondary:
          "pixel-frame bg-secondary text-secondary-foreground [--frame-color:var(--secondary)] hover:text-highlight",
        ghost: "hover:text-highlight aria-expanded:text-highlight",
        destructive:
          "pixel-frame bg-destructive/10 text-destructive [--frame-color:var(--destructive)]",
        link: "text-primary underline decoration-2 underline-offset-4 hover:text-highlight",
      },
      size: {
        default:
          "h-8 gap-2 px-3 has-data-[icon=inline-end]:pr-2.5 has-data-[icon=inline-start]:pl-2.5",
        xs: "h-6 gap-1.5 px-2 text-xs has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-7 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        lg: "h-10 gap-2 px-4 text-base has-data-[icon=inline-end]:pr-3.5 has-data-[icon=inline-start]:pl-3.5 [&_svg:not([class*='size-'])]:size-5",
        icon: "size-8",
        "icon-xs": "size-6 [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-7",
        "icon-lg": "size-10 [&_svg:not([class*='size-'])]:size-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      // nativeButton={false} renders a link here (an <a> or Link in
      // `render`). Base UI gives it role="button"; keep it a link for
      // assistive tech.
      role={props.nativeButton === false ? "link" : undefined}
      {...props}
    />
  )
}

export { Button, buttonVariants }
