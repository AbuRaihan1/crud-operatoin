import "./index.css";
import { FaEdit, FaTimes } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import swal from "sweetalert";

function ProductsDataTable({ product }) {
  const { name, price, _id } = product;
  const [showModalForUpdate, setShowModalForUpdate] = useState(false);
  const [updateData, setUpdateData] = useState({});
  const [remainingProducts, setRemainingProducts] = useState([]);

  const handleCloseModalUpdate = () => setShowModalForUpdate(false);
  const handleShowModalUpdate = () => setShowModalForUpdate(true);

  // delete data from database
  const handleDelete = (id) => {
    swal({
      title: "Are you sure want to delete?",
      text: "",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        fetch(`https://crud-server2.vercel.app/users/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              swal("Done", "Product deleted successfully.", "success");
            }
          });
      } else {
        swal({
          title: "You canceled this deletetion",
          text: "",
          icon: "error",
        });
      }
    });
  };

  // update data in database
  const handleUpdate = (e) => {
    e.preventDefault();
    fetch(`https://crud-server2.vercel.app/users/${product._id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updateData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          swal("Done", "Product updated successfully.", "success");
        }
      });
    handleCloseModalUpdate();
  };

  const handleModalAndUpdateCall = (e) => {
    e.preventDefault();
    handleShowModalUpdate();
  };

  const handleInputChange = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    const newProduct = { ...updateData };
    newProduct[field] = value;
    setUpdateData(newProduct);
  };

  return (
    <>
      {/* modal for update data  */}
      <Modal
        className="modalContainer relative"
        show={showModalForUpdate}
        onHide={handleCloseModalUpdate}
      >
        <Modal.Body className="modalBody">
          <form action="" onSubmit={handleUpdate}>
            <h2 className="py-3">Update your data</h2>
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="name"
              defaultValue={name}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              className="form-control"
              placeholder="price"
              defaultValue={price}
              name="price"
              onChange={handleInputChange}
              required
            />
            {/* <input
              type="text"
              className="form-control"
              placeholder="quantity"
              name="quantity"
              // defaultValue={quantity}
              onChange={handleInputChange}
              required
            /> */}

            <button className="btn btn-primary w-100 text-center mx-3 my-2">
              Update
            </button>
          </form>
          <button className="btn btn-danger crossBtn">
            <FaTimes onClick={handleCloseModalUpdate} />
          </button>
        </Modal.Body>
      </Modal>
      <div className="dataItem">
        <p>{name}</p>
        <p className="align-left">${price}</p>
        <p className="icon">
          <FaEdit onClick={handleModalAndUpdateCall} />
        </p>
        <p className="icon">
          <AiFillDelete onClick={() => handleDelete(_id)} />
        </p>
      </div>
    </>
  );
}

export default ProductsDataTable;
