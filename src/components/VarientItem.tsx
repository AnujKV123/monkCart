import "../styles/varientItem.style.css";
import { VariantItemProps } from "../types/VarientItem.type";
import { Product } from "../types/ProductList.type";


export const VarientItem: React.FC<VariantItemProps> = ({index, varient, productId, setItems}) => {

  const handleValueChange = (value: string) => {
    const numericValue = parseFloat(value);
    setItems((prev: Product[]) =>
      prev.map((d) =>
        d.id === productId
          ? {
              ...d,
              variants: d.variants.map((v) =>
                v.id === varient.id
                  ? { ...v, offer: { ...v.offer, value: numericValue } }
                  : v
              ),
            }
          : d
      )
    );
  };

  const handleTypeChange = (value: string) => {
    const offerType = value as "flat" | "off";
    setItems((prev) =>
      prev.map((d) =>
        d.id === productId
          ? {
              ...d,
              variants: d.variants.map((v) =>
                v.id === varient.id
                  ? { ...v, offer: { ...v.offer, type: offerType } }
                  : v
              ),
            }
          : d
      )
    );
  };
  return (
    <div key={index} className="varient-continer-product-item">
        <span className="varient-item-index">{index + 1}.</span>
        <div className="varient-continer-product-detail">
          <div className="varient-product-item-title">{varient.title.length > 30 ? varient.title.substring(0, 20) + "..." : varient.title}</div>
        </div>
        {varient?.offer &&
          <div className="varient-offer-container">
            <input
              type="number"
              value={varient?.offer.value}
              onChange={(e) => handleValueChange(e.target.value)}
            />
            <select
              name="offer"
              id="offer"
              value={varient?.offer.type}
              onChange={(e) => handleTypeChange(e.target.value)}
            >
              <option value="flat">flat off</option>
              <option value="%off">% off</option>
            </select>
          </div>
        }
      </div>
  )
}
