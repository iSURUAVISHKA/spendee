import { Button } from '@/shared/components/Button/Button'
import { Modal } from '@/shared/components/Modal/Modal'
import { ModalClose } from '@/shared/components/Modal/ModalClose'
import { Text } from '@/shared/components/Text/Text'
import type { ShoppingListItem } from '../../types'

interface DeleteShoppingListItemModalProps {
  item: ShoppingListItem | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: (id: string) => void
}

export const DeleteShoppingListItemModal = ({
  item,
  open,
  onOpenChange,
  onConfirm,
}: DeleteShoppingListItemModalProps) => {
  return (
    <Modal
      title="Delete item?"
      open={open}
      onOpenChange={onOpenChange}
      actions={
        <>
          <ModalClose>Cancel</ModalClose>
          <Button variant="destructive" disabled={false} onClick={() => item && onConfirm(item.id)}>
            Delete
          </Button>
        </>
      }
    >
      {item && (
        <Text>
          Delete{' '}
          <Text render={<span />} weight="semibold" color="strong">
            {item.name}
          </Text>{' '}
          from your shopping list?
        </Text>
      )}
    </Modal>
  )
}
