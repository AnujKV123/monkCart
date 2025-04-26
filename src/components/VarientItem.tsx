import "../styles/varientItem.style.css";
import { VariantItemProps } from "../types/VarientItem.type";


export const VarientItem: React.FC<VariantItemProps> = ({index, varient, offer}) => {
  return (
    <div key={index} className="varient-continer-product-item">
        <span className="varient-item-index">{index + 1}.</span>
        <div className="varient-continer-product-detail">
          <div className="varient-product-item-title">{varient.title.length > 30 ? varient.title.substring(0, 20) + "..." : varient.title}</div>
        </div>
        {offer &&
          <div className="varient-offer-container">
            <input
              type="number"
              value={offer.value}
              disabled
            />
            <select
              name="offer"
              id="offer"
              value={offer.type}
              disabled
            >
              <option value="flat">flat off</option>
              <option value="%off">% off</option>
            </select>
          </div>
        }
      </div>
  )
}
