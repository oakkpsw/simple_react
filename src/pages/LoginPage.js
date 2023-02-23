import React from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useHistory } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { UserStoreContext } from "../context/UserContext";
import { useDispatch } from "react-redux";
import { updateProfile } from "../redux/actions/authAction";
const schema = yup
  .object({
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
const LoginPage = () => {
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  //   const userStore = React.useContext(UserStoreContext);

  // call redux action

  const dispatch = useDispatch();
  const onSubmit = async (data) => {
    // console.log(data);
    try {
      const url = "https://api.codingthailand.com/api/login";
      const sendData = {
        email: data.email,
        password: data.password,
      };
      const resp = await axios.post(url, sendData);
      localStorage.setItem("token", JSON.stringify(resp.data));
      // get profile
      const urlProfile = "https://api.codingthailand.com/api/profile";
      const respProfile = await axios.get(urlProfile, {
        headers: { Authorization: "Bearer " + resp.data.access_token },
      });

      //   console.log(respProfile.data.data.user);
      localStorage.setItem(
        "profile",
        JSON.stringify(respProfile.data.data.user)
      );

      toast.success("Login Succesful", {
        duration: 2000,
      });
      //   console.log(resp.data);
      //   history.replace("/");
      //   history.go(0);
      // update profile by context
      const profileValue = JSON.parse(localStorage.getItem("profile"));
      //   userStore.updateProfile(profileValue); // context
      //call action
      dispatch(updateProfile(profileValue));

      history.replace("/");
    } catch (err) {
      toast.error(err.response.data.message, {
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
              Login
            </Button>
          </Form>
          <hr />
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
