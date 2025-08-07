export interface Product {
  id: string;
  _id: string;
  title: string;
  description: string;
  imageCover: string;
  images: string[];
  price: number;
  originalPrice?: number;
  discount?: number;
  ratingsAverage: number;
  ratingsQuantity: number;
  category: {
    _id: string;
    name: string;
    slug: string;
  };
  brand?: {
    _id: string;
    name: string;
    slug: string;
    image: string;
  };
  stock?: number;
  colors?: string[];
  sizes?: string[];
  material?: string;
  weight?: string;
  dimensions?: string;
}

export interface ProductResponse {
  data: Product[];
  results: number;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface Subcategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
}

export interface cartProduct {
  subcategory : Subcategory[];
  _id: string;
  title: string;
  quantity: number;
  imageCover: string;
  category: Category;
  brand: Category;
  ratingsAverage: number;
  id: string;
}


export interface cartData{
  count: number;
  _id: string;
  product: cartProduct;
  price: number;
}



export interface Brand {
  _id: string;
  name: string;
  slug: string;
  image?: string;
  category?: Category;
}

export interface Wishlist {
  sold: number;
  images: string[];
  subcategory: Brand[];
  ratingsQuantity: number;
  _id: string;
  title: string;
  slug: string;
  description: string;
  quantity: number;
  price: number;
  imageCover: string;
  category: Brand;
  brand: Brand;
  ratingsAverage: number;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  id: string;
}

