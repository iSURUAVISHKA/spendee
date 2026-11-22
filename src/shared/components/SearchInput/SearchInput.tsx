import { Input as BaseInput } from '@base-ui/react/input'
import { useRef, useState } from 'react'
import CloseIcon from '@/shared/assets/icon/Close.svg?react'
import SearchIcon from '@/shared/assets/icon/Search.svg?react'
import { Button } from '@/shared/components/Button/Button'
import { inputClassName } from '@/shared/components/Input/constants'
import { cn } from '@/shared/utils/cn'
import type { SearchInputProps } from './types'

export const SearchInput = ({
  'aria-label': ariaLabel = 'Search',
  defaultValue = '',
  onValueChange,
  onClear,
  className,
  ...props
}: SearchInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [value, setValue] = useState(defaultValue)

  const handleValueChange: SearchInputProps['onValueChange'] = (nextValue, eventDetails) => {
    setValue(nextValue)
    onValueChange?.(nextValue, eventDetails)
  }

  const handleClear = () => {
    setValue('')
    onClear?.()
    inputRef.current?.focus()
  }

  return (
    <div className={cn('relative', className)}>
      <SearchIcon
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
      />
      <BaseInput
        ref={inputRef}
        type="search"
        aria-label={ariaLabel}
        value={value}
        onValueChange={handleValueChange}
        className={cn(
          inputClassName,
          'pr-10 pl-9 [&::-webkit-search-cancel-button]:appearance-none',
        )}
        {...props}
      />
      {value && (
        <Button
          variant="ghost"
          size="icon"
          disabled={Boolean(props.disabled)}
          aria-label="Clear search"
          className="absolute top-1 right-1 size-8"
          onClick={handleClear}
        >
          <CloseIcon aria-hidden />
        </Button>
      )}
    </div>
  )
}
