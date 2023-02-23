import React from "react";
import { Form, Container, Row, Col, Button } from "react-bootstrap";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";

const SUPPORT_IMAGAE_FORMATS = ["image/jpeg", "image/jpg"];
const UploadPage = () => {
  const history = useHistory();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    //convert to base 64 to convert image to base 64
    try {
      let fileUpload = data.picture[0];
      const reader = new FileReader();
      reader.readAsDataURL(fileUpload);
      reader.onload = async (e) => {
        let base64Image = e.target.result;
        const urlAPI = "https://api.codingthailand.com/api/upload";
        const resp = await axios.post(urlAPI, {
          picture: base64Image,
        });
        toast.success(resp.data.data.message, {
          duration: 2000,
        });

        console.log(resp.data.data.url);
      };
    } catch (error) {
      toast.error(JSON.stringify(error), {
        duration: 2000,
      });
    }
    // const url = "https://api.codingthailand.com/api/category";
    // const sendData = {
    //   name: data.name,
    // };
    // const resp = await axios.post(url, sendData);
    // alert(resp.data.message);
    // history.replace("/category");
  };
  return (
    <Container className="mt-4">
      <div>
        <Toaster />
      </div>

      <Row>
        <Col></Col>
      </Row>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Upload image</Form.Label>
          <Form.Control
            type="file"
            {...register("picture", {
              required: "กรุณาเลือกไฟล์ภาพก่อน",
              validate: {
                checkFileType: (value) => {
                  return (
                    value && SUPPORT_IMAGAE_FORMATS.includes(value[0].type)
                  );
                },
              },
            })}
            className={`${errors.picture ? "is-invalid" : ""}`}
          />
          {errors.picture && errors.picture.type === "required" && (
            <div className="invalid-feedback">{errors.picture.message}</div>
          )}
          {errors.picture && errors.picture.type === "checkFileType" && (
            <div className="invalid-feedback">support only .jpg or .jpeg</div>
          )}
          <br></br>
          <Button type="submit">Submit</Button>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default UploadPage;
