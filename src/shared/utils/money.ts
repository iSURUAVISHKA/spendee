interface FormatMoneyOptions {
  currency?: string
  decimals?: 'auto' | 'always' | 'never'
  showCurrency?: boolean
}

export const formatMoney = (
  amountMinor: number,
  { currency = 'SEK', decimals = 'auto', showCurrency = true }: FormatMoneyOptions = {},
) => {
  const hideDecimals = decimals === 'never' || (decimals === 'auto' && amountMinor % 100 === 0)
  const fractionDigits = hideDecimals ? 0 : 2

  return new Intl.NumberFormat('sv-SE', {
    style: showCurrency ? 'currency' : 'decimal',
    currency,
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(amountMinor / 100)
}
