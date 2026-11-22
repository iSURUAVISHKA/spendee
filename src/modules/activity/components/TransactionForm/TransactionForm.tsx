import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { DatePicker } from '@/shared/components/DatePicker/DatePicker'
import { Input } from '@/shared/components/Input/Input'
import { Select } from '@/shared/components/Select/Select'
import { formatMoneyInput } from '@/shared/utils/money'
import { categoryOptions } from '../../constants'
import {
  transactionSchema,
  type TransactionFormInput,
  type TransactionFormValues,
} from '../../schemas'
import type { Transaction, TransactionDetails } from '../../types'

interface TransactionFormProps {
  id: string
  transaction: Transaction
  onSubmit: (details: TransactionDetails) => void
}

export const TransactionForm = ({ id, transaction, onSubmit }: TransactionFormProps) => {
  const form = useForm<TransactionFormInput, unknown, TransactionFormValues>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      date: transaction.date,
      title: transaction.title,
      category: transaction.category,
      amount: formatMoneyInput(transaction.amount),
    },
  })

  return (
    <form id={id} noValidate onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <Controller
        name="date"
        control={form.control}
        render={({ field: { ref, value, onChange }, fieldState: { error } }) => (
          <DatePicker
            ref={ref}
            label="Date"
            value={value}
            onValueChange={onChange}
            errorMessage={error?.message}
          />
        )}
      />
      <Controller
        name="title"
        control={form.control}
        render={({ field: { ref, name, value, onBlur, onChange }, fieldState: { error } }) => (
          <Input
            ref={ref}
            label="Title"
            name={name}
            value={value}
            onBlur={onBlur}
            onValueChange={onChange}
            autoComplete="off"
            errorMessage={error?.message}
          />
        )}
      />
      <Controller
        name="category"
        control={form.control}
        render={({ field: { ref, name, value, onChange }, fieldState: { error } }) => (
          <Select
            ref={ref}
            label="Category"
            name={name}
            options={categoryOptions}
            value={value}
            onValueChange={onChange}
            placeholder="Select a category"
            errorMessage={error?.message}
          />
        )}
      />
      <Controller
        name="amount"
        control={form.control}
        render={({ field: { ref, name, value, onBlur, onChange }, fieldState: { error } }) => (
          <Input
            ref={ref}
            label={`Amount (${transaction.currency})`}
            name={name}
            value={value}
            onBlur={onBlur}
            onValueChange={onChange}
            inputMode="decimal"
            autoComplete="off"
            className="tabular-nums"
            errorMessage={error?.message}
          />
        )}
      />
    </form>
  )
}
