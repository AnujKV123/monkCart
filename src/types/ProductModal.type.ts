
import { Product } from "./ProductList.type";

export type ProductModalProps = {
    index: number;
    setShowModal: (value: boolean) => void;
    itemId: number;
    setItems: React.Dispatch<React.SetStateAction<Product[]>>;
  };