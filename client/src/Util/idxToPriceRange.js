export const arrPriceRanges = [
    "0-1000",
    "1000-5000",
    "5000-15000",
    "15000-50000",
    "50000-100000", 
    "100000-500000", 
]

export const priceRangeToIndex = (priceRange) => {
   const index = arrPriceRanges.findIndex(priceRg => priceRg === priceRange)

   return index
}