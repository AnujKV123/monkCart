

// Define the structure of a product variant
export interface Variant {
    id: number;
    product_id?: number;
    title: string;
    price: string;
    quantity?: number;
  }

  export interface Image{
    id: number,
    product_id: number,
    src: string
  }
  
  // Define the structure of a product item
export interface Product {
    id: number;
    title: string;
    image: Image;
    variants: Variant[];
    offer: {
      value: number;
      type: "flat" | "off";
    };
    disccount: boolean;
  }