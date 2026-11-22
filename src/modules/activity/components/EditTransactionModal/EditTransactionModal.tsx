import { useId } from 'react'
import { Button } from '@/shared/components/Button/Button'
import { Modal } from '@/shared/components/Modal/Modal'
import { ModalClose } from '@/shared/components/Modal/ModalClose'
import type { Transaction, TransactionDetails } from '../../types'
import { TransactionForm } from '../TransactionForm/TransactionForm'

interface EditTransactionModalProps {
  transaction: Transaction | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (id: string, details: TransactionDetails) => void
}

export const EditTransactionModal = ({
  transaction,
  open,
  onOpenChange,
  onSave,
}: EditTransactionModalProps) => {
  const formId = useId()

  return (
    <Modal
      title="Edit transaction"
      open={open}
      onOpenChange={onOpenChange}
      actions={
        <>
          <ModalClose>Cancel</ModalClose>
          <Button type="submit" form={formId} variant="solid" disabled={false}>
            Save
          </Button>
        </>
      }
    >
      {transaction && (
        <TransactionForm
          key={transaction.id}
          id={formId}
          transaction={transaction}
          onSubmit={(details) => onSave(transaction.id, details)}
        />
      )}
    </Modal>
  )
}
