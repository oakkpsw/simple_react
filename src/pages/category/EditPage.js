import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
const schema = yup
  .object({
    name: yup.string().required("ชื่อหมวดหมู่ห้ามว่าง"),
  })
  .required();

const EditPage = () => {
  const history = useHistory();
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });
  // cache instance getdata
  const getData = React.useCallback(async () => {
    const resp = await axios.get(
      "https://api.codingthailand.com/api/category/" + id
    );
    console.log(resp.data);
    setValue("name", resp.data.name);
  }, [id, setValue]);

  React.useEffect(() => {
    console.log("useEffect edit page");
    getData();
  }, [getData]);
  const onSubmit = async (data) => {
    // console.log(data)

    const url = "https://api.codingthailand.com/api/category";
    const sendData = {
      id: id,
      name: data.name,
    };
    const resp = await axios.put(url, sendData);
    alert(resp.data.message);
    history.replace("/category");
  };
  return (
    <Container className="mt-4">
      <Row>
        <Col xs={12} md={8}>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>หมวดหมู่ข่าว</Form.Label>
              <Form.Control
                {...register("name")}
                className={`${errors.name ? "is-invalid" : ""}`}
              />
              {errors.name && (
                <Form.Control.Feedback type="invalid">
                  {errors.name.message}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            <Button variant="primary" type="submit">
              บันทึกข้อมูล
            </Button>
          </Form>
          <hr />
        </Col>
      </Row>
    </Container>
  );
};

export default EditPage;
