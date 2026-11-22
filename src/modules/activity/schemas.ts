import { z } from 'zod'
import { parseMoney } from '@/shared/utils/money'

export const transactionSchema = z.object({
  date: z.iso.date('Choose a date'),
  title: z.string().trim().min(1, 'Enter a title'),
  category: z.string().min(1, 'Choose a category'),
  amount: z
    .string()
    .trim()
    .min(1, 'Enter an amount')
    .transform((value, context) => {
      const amount = parseMoney(value)

      if (amount === null) {
        context.addIssue({ code: 'custom', message: 'Enter an amount like 249,90' })

        return z.NEVER
      }

      if (amount <= 0) {
        context.addIssue({ code: 'custom', message: 'Enter an amount greater than 0' })

        return z.NEVER
      }

      return amount
    }),
})

export type TransactionFormInput = z.input<typeof transactionSchema>

export type TransactionFormValues = z.output<typeof transactionSchema>
