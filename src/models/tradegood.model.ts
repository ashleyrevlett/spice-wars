import { GoodType, CityName } from '../types'
import SETTINGS from '../settings'

export interface TradeGood {
  id: string
  price: number
  quantity: number
  goodType: GoodType
  location?: CityName
}

export function calculatePrice(goodType: GoodType, qty: number) : number {
  const priceRange = SETTINGS.goods[goodType].priceRange
  const quantityRange = SETTINGS.goods[goodType].quantityRange
  const oldRange = (quantityRange.max - quantityRange.min)
  const newRange = (priceRange.max - priceRange.min)
  let price = (((qty - quantityRange.min) * newRange) / oldRange) + priceRange.min
  price = priceRange.max - price + priceRange.min
  return Number(price.toFixed(2))
}

function getRandomQty(goodType: GoodType) : number  {
  const quantityRange = SETTINGS.goods[goodType].quantityRange
  return Math.floor(Math.random() * (quantityRange.max - quantityRange.min + 1)) + quantityRange.min
}

export function generateStartingData(id: string, goodType: GoodType, location?: CityName): TradeGood {
  const qty = getRandomQty(goodType)
  const price = calculatePrice(goodType, qty)
  return {
    id: id,
    quantity: qty,
    goodType: goodType,
    location: location,
    price: price,
  }
}

export function getUpdatedQuantity(goodType: GoodType, quantity: number) {
    // semi-randomize quantity
    const quantityRange = SETTINGS.goods[goodType].quantityRange
    const plusOrMinus = Math.random() < 0.5 ? -1 : 1
    const percentChange = (Math.random() * (SETTINGS.volatility.max - SETTINGS.volatility.min) + SETTINGS.volatility.min) * plusOrMinus
    quantity += Math.floor(quantity * percentChange)
    quantity = Math.min( Math.max(quantityRange.min, quantity), quantityRange.max)
    return quantity
}