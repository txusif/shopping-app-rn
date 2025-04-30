export const API_URL = process.env.EXPO_PUBLIC_API_URL;

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Rating;
}

export interface Rating {
  rate: number;
  count: number;
}

export const getProducts = async (): Promise<Product[]> => {
  //   const response = await fetch(`${API_URL}/products?limit=10&page=${page}`);
  const response = await fetch(`${API_URL}/products`);
  if (!response.ok) {
    throw new Error(`Failed to fetch products`);
  }
  const data = await response.json();
  return data;
};

export const getProductById = async (id: number): Promise<Product> => {
  const response = await fetch(`${API_URL}/products/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch product with id ${id}`);
  }
  const data = await response.json();
  return data;
};

export const getCategories = async (): Promise<string[]> => {
  const response = await fetch(`${API_URL}/products/categories`);
  if (!response.ok) {
    throw new Error(`Failed to fetch categories`);
  }
  const data = await response.json();
  return data;
};
