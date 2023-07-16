import React, { useEffect, useState } from "react";
import { Container, Modal } from "react-bootstrap";
import AddProductForm from "./AddProductForm";
import ProductsDataTable from "./ProductsDataTable";
import "./index.css";

const Products = () => {
  // const loadedProducts = useLoaderData();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  useEffect(() => {
    fetch("https://crud-server2.vercel.app/users")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setIsLoading(false);
      });
  }, [products]);
  console.log(products);
  return (
    <div>
      {isLoading ? (
        <div class="loader-container">
          <div class="loader"></div>
        </div>
      ) : (
        <div>
          {" "}
          <Container>
            <Modal
              className="modalContainer"
              show={showModal}
              onHide={handleCloseModal}
            >
              <Modal.Body className="modalBody">
                <AddProductForm
                  handleCloseModal={handleCloseModal}
                  setProducts={setProducts}
                  products={products}
                />
              </Modal.Body>
            </Modal>
            {products && products.length > 0 ? (
              <>
                <div className="mt-5">
                  <h2 className="my-5">You have those products</h2>
                  <button
                    onClick={handleShowModal}
                    className="btn btn-primary w-100"
                  >
                    Add Products
                  </button>

                  <div className="border dataItemWrapper">
                    {products.map((product, idx) => (
                      <ProductsDataTable product={product} key={idx} />
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <AddProductForm />
            )}
          </Container>
        </div>
      )}
    </div>
  );
};

export default Products;
