import { useId } from 'react'
import { Button } from '@/shared/components/Button/Button'
import { Modal } from '@/shared/components/Modal/Modal'
import { ModalClose } from '@/shared/components/Modal/ModalClose'
import type { ShoppingListItem, ShoppingListItemDetails } from '../../types'
import { ShoppingListItemForm } from '../ShoppingListItemForm/ShoppingListItemForm'

interface ShoppingListItemModalProps {
  item: ShoppingListItem | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (details: ShoppingListItemDetails) => void
}

export const ShoppingListItemModal = ({
  item,
  open,
  onOpenChange,
  onSave,
}: ShoppingListItemModalProps) => {
  const formId = useId()

  return (
    <Modal
      title={item ? 'Edit item' : 'Add item'}
      open={open}
      onOpenChange={onOpenChange}
      actions={
        <>
          <ModalClose>Cancel</ModalClose>
          <Button type="submit" form={formId} variant="solid" disabled={false}>
            {item ? 'Save' : 'Add'}
          </Button>
        </>
      }
    >
      <ShoppingListItemForm key={item?.id ?? 'new'} id={formId} item={item} onSubmit={onSave} />
    </Modal>
  )
}
