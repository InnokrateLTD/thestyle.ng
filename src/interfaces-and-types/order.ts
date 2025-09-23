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

export interface PaymentData{
    transaction_id: string
    authorization_url: string
    access_code: string
    reference: string
    amount: string | number
    currency: string
}

export interface PromoCode{
    valid: boolean
    message: string
    subtotal: number | string
    discount: number | string
    total: number | string
    currency_code: number | string
}

// Each flattened item = one cart item + its parent order’s info
export interface FlattenedOrderItem extends CartItem {
  orderId: string;
  status: string;
  created_at: string;
  total: string;
  currency_code: string;
}
export interface OrderResponse{
    results: Order[] | null
}