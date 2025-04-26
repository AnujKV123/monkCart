
import { Product } from "./ProductList.type";

export type ProductModalProps = {
    setShowModal: (value: boolean) => void;
    itemId: number;
    setItems: React.Dispatch<React.SetStateAction<Product[]>>;
  };