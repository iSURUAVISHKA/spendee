import { cva, type VariantProps } from 'class-variance-authority'

export const tabsListVariants = cva('flex', {
  variants: {
    variant: {
      card: 'gap-4',
      underline: 'gap-6 border-b border-border',
    },
  },
  defaultVariants: {
    variant: 'card',
  },
})

export const tabsTabVariants = cva(
  'cursor-pointer transition-colors outline-none select-none focus-visible:ring-[3px] focus-visible:ring-ring/50 data-disabled:pointer-events-none data-disabled:opacity-50',
  {
    variants: {
      variant: {
        card: 'flex flex-col items-start gap-1 rounded-md border border-muted bg-card p-4 text-left text-foreground hover:bg-muted/40 data-active:border-primary data-active:bg-muted/40 lg:p-6',
        underline:
          'relative -mb-px inline-flex h-10 items-center rounded-sm text-sm font-medium text-muted-foreground after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:rounded-full after:bg-(image:--primary-gradient) after:opacity-0 after:transition-opacity hover:text-foreground-strong data-active:text-foreground-strong data-active:after:opacity-100',
      },
    },
    defaultVariants: {
      variant: 'card',
    },
  },
)

export type TabsListVariantProps = VariantProps<typeof tabsListVariants>

export type TabsTabVariantProps = VariantProps<typeof tabsTabVariants>
