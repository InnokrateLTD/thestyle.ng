export interface Address {
    id: string
    first_name: string
    last_name: string
    address_line: string
    town_city: string
    state: string
    country: string
    phone_number: string
    is_default: boolean
    created_at: string
}

export interface Profile {
    id: string
    email: string
    user_type: number
    first_name: string
    last_name: string
    profile_picture: string
    provider: string
    is_email_verified: boolean
    phone_number: string | null
    created_at: string
}