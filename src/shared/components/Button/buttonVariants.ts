import { cva, type VariantProps } from 'class-variance-authority'

export const buttonVariants = cva(
  'inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-md border border-transparent text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:ring-[3px] focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*="size-"])]:size-4',
  {
    variants: {
      variant: {
        // 2px gradient outline (masked ::before). The gradient fill fades in on hover (::after).
        primary:
          'relative isolate border-0 bg-transparent font-semibold text-foreground-strong before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:bg-(image:--primary-gradient) before:p-0.5 before:[mask:linear-gradient(#fff_0_0)_content-box_exclude,linear-gradient(#fff_0_0)] after:pointer-events-none after:absolute after:inset-0 after:-z-10 after:rounded-[inherit] after:bg-(image:--primary-gradient) after:opacity-0 after:transition-opacity after:duration-300 hover:after:opacity-100',
        secondary:
          'rounded-[4px] border-secondary-border bg-secondary text-foreground-strong hover:border-secondary-hover-border hover:bg-secondary-hover',
        link: 'text-link underline-offset-4 hover:underline',
      },
      size: {
        md: 'h-9 px-4',
        lg: 'h-12 px-6',
        icon: 'size-9',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
)

export type ButtonVariantProps = VariantProps<typeof buttonVariants>
