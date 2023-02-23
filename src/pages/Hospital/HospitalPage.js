import React from "react";
import Pagination from "react-js-pagination";
import axios from "axios";
import { Table, Spinner } from "react-bootstrap";

const pageSize = 10;
const HospitalPage = () => {
  const [hospital, setHospital] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const cancelToken = React.useRef(null);
  const [total, setTotal] = React.useState(0);

  /// pagianation
  const [page, setPage] = React.useState(1);

  const getData = async (page) => {
    try {
      setLoading(true);
      const resp = await axios.get(
        `https://api.codingthailand.com/api/hospital2?page=${page}&page_size=${pageSize}`,
        {
          cancelToken: cancelToken.current.token,
        }
      );
      setHospital(resp.data.data);
      setTotal(resp.data.meta.pagination.total);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  React.useEffect(() => {
    cancelToken.current = axios.CancelToken.source();
    getData(page);

    return () => {
      //   console.log("exit product page");
      //   cancelToken.current.cancel();
    };
  }, [page]); // triggle when id change

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };
  return (
    <>
      <div className="container">
        <div className="row mt-4">
          <h2>Hospital List</h2>
          <div className="col-md-12 ">
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>id</th>
                  <th>code</th>
                  <th>hospital name</th>
                </tr>
              </thead>
              <tbody>
                {hospital.map((h, index) => {
                  return (
                    <tr key={h.id}>
                      <td>{h.id}</td>
                      <td>{h.code}</td>
                      <td>{h.h_name}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
            <br />
            <Pagination
              activePage={page}
              itemsCountPerPage={pageSize}
              totalItemsCount={total}
              pageRangeDisplayed={15}
              onChange={handlePageChange}
              itemClass="page-item"
              linkCalss="page-link"
              prevPageText="prev"
              nextPageText="next"
            />
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

export default HospitalPage;
