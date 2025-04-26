import { useState } from "react";
import { ProductItem } from "./ProductItem";
import { Product } from "../types/ProductList.type";
import { generateRandomId } from "../utils/generateId";
import ProductPickerIcon from "../assets/icons/ProductPicker.svg";
import { VarientList } from "./VarientList";
import '../styles/productList.style.css'

export const ProductList: React.FC = () => {
  const [items, setItems] = useState<Product[]>([]);
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);

  const handleDrop = (dropIndex: number) => {
    if (draggingIndex === null || draggingIndex === dropIndex) return;
    const updated = [...items];
    const dragged = updated.splice(draggingIndex, 1)[0];
    updated.splice(dropIndex, 0, dragged);
    setItems(updated);
    setDraggingIndex(null);
  };

  const handleDelete = (item: Product) => {
    setItems((prev) => prev.filter((p) => p !== item));
  };

  const handleAddProduct = () => {
    const productId = generateRandomId();
    const productDetail: Product = {
      id: productId,
      title: "Select Product",
      variants: [],
      offer: {
        value: 0,
        type: "flat",
      },
      image: {
        id: generateRandomId(),
        product_id: productId,
        src: "",
      },
      disccount: false,
    };

    setItems((prev) => [...prev, productDetail]);
  };

  return (
    <div className="main-container-product-list">
      <div>
        <div className="product-list-header-main">
          <h2>Add Products</h2>
        </div>
        <div className="product-list-header-sm">
          <span>Product</span>
          <span>Discount</span>
        </div>
      </div>
      <div className="inner-container-product-list">
        {items?.map((item, index) => (
          <div
            className="main-container-draggable"
            key={item.id}
            draggable
            onDragStart={() => setDraggingIndex(index)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(index)}
          >
            <div className="product-list-product-item">
              <div className="product-List-child-container">
                <span className="dragger">
                  <img
                    className="img-product-picker"
                    src={ProductPickerIcon}
                    alt="Product Picker"
                  />
                </span>
                <ProductItem index={index} item={item} setItems={setItems} />
                {items.length > 1 && (
                  <button
                    className="delete-product"
                    onClick={() => handleDelete(item)}
                  >
                    X
                  </button>
                )}
              </div>
              <div>
                {item.variants.length > 1 && (
                  <VarientList item={item} setItems={setItems} />
                )}
              </div>
            </div>
          </div>
        ))}
        <div className="add-product-btn-container">
          <button onClick={handleAddProduct} className="btn-add-product">
            Add Product
          </button>
        </div>
      </div>
    </div>
  );
};
