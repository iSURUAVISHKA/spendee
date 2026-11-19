import { useRender } from '@base-ui/react/use-render'
import { cn } from '@/shared/utils/cn'

// Every part takes Base UI's render prop to swap its element: <CardTitle render={<h1 />}>.

export const Card = ({ render, className, ...props }: useRender.ComponentProps<'div'>) => {
  return useRender({
    defaultTagName: 'div',
    render,
    props: {
      ...props,
      className: cn(
        'flex flex-col gap-6 rounded-xl border border-card-border bg-card p-6 text-card-foreground',
        className,
      ),
    },
  })
}

export const CardHeader = ({ render, className, ...props }: useRender.ComponentProps<'div'>) => {
  return useRender({
    defaultTagName: 'div',
    render,
    props: { ...props, className: cn('flex flex-col gap-1', className) },
  })
}

export const CardTitle = ({ render, className, ...props }: useRender.ComponentProps<'h3'>) => {
  return useRender({
    defaultTagName: 'h3',
    render,
    props: { ...props, className: cn('text-lg leading-tight font-semibold', className) },
  })
}

export const CardDescription = ({ render, className, ...props }: useRender.ComponentProps<'p'>) => {
  return useRender({
    defaultTagName: 'p',
    render,
    props: { ...props, className: cn('text-sm text-muted-foreground', className) },
  })
}

export const CardContent = ({ render, className, ...props }: useRender.ComponentProps<'div'>) => {
  return useRender({
    defaultTagName: 'div',
    render,
    props: { ...props, className },
  })
}

export const CardFooter = ({ render, className, ...props }: useRender.ComponentProps<'div'>) => {
  return useRender({
    defaultTagName: 'div',
    render,
    props: { ...props, className: cn('flex items-center gap-2', className) },
  })
}
