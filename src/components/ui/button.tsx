import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-button hover:-translate-y-0.5 rounded-full font-medium",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-full",
        outline: "border border-border bg-background hover:bg-muted text-foreground rounded-full",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-full",
        ghost: "hover:bg-muted hover:text-foreground rounded-full",
        link: "text-primary underline-offset-4 hover:underline",
        converter: "bg-card text-foreground border border-border hover:border-primary/50 hover:bg-muted/50 transition-all duration-200 shadow-sm hover:-translate-y-0.5 rounded-xl font-medium text-xs md:text-sm",
        converterActive: "bg-primary text-white shadow-button border border-primary font-semibold rounded-xl hover:opacity-95 text-xs md:text-sm",
        action: "bg-background text-foreground border border-border hover:border-foreground/30 hover:bg-muted transition-all duration-200 shadow-sm hover:-translate-y-0.5 rounded-full font-medium text-xs md:text-sm",
      },
      size: {
        default: "h-11 px-6 py-2 rounded-full",
        sm: "h-8 rounded-full px-3 text-xs",
        lg: "h-13 rounded-full px-8 text-base",
        icon: "h-10 w-10 rounded-full",
        converter: "h-9 px-3.5 py-1.5 font-medium tracking-normal",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
