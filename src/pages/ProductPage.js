import React from "react";
import { Table, Image, Badge } from "react-bootstrap";
import axios from "axios";
import { format } from "date-fns";
import { th } from "date-fns/locale";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { BsEyeFill } from "react-icons/bs";
import { Link } from "react-router-dom";

import { addToCart } from "../redux/actions/cartAction";
import { useSelector, useDispatch } from "react-redux";

const ProductPage = () => {
  const [product, setProduct] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const cancelToken = React.useRef(null);

  // redux
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cartReducer.cart);
  const total = useSelector((state) => state.cartReducer.total);

  const getData = async () => {
    try {
      setLoading(true);
      const resp = await axios.get(
        "https://api.codingthailand.com/api/course",
        {
          cancelToken: cancelToken.current.token,
        }
      );
      setProduct(resp.data.data);
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  React.useEffect(() => {
    cancelToken.current = axios.CancelToken.source();
    getData();

    return () => {
      //   console.log("exit product page");
      //   cancelToken.current.cancel();
    };
  }, []);

  const addCart = (p) => {
    // console.log(p);
    const product = {
      id: p.id,
      name: p.title,
      price: p.view, // สมมิตเอา views เป็น ราคา
      qty: 1, // fix user กด 1 ครั้ง = 1ชิ้น
    };

    //call action
    dispatch(addToCart(product, cart));
  };

  if (loading === true) {
    return (
      <div className="text-center mt-5">
        <Button variant="primary" disabled>
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
          />
          <span className="visually-hidden">Loading...</span>
        </Button>{" "}
        <Button variant="primary" disabled>
          <Spinner
            as="span"
            animation="grow"
            size="sm"
            role="status"
            aria-hidden="true"
          />
          Loading...
        </Button>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-5 text-danger">
        <p> Oops! Something Wrong {error.response.data.message}</p>
      </div>
    );
  }

  return (
    <>
      <div className="container">
        <div className="row mt-4">
          <div className="col-md-12 ">
            <h2> Product </h2>
            {total > 0 && <h4> ซื้อแล้ว {total} ชิ้น </h4>}
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Course Name</th>
                  <th>Detail</th>
                  <th>Date Created</th>
                  <th>Views</th>
                  <th>Pictures</th>
                  <th>Tools</th>
                </tr>
              </thead>
              <tbody>
                {product.map((p, index) => {
                  return (
                    <tr key={p.id}>
                      <td>{p.id}</td>
                      <td>{p.title}</td>
                      <td>{p.detail}</td>
                      <td>
                        {format(new Date(p.date), "dd/MMM/yyyy", {
                          locale: th,
                        })}
                      </td>
                      <td>
                        <Badge bg="success">{p.view}</Badge>
                      </td>
                      <td>
                        <Image
                          src={p.picture}
                          thumbnail
                          alt={p.title}
                          width={100}
                        />
                      </td>
                      <td>
                        <Link
                          to={`/detail/${p.id}/title/${p.title}`}
                          className="text-center"
                        >
                          <BsEyeFill />
                        </Link>
                        <button
                          className="btn btn-outline-success ml-2"
                          onClick={() => addCart(p)}
                        >
                          {" "}
                          Add to Cart
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductPage;
