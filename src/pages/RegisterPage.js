import React from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useHistory } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const schema = yup
  .object({
    name: yup.string().required("ชื่อสกุลห้ามว่าง"),
    email: yup
      .string()
      .required("อีเมลล์ห้ามว่าง")
      .email("รูปแบบอีเมลล์ไม่ถูกต้อง"),
    password: yup
      .string()
      .required("password not empty")
      .min(3, "min password 3 wording"),
  })
  .required();
const RegisterPage = () => {
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const url = "https://api.codingthailand.com/api/register";
      const sendData = {
        name: data.name,
        email: data.email,
        password: data.password,
      };
      const resp = await axios.post(url, sendData);
      toast.success(resp.data.message, {
        duration: 2000,
      });
      history.replace("/login");
    } catch (err) {
      toast.error(err.response.data.errors.email[0], {
        duration: 2000,
      });
    }
  };
  return (
    <Container className="mt-4">
      <div>
        <Toaster />
      </div>
      <Row>
        <Col xs={12} md={8}>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>ชื่อ</Form.Label>
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

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>email</Form.Label>
              <Form.Control
                type="email"
                {...register("email")}
                className={`${errors.email ? "is-invalid" : ""}`}
              />
              {errors.email && (
                <Form.Control.Feedback type="invalid">
                  {errors.email.message}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>password</Form.Label>
              <Form.Control
                type="password"
                {...register("password")}
                className={`${errors.password ? "is-invalid" : ""}`}
              />
              {errors.password && (
                <Form.Control.Feedback type="invalid">
                  {errors.password.message}
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

export default RegisterPage;
