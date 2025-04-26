
import { Variant } from "./ProductList.type";

export interface VariantItemProps {
    index: number;
    varient: Variant;
    offer: {
        value: number;
        type: "flat" | "off";
    };
}