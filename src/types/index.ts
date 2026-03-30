export type Product = {
  _id: string;
  name: string;
  price: number;
  category: string;
  sizes: string[];
  images: string[];
  description: string;
  rating: number;
};

export type CartItem = {
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  size: string;
};
