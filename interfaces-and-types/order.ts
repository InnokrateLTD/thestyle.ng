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
    delivery_status: string
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

export interface OrderParams {
    date_from?: string
    date_to?: string
    status?: string
    payment_status?: string
    search?: string
    page?: number
    page_size?: number
}

interface VendorOrderItem {
    id: string
    product: string
    product_name: string
    size: string
    color: string
    quantity: string | number
    unit_price: string | number
    created_at: string
}
export interface VendorOrder{
    id: string
    status: string
    payment_status: string
    delivery_status_display: string
    customer_name:string
    delivery_type: string
    delivery_route: string
    estimated_delivery_time:string
    vendor_ready_at: string | null
    can_mark_ready: boolean
    items: VendorOrderItem[]
    created_at: string
}
export interface VendorOrderResponse{
    results: VendorOrder[] | null
}