import { cva, type VariantProps } from 'class-variance-authority'
import type { ReactNode } from 'react'
import { Text } from '@/shared/components/Text/Text'

const iconVariants = cva(
  'flex size-12 shrink-0 items-center justify-center rounded-full [&>svg]:size-6',
  {
    variants: {
      tone: {
        default: 'bg-muted text-muted-foreground',
        success: 'bg-success/15 text-success',
        destructive: 'bg-destructive/15 text-destructive',
      },
    },
    defaultVariants: {
      tone: 'default',
    },
  },
)

interface FileUploadContentProps extends VariantProps<typeof iconVariants> {
  icon: ReactNode
  title: string
  description?: ReactNode
  children?: ReactNode
}

export const FileUploadContent = ({
  icon,
  tone,
  title,
  description,
  children,
}: FileUploadContentProps) => {
  return (
    <>
      <span className={iconVariants({ tone })}>{icon}</span>
      <div className="flex w-full flex-col items-center gap-1">
        <Text weight="medium" color="strong" className="max-w-full truncate" title={title}>
          {title}
        </Text>
        {description}
      </div>
      {children}
    </>
  )
}
