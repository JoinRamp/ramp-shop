export interface ProductType {
  id: number;
  uid: string;
  name: string;
  slug: string;
  product_type: string;
  shop: {
    id: number;
    uid: string;
    owner_id: number;
    name: string;
    slug: string;
    description: string;
    cover_image: string;
    logo: string;
    is_active: number;
    address: string[];
    created_at: string;
    updated_at: string;
  };
  selling_price: number;
  image: string;
  status: string;
  price: number;
  quantity: number;
  visibility: 1 | 0;
}
