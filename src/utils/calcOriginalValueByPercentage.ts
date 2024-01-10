export const calcOriginalValueByPercentage = (
  discountedValue: number,
  discountPercentage: number
) => {
  const originalValue = discountedValue / (1 - discountPercentage / 100)
  return Number(originalValue).toFixed(0)
}
