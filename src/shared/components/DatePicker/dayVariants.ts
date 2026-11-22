import { cva } from 'class-variance-authority'

export const dayVariants = cva(
  'flex size-9 cursor-pointer items-center justify-center rounded-md text-sm tabular-nums outline-none select-none focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-disabled:pointer-events-none aria-disabled:opacity-40',
  {
    variants: {
      state: {
        default: String.raw`text-foreground hover:bg-secondary-hover hover:text-foreground-strong [&.react-datepicker\_\_day--outside-month]:text-muted-foreground`,
        today: 'font-semibold text-link hover:bg-secondary-hover hover:text-foreground-strong',
        selected: 'bg-primary font-semibold text-foreground-strong hover:bg-primary/90',
      },
    },
    defaultVariants: {
      state: 'default',
    },
  },
)
