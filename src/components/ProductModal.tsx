import React, { useEffect, useState, useRef, useCallback } from "react";
import { ProductModalProps } from "../types/ProductModal.type";
import { Product, Variant } from "../types/ProductList.type";
import "../styles/modal.style.css";
import { Loader } from "./Loader";

const PAGE_SIZE = 10;

const ProductModal: React.FC<ProductModalProps> = ({
  index,
  setShowModal,
  itemId,
  setItems,
}) => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [search, setSearch] = useState("");
  const [loaderStatus, setLoaderStatus] = useState(false);
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const parentRefs = useRef<Record<number, HTMLInputElement | null>>({});
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [selectedItems, setSelectedItems] = useState<Product[]>([]);

  const fetchData = useCallback(
    async (currPage: number, searching: boolean = false) => {
      if (loaderStatus) return;
      setLoaderStatus(true);
      try {
        const response = await fetch(
          `https://stageapi.monkcommerce.app/task/products/search?search=${search}&page=${currPage}&limit=${PAGE_SIZE}`,
          { headers: { "x-api-key": import.meta.env.VITE_API_KEY } }
        );
        const json = await response.json();
        if (json !== null) {
          if (searching) {
            setFilteredProducts(json);
          } else {
            setFilteredProducts((prev) => [...prev, ...json]);
          }
        } else {
          setFilteredProducts([]);
        }

        setHasMore(json.length === PAGE_SIZE);
      } catch (error) {
        console.info(error);
      } finally {
        setLoaderStatus(false);
      }
    },
    [search, hasMore]
  );

  useEffect(() => {
    if (!hasMore || loaderStatus) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && !loaderStatus) {
          observer.unobserve(entries[0].target);
          setPage((prev) => prev + 1);
          fetchData(page + 1);
        }
      },
      {
        root: null,
        rootMargin: "200px",
        threshold: 0.1,
      }
    );

    const lastElement = loaderRef.current;
    if (lastElement) {
      observer.observe(lastElement);
    }

    return () => {
      if (lastElement) {
        observer.unobserve(lastElement);
      }
      // observer.disconnect();
    };
  }, [hasMore, loaderStatus]);

  useEffect(() => {
    const delay = setTimeout(() => {
      setPage(1);
      fetchData(1, true); // Fresh search from page 1
    }, 300);

    return () => clearTimeout(delay);
  }, [search]);

  const toggleVariant = (variantId: number, productId: number) => {
    setSelected((prev) => {
      const newSet = new Set(prev);
      newSet.has(variantId) ? newSet.delete(variantId) : newSet.add(variantId);

      // Get all variant IDs for the current product
      const product = filteredProducts.find((p) => p.id === productId);
      if (product) {
        const allVariantIds = product.variants.map((v) => v.id);
        const allChecked = allVariantIds.every((id) =>
          id === variantId ? !prev.has(id) : prev.has(id)
        );
        const parentRef = parentRefs.current[productId];
        if (parentRef) {
          parentRef.indeterminate =
            !allChecked && allVariantIds.some((id) => newSet.has(id));
          parentRef.checked = allChecked;
        }
      }
      return newSet;
    });
  };

  const toggleParent = (variants: Variant[], isChecked: boolean) => {
    setSelected((prev) => {
      const newSet = new Set(prev);
      variants.forEach((obj) => {
        isChecked ? newSet.add(obj.id) : newSet.delete(obj.id);
      });
      return newSet;
    });
  };

  useEffect(() => {
    const selectedVariantsByProduct = filteredProducts
      .map((product) => {
        const selectedVariants = product.variants.filter((v) =>
          selected.has(v.id)
        );
        if (selectedVariants.length > 0) {
          return {
            ...product,
            variants: selectedVariants,
            offer: {
              value: 0,
              type: "flat",
            },
            disccount: false,
          };
        }
        return null;
      })
      .filter((p): p is Product => p !== null);
    setSelectedItems(selectedVariantsByProduct);
  }, [filteredProducts, selected, search]);

  const handleSubmit = () => {
    setLoaderStatus(true);
    setItems((prev) => {
      const updatedProducts = prev.filter((p) => p.id !== itemId);

      return [
        ...updatedProducts.slice(0, index),
        ...selectedItems,
        ...updatedProducts.slice(index),
      ];
    });
    setLoaderStatus(false);
    document.body.classList.remove("body-scrall-lock");
    setShowModal(false);
  };

  return (
    <div>
      <div className="modal-overlay">
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <button
            className="modal-close"
            onClick={() => {
              document.body.classList.remove("body-scrall-lock");
              setShowModal(false);
            }}
          >
            &times;
          </button>
          <h1 className="product-selector-title">Select Products</h1>
          <input
            className="product-search-input"
            placeholder="Search product"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="container-modal-content">
            {filteredProducts?.map((product) => (
              <div key={product.id} className="product-block">
                <label className="product-header-outer">
                  <div className="product-header-inner">
                    <input
                      type="checkbox"
                      className="cls-checkbox-styling"
                      ref={(el) => {
                        parentRefs.current[product.id] = el;
                      }}
                      onChange={(e) =>
                        toggleParent(product.variants, e.target.checked)
                      }
                    />
                    <img
                      src={product.image.src}
                      alt="img"
                      className="product-image"
                    />
                    <span className="product-title">{product.title}</span>
                  </div>
                </label>

                {/* optional chaining for product.variants */}
                {product.variants?.map((variant) => (
                  <div key={variant.id}>
                    <label className="variant-row-outer">
                      <div className="variant-row-inner">
                        <div>
                          <input
                            className="cls-checkbox-styling"
                            type="checkbox"
                            checked={selected.has(variant.id)}
                            onChange={() =>
                              toggleVariant(variant.id, product.id)
                            }
                          />
                        </div>
                        <div className="variant-row-inner-content">
                          <div className="variant-title-container">
                            <span className="variant-title">
                              {variant.title}
                            </span>
                          </div>
                          <div className="variant-price-container">
                            <span className="variant-qty">
                              {variant.quantity} available
                            </span>
                            <span className="variant-price">
                              {variant.price}
                            </span>
                          </div>
                        </div>
                      </div>
                    </label>
                  </div>
                ))}
              </div>
            ))}
            {filteredProducts.length > 0 && (
              <div ref={loaderRef} style={{ height: "1px" }}></div>
            )}
          </div>
          <div className="modal-footer-conatiner">
            <div>{<span>{selectedItems.length} product selected</span>}</div>
            <div className="modal-button-conatiner">
              <button
                className="modal-btn-cancel"
                onClick={() => {
                  document.body.classList.remove("body-scrall-lock");
                  setShowModal(false);
                }}
              >
                Cancel
              </button>
              <button
                className="modal-btn-submit"
                disabled={selected.size === 0}
                onClick={handleSubmit}
              >
                Add
              </button>
            </div>
          </div>
          {loaderStatus && <Loader />}
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
