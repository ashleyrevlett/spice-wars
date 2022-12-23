import { CityName, GoodType, NumberRange, Position, WeaponType } from "../types"

type Locations = {
  [key in CityName]: {
    position: Position,
    hasBank: boolean,
    hasShop: boolean
  }
}

type Weapon = {
  weaponType: WeaponType
  damage: number,
  price: number,
}

type Goods = {
  [key in GoodType]: {
    quantityRange: NumberRange,
    priceRange: NumberRange,
  }
}

interface Settings {
  startDate: Date,
  maxDays: number,
  cash: number,
  debt: number,
  debtAPR: number,
  inventorySpace: number,
  locations: Locations,
  goods: Goods
  volatility: NumberRange,
  eventChance: number,
  weapons: Weapon[],
  startingHealth: number,
}

const SETTINGS : Settings = {
  startDate: new Date('June 1, 1984 12:01:01'),
  maxDays: 30,
  cash: 100,
  debt: 500,
  debtAPR: 0.005,
  inventorySpace: 500,
  volatility: {
    min: 0.05,
    max: 0.25
  },
  locations: {
    'New York':    { position: { x: 190, y: 50 },  hasBank: true, hasShop: true },
    'Detroit':     { position: { x: 150, y: 40 },  hasBank: false, hasShop: false },
    'Chicago':     { position: { x: 130, y: 50 },  hasBank: true, hasShop: false },
    'St. Louis':   { position: { x: 120, y: 60 },  hasBank: false, hasShop: false },
    'New Orleans': { position: { x: 130, y: 110 }, hasBank: false, hasShop: true },
    'Los Angeles': { position: { x: 20, y: 80 },   hasBank: true, hasShop: true },
  },
  goods: {
    'Hard Candy':     { quantityRange: { min: 600, max: 1200 }, priceRange: { min: 1,   max: 3   } },
    'Jelly Beans':    { quantityRange: { min: 300, max: 900  }, priceRange: { min: 5,   max: 9  } },
    'Gummy Bears':    { quantityRange: { min: 100, max: 500  }, priceRange: { min: 10,  max: 20  } },
    'Lollipops':      { quantityRange: { min: 50,  max: 200  }, priceRange: { min: 15,  max: 25  } },
    'Chocolate Bars': { quantityRange: { min: 10,  max: 50   }, priceRange: { min: 20, max: 40 } },
  },
  eventChance: 0.5,
  weapons: [
    { weaponType: 'Fists', price: 0, damage: 2 },
    { weaponType: 'Pistol', price: 300, damage: 5 },
    { weaponType: 'Shotgun', price: 500, damage: 8 },
    { weaponType: 'Machine Gun', price: 1000, damage: 12 },
  ],
  startingHealth: 12,
}

export default SETTINGS