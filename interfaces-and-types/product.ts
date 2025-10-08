

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
    is_best_seller?: boolean
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
    price: string
    discounted_price: string
    discount_type: string
    discount_value: string
    main_image: string
    additional_images: string[]
    low_stock_threshold: string
    total_stock: string
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
  min_price?: string;
  max_price?: string;
  gender?: string;
  seller_name?: string;
  category?: string;
  is_featured_product?: boolean;
  is_special_offer?: boolean;
  is_new_arrival?: boolean;
  vendor_user_id?: string
};

export interface ProductViewedParams {
    search?: string
    created_at_after?: string
    created_at_before?: string
    page?: number
    page_size?: number
    product_id?: string
}

export interface SalesParams {
    search?: string
    created_at_after?: string
    created_at_before?: string
    page?: number
    page_size?: number
}

export interface SalesResponse {
    date: string
    no_ordered: string
    product_sold: string
    price: string
    discount: string
    deduction: string
    total: string
}
export interface ProductViewed {
    product: string
    product_id: string
    rating: number
    review_count: number
    price: 18500.00,
    viewed: 0,
    percentage: 0
}
export interface ProductViewedResponse{
    results: ProductViewed[]
}
export interface SalesResponseResult{
    results: SalesResponse[]
}
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