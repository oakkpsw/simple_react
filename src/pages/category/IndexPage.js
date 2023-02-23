import React from "react";
import axios from "axios";
import { Table, Spinner, Button } from "react-bootstrap";
import { BsPencil, BsTrash } from "react-icons/bs";
import { useHistory } from "react-router-dom";

const pageSize = 10;
const IndexPage = () => {
  const [category, setCategory] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const cancelToken = React.useRef(null);
  const history = useHistory();

  const getData = async () => {
    try {
      setLoading(true);
      const resp = await axios.get(
        `https://api.codingthailand.com/api/category`,
        {
          cancelToken: cancelToken.current.token,
        }
      );
      setCategory(resp.data);
    } catch (error) {
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
  }, []); // triggle when id change

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
        <p> Oops! Something Wrong {JSON.stringify(error)}</p>
      </div>
    );
  }

  return (
    <>
      <div className="container">
        <div className="row mt-4">
          <div className="col-md-12 ">
            <Button
              className="mb-3"
              variant="success"
              onClick={() => history.push("/category/create")}
            >
              เพิ่มข้อมูล
            </Button>
            <h2>หมวดหมู่ข่าว</h2>
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>หมวดหมู่ข่าว</th>
                  <th>เครื่องมือ</th>
                </tr>
              </thead>
              <tbody>
                {category.map((c, index) => {
                  return (
                    <tr key={c.id}>
                      <td>{c.id}</td>
                      <td>{c.name}</td>
                      <td>
                        {" "}
                        <Button
                          className="ml-2"
                          variant="outline-info"
                          size="sm"
                          onClick={() => history.push("/category/edit/" + c.id)}
                        >
                          <BsPencil />
                        </Button>{" "}
                        <Button
                          className="ml-2"
                          variant="danger"
                          size="sm"
                          onClick={async () => {
                            const isConfirm = window.confirm(
                              "Delete ?" + c.name + "?"
                            );
                            if (isConfirm === true) {
                              const url = `https://api.codingthailand.com/api/category/${c.id}`;
                              const resp = await axios.delete(url);
                              alert(resp.data.message);
                              history.go(0);
                            }
                          }}
                        >
                          <BsTrash />
                        </Button>{" "}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
            <br />

            {/* <Pagination>
              <Pagination.First />
              <Pagination.Prev />
              <Pagination.Item>{1}</Pagination.Item>
              <Pagination.Ellipsis />

              <Pagination.Item>{10}</Pagination.Item>
              <Pagination.Item>{11}</Pagination.Item>
              <Pagination.Item active>{12}</Pagination.Item>
              <Pagination.Item>{13}</Pagination.Item>
              <Pagination.Item disabled>{14}</Pagination.Item>

              <Pagination.Ellipsis />
              <Pagination.Item>{20}</Pagination.Item>
              <Pagination.Next />
              <Pagination.Last />
            </Pagination> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default IndexPage;
