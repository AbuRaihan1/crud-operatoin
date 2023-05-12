import React from "react";
import swal from "sweetalert";
const AddProductForm = ({ handleCloseModal, setProducts, products }) => {
  console.log(products);
  const handleAddProducts = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const price = form.price.value;
    const quantity = form.quantity.value;
    const products = { name, price, quantity };

    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(products),
    })
      .then((res) => res.json())
      .then((data) => {
        swal("Done", "Product added successfully.", "success");
      });
    form.reset();
  };
  return (
    <div>
      <form action="" onSubmit={handleAddProducts}>
        <div className="my-5 input-wrapper">
          <h2>Add Products here </h2>
          <input
            type="text"
            name="name"
            className="form-control w-100"
            placeholder="name"
            required
          />{" "}
          <input
            type="text"
            name="price"
            className="form-control  w-100 "
            placeholder="price"
            required
          />{" "}
          <input
            type="number"
            name="quantity"
            className="form-control  w-100 "
            placeholder="quantity"
            required
          />{" "}
          <input
            className="btn btn-primary align-left  w-100"
            type="submit"
            value="Add Products"
            onClick={handleCloseModal}
          />
        </div>
      </form>
    </div>
  );
};

export default AddProductForm;
