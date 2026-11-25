import CompleteIcon from '@/shared/assets/icon/Complete.svg?react'
import PlusIcon from '@/shared/assets/icon/Plus.svg?react'
import { Button } from '@/shared/components/Button/Button'

interface AddToShoppingListButtonProps {
  productName: string
  isAdded: boolean
  onAdd: () => void
  className?: string
}

export const AddToShoppingListButton = ({
  productName,
  isAdded,
  onAdd,
  className,
}: AddToShoppingListButtonProps) => {
  return (
    <Button
      variant="secondary"
      disabled={isAdded}
      focusableWhenDisabled
      onClick={onAdd}
      className={className}
    >
      {isAdded ? (
        <>
          <CompleteIcon aria-hidden />
          Added
        </>
      ) : (
        <>
          <PlusIcon aria-hidden />
          Add
        </>
      )}
      <span className="sr-only"> {productName} to shopping list</span>
    </Button>
  )
}
