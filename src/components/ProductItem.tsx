import { useState } from "react";
import ProductModal from "./ProductModal";
import { ProductItemProps } from "../types/ProductItem.type";
import EditIcon from '../assets/icons/editIcon.svg'
import '../styles/productItem.style.css'


export const ProductItem: React.FC<ProductItemProps> = ({
  index,
  item,
  setItems,
}) => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const handchangeDiscount = (id: number) => {
    setItems((prev) =>
      prev.map((d) => (d.id === id ? { ...d, disccount: true } : d))
    );
  };

  const handleValueChange = (value: string, id: number) => {
    const numericValue = parseFloat(value);
    setItems((prev) =>
      prev.map((d) =>
        d.id === id ? { ...d, offer: { ...d.offer, value: numericValue } } : d
      )
    );
  };

  const handleTypeChange = (value: string, id: number) => {
    const offerType = value as "flat" | "off";
    setItems((prev) =>
      prev.map((d) =>
        d.id === id ? { ...d, offer: { ...d.offer, type: offerType } } : d
      )
    );
  };

  return (
    <>
      <div key={index} className="continer-product-item">
        <span className="item-index">{index + 1}.</span>
        <div className="continer-product-detail">
          <div className="product-item-title">{item.title.length > 30 ? item.title.substring(0, 20) + "..." : item.title}</div>
          <button onClick={() => {document.body.classList.add("body-scrall-lock"); setShowModal(true)}}><img className="img-edit-icon" src={EditIcon} alt="Edit Icon" /></button>
        </div>
        {item.disccount ? (
          <div className="offer-container">
            <input
              type="number"
              value={item.offer.value}
              onChange={(e) => handleValueChange(e.target.value, item.id)}
            />
            <select
              name="offer"
              id="offer"
              value={item.offer.type}
              onChange={(e) => handleTypeChange(e.target.value, item.id)}
            >
              <option value="flat">flat off</option>
              <option value="%off">% off</option>
            </select>
          </div>
        ) : (
          <button
            className="add-Disccount"
            onClick={() => handchangeDiscount(item.id)}
          >
            Add Disccount
          </button>
        )}
      </div>
      {showModal && (
        <ProductModal
          index={index}
          setShowModal={setShowModal}
          itemId={item.id}
          setItems={setItems}
        />
      )}
    </>
  );
};
