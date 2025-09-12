import { CartItem } from "./product"
export interface Order {
    id: string
    user: string
    status: string
    first_name: string
    last_name: string
    address_line: string
    town_city: string
    postcode: string
    country: string
    phone_number: string
    delivery_method: string
    delivery_fee: string | number
    promo_code: string
    subtotal:string
    discount_total: string
    total: string
    currency_code: string
    note: string
    items: CartItem[]
    created_at: string
}