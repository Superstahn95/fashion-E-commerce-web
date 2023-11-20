import { createContext, useContext, useState } from "react";
import ProductDetailModal from "../components/ProductDetailModal";

const ProductModalContext = createContext();

export default function ProductModalProvider({ children }) {
  const [content, setContent] = useState({
    // imageUrL: "",
    // price: "",
    // name: "",
    // description: "",
    // id: "",
  });
  const { imageUrl, price, name, description, id } = content;
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {" "}
      <ProductModalContext.Provider
        value={{ setContent, showModal, setShowModal }}
      >
        {children}
      </ProductModalContext.Provider>
      {showModal && (
        <ProductDetailModal
          // imageUrl={imageUrl}
          // price={price}
          // name={name}
          // description={description}
          // id={id}
          item={content}
          setShowModal={setShowModal}
        />
      )}
    </>
  );
}

export const useProductModal = () => useContext(ProductModalContext);
