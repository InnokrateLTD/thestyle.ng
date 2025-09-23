

export interface Category {
    id: string
    name: string
    description: string | null
    is_active: boolean
    created_at: string
    updated_at: string
}

export interface SignedURL {
    signed_url: string
    api_key: string
    timestamp: string
    folder: string
    signature: string
    upload_preset: string
}

export interface ImageResponse {
    public_id: string
    version: string
    signature: string
    url: string
}
export interface ProductResponse {
    id: string
    slug_id: string
    name: string
    main_image: string
    price: string
    discounted_price: string
    category_name: string
    seller_name: string
    total_stock: number
    stock_status: string
    rating: number
    created_at: string
    short_description: string
}
export interface ProductResult {
    results:ProductResponse[]
}
interface StockItems {
    size: string
    color: string
    stock_quantity: number
}
export interface SingleProduct {
    id: string
    slug_id: string
    name: string
    short_description: string
    description: string
    category: Category
    seller_name: string
    seller_email: string
    available_sizes: string[]
    gender: string
    available_colors: string[]
    price: number
    discounted_price: number
    discount_type: string
    discount_value: number
    main_image: string
    additional_images: string[]
    low_stock_threshold: number
    total_stock: number
    stock_status: string
    stock_items: StockItems[]
    created_at: string
    updated_at: string
}

export type ProductParams = {
  available_size?: string;
  available_color?: string;
  category_name?: string;
  search?: string;
  min_price?: number;
  max_price?: number;
  gender?: string;
  seller_name?: string;
  category?: string;
  is_featured_product?: boolean;
  is_special_offer?: boolean;
  is_new_arrival?: boolean;
};

export interface ProductReview{
    id: string
    name: string
    rating: number
    product_name: string
    review_text: string
    date_posted: string
}
export interface ProductReviewResponse{
    results: ProductReview[]
}


export interface CartItem {
  product_id: string | number;
  slug_id: string;
  name: string;
  available_sizes: string[];
  price: number;
  discounted_price: number;
  discount_value: number;
  main_image: string;
  total_stock: number;
  quantity: number;
};