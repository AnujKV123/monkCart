
import { Product } from "./ProductList.type";

export interface VarientListProps {
    item: Product;
    setItems:React.Dispatch<React.SetStateAction<Product[]>>;
}