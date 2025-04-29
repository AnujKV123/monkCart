
import { Variant, Product } from "./ProductList.type";

export interface VariantItemProps {
    index: number;
    varient: Variant;
    productId: number;
    setItems: React.Dispatch<React.SetStateAction<Product[]>>
}