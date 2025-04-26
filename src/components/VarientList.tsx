import { useState } from "react";
import { VarientItem } from "./VarientItem";
import ProductPickerIcon from '../assets/icons/ProductPicker.svg'
import { VarientListProps } from "../types/VarientList.type";

export const VarientList: React.FC<VarientListProps> = ({item, setItems})=>{

    const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
    const [showVarients, setShowVarients] = useState(false)

    const handleDrop = (dropIndex: number, productId: number) => {
        if (draggingIndex === null || draggingIndex === dropIndex) return;
      
        setItems((prevItems) => {
          // Deep copy of items to avoid direct mutation
          const updatedItems = prevItems.map((item) => {
            if (item.id === productId) {
              const variants = [...item.variants];
              
              // Remove the dragged variant
              const [draggedVariant] = variants.splice(draggingIndex, 1);
      
              // Insert it at the correct drop position
              variants.splice(dropIndex, 0, draggedVariant);
      
              return {
                ...item,
                variants,
              };
            }
            return item;
          });
      
          return updatedItems;
        });
      
        setDraggingIndex(null);
      };

    const handleDelete = (variantId: number) => {
        setItems((prev) =>
          prev
            .map((product) => ({
              ...product,
              variants: product.variants.filter((variant) => variant.id !== variantId),
            }))
        );
      };

    return(
    <div className="container-main-varient">
        <div className="container-toggle-header-varient">
            <button className="toggle-header-varient" onClick={() => setShowVarients(prev => !prev)}>
            {showVarients ? 'Hide' : 'Show'} Varients {showVarients ? '˅' : '˄'}
            </button>
        </div>
        {showVarients && <div className="inner-container-product-list">
            {item.variants.map((varient, index) => (
                <div 
                    className="main-container-draggable" 
                    style={{marginLeft:"25px"}}
                    key={varient.id} 
                    draggable
                    onDragStart={() => setDraggingIndex(index)}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => handleDrop(index, item.id)}
                >
                <span  className="dragger">
                <img className="img-product-picker" src={ProductPickerIcon} alt="Product Picker" />
                </span>
                <VarientItem index={index} varient={varient} offer={item.offer} />
                {item.variants.length > 1 &&
                <button className="delete-product" onClick={() => handleDelete(varient.id)}>
                    X
                </button>}
                </div>
            ))}
        </div>}
    </div>
    )
}