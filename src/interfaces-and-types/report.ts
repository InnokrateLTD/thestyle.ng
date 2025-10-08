export interface Store {
    id: string
    store_name: string
    business_name: string
    store_description: string
    contact_number: string
    address: string
    country: string
    state: string
    city: string
    zip_code: string
    created_at: string
    updated_at: string
}

export interface Banks {
    id: string | number
    name: string
    code: string 
    longcode: string
    country: string
    currency: string
    type: string
}

export interface BankDetails{
    id: string
    account_number: string
    bank_name: string
    bank_code: string
    account_name: string
    is_verified: boolean
    verification_date: string | null
    is_active: boolean
    created_at: string
    updated_at: string
}

export interface Wallet {
    id: string
    vendor_name: string
    payable_balance: string
    pending_balance: string
    total_balance: string
    total_earned: string
    total_withdrawn: string
    created_at: string
}