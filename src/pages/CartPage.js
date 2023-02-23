import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Table } from "react-bootstrap";
import { useHistory } from "react-router-dom";

import { clearAllCart } from "../redux/actions/cartAction";
const CartPage = () => {
  const cart = useSelector((state) => state.cartReducer.cart);
  const total = useSelector((state) => state.cartReducer.total);
  const dispatch = useDispatch();
  const history = useHistory();
  return (
    <div className="container">
      <div className="row mt-4">
        <div className="col-md-12">
          <h2> Cart ซื้อไปแล้ว ​{total} ชิ้น</h2>
          <button
            className="btn btn-danger"
            onClick={() => dispatch(clearAllCart())}
          >
            {" "}
            Clear Cart{" "}
          </button>

          <button
            className="btn btn-primary ml-4"
            onClick={() => history.push("/pdf")}
          >
            รายงาน PDF
          </button>

          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ลำดับ</th>
                <th>รหัสสินค้า</th>
                <th>ชื่อสินค้า</th>
                <th>ราคา</th>
                <th>จำนวน</th>
                <th>รวมทั้งหมด</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((c, index) => {
                return (
                  <tr key={c.id}>
                    <td>{index + 1}</td>
                    <td>{c.id}</td>
                    <td>{c.name}</td>
                    <td>{c.price}</td>
                    <td>{c.qty}</td>
                    <td>{c.price * c.qty}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
