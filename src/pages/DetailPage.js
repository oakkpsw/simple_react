import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { Spinner, Card, Button, Row, Col } from "react-bootstrap";
import axios from "axios";
const DetailPage = () => {
  const { id, title } = useParams();
  const [detail, setDetail] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const cancelToken = React.useRef(null);
  const history = useHistory();

  const getData = async (id) => {
    try {
      setLoading(true);
      const resp = await axios.get(
        "https://api.codingthailand.com/api/course/" + id,
        {
          cancelToken: cancelToken.current.token,
        }
      );
      setDetail(resp.data.data);
      console.log(resp.data.data);
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  React.useEffect(() => {
    cancelToken.current = axios.CancelToken.source();
    getData(id);

    return () => {
      //   console.log("exit product page");
      //   cancelToken.current.cancel();
    };
  }, [id]); // triggle when id change

  return (
    <>
      <div className="container">
        <div className="row mt-4">
          <div className="col-md-12 ">
            <Button variant="secondary" onClick={() => history.goBack()}>
              Back
            </Button>{" "}
            <h2>
              {" "}
              {title} - {id}{" "}
            </h2>
            <Row xs={1} md={2} className="g-4">
              {detail.length > 0 ? (
                detail.map((d, index) => {
                  return (
                    <Col key={d.ch_id}>
                      <Card>
                        <Card.Body>
                          <Card.Title>{d.ch_title}</Card.Title>
                          <Card.Text>{d.ch_dateadd}</Card.Text>
                        </Card.Body>
                      </Card>
                    </Col>
                  );
                })
              ) : (
                <p> No Product Data</p>
              )}
            </Row>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailPage;
