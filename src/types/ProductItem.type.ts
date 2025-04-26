

import { Product } from "./ProductList.type";
  
  // Define props for the component
export interface ProductItemProps {
    index: number;
    item: Product;
    setItems: React.Dispatch<React.SetStateAction<Product[]>>;
  }