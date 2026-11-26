import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { Input } from '@/shared/components/Input/Input'
import { Text } from '@/shared/components/Text/Text'
import { formatMoneyInput } from '@/shared/utils/money'
import { shoppingListCurrency } from '../../constants'
import {
  shoppingListItemSchema,
  type ShoppingListItemFormInput,
  type ShoppingListItemFormValues,
} from '../../schemas'
import type { ShoppingListItem, ShoppingListItemDetails } from '../../types'

interface ShoppingListItemFormProps {
  id: string
  item: ShoppingListItem | null
  onSubmit: (details: ShoppingListItemDetails) => void
}

export const ShoppingListItemForm = ({ id, item, onSubmit }: ShoppingListItemFormProps) => {
  const currency = item?.currency ?? shoppingListCurrency
  const form = useForm<ShoppingListItemFormInput, unknown, ShoppingListItemFormValues>({
    resolver: zodResolver(shoppingListItemSchema),
    defaultValues: {
      name: item?.name ?? '',
      quantity: String(item?.quantity ?? 1),
      usualPrice: item && item.usualPrice !== null ? formatMoneyInput(item.usualPrice) : '',
    },
  })

  return (
    <form id={id} noValidate onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <Text size="sm" color="muted">
        We look for this item in this week's flyers. When there's no deal, we use your usual price
        for the total.
      </Text>
      <Controller
        name="name"
        control={form.control}
        render={({ field: { ref, name, value, onBlur, onChange }, fieldState: { error } }) => (
          <Input
            ref={ref}
            label="Item"
            name={name}
            value={value}
            onBlur={onBlur}
            onValueChange={onChange}
            placeholder="Coffee"
            autoComplete="off"
            errorMessage={error?.message}
          />
        )}
      />
      <Controller
        name="quantity"
        control={form.control}
        render={({ field: { ref, name, value, onBlur, onChange }, fieldState: { error } }) => (
          <Input
            ref={ref}
            label="Quantity"
            name={name}
            value={value}
            onBlur={onBlur}
            onValueChange={onChange}
            inputMode="numeric"
            autoComplete="off"
            className="tabular-nums"
            errorMessage={error?.message}
          />
        )}
      />
      <Controller
        name="usualPrice"
        control={form.control}
        render={({ field: { ref, name, value, onBlur, onChange }, fieldState: { error } }) => (
          <Input
            ref={ref}
            label={`Usual price per item (${currency}, optional)`}
            name={name}
            value={value}
            onBlur={onBlur}
            onValueChange={onChange}
            placeholder="54,90"
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
