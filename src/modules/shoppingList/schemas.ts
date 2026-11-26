import { z } from 'zod'
import { parseMoney } from '@/shared/utils/money'

export const shoppingListItemSchema = z.object({
  name: z.string().trim().min(1, 'Enter an item').max(60, 'Use 60 characters or fewer'),
  quantity: z
    .string()
    .trim()
    .min(1, 'Enter a quantity')
    .transform((value, context) => {
      const quantity = Number(value)

      if (!/^\d+$/.test(value) || quantity < 1 || quantity > 99) {
        context.addIssue({ code: 'custom', message: 'Enter a whole number from 1 to 99' })

        return z.NEVER
      }

      return quantity
    }),
  usualPrice: z
    .string()
    .trim()
    .transform((value, context) => {
      if (value === '') return null

      const price = parseMoney(value)

      if (price === null) {
        context.addIssue({ code: 'custom', message: 'Enter a price like 29,90' })

        return z.NEVER
      }

      if (price <= 0) {
        context.addIssue({ code: 'custom', message: 'Enter a price greater than 0' })

        return z.NEVER
      }

      return price
    }),
})

export type ShoppingListItemFormInput = z.input<typeof shoppingListItemSchema>

export type ShoppingListItemFormValues = z.output<typeof shoppingListItemSchema>
