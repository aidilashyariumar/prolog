import {
  Avatar,
  Breadcrumb,
  Button,
  Col,
  Flex,
  Form,
  Input,
  Modal,
  Radio,
  Row,
  Select,
  Upload,
  message,
} from "antd";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { storePengguna } from "../../services/pengguna";
import modalComponent from "../../components/modalComponent";

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};

const TambahPengguna = () => {
  const [value, setValue] = useState("");
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [previewimage, setPreviewImage] = useState(null);

  const handleChange = (selectedValue) => {
    setValue(selectedValue);
  };

  const validateConfirmPassword = (_, value) => {
    const password = form.getFieldValue("password");
    if (password !== value) {
      return Promise.reject("Konfirmasi password tidak cocok dengan password.");
    } else {
      return Promise.resolve();
    }
  };

  const handleSubmitPengguna = async () => {
    try {
      const {
        id_position,
        id_business_unit,
        photo,
        name,
        username,
        address,
        nik,
        status,
        password,
        confirmPassword,
      } = form.getFieldsValue(); // Mendapatkan nilai dari seluruh field

      if (confirmPassword !== password) {
        message.error("password tidak sesuai");
        return;
      }

      setIsLoading(true);
      // console.log(form.getFieldValue)

      const f = new FormData();
      f.append("id_position", id_position);
      f.append("id_business_unit", id_business_unit);
      f.append("photo", photo.file);
      f.append("name", name);
      f.append("username", username);
      f.append("address", address);
      f.append("nik", nik);
      f.append("status", status);
      f.append("password", password);

      const response = await storePengguna(f);

      console.log("res", response);

      setIsLoading(false);

      if (response.status !== "success") {
        message.error("gagal menambah data");
        return;
      }

      message.success(response.message);
      modalComponent.success({
        // title: 'Data Berhasil Disimpan',
        content: 'Data Anda telah disimpan dengan sukses.',
      });
      navigate('/pengguna')

    } catch (error) {
      console.error("Terjadi kesalahan:", error);
    }
  };
  const handleRemove = () => {
    setPreviewImage(null);
  };

  return (
    <>
      <Breadcrumb style={{ marginTop: -30 }}>
        <Breadcrumb.Item>
          <Link to="/">Dashboard</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/pengguna">Pengguna</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="pengguna/add-pengguna">Tambah Pengguna</Link>
        </Breadcrumb.Item>
      </Breadcrumb>
      <Form name="trigger" form={form} layout="vertical" autoComplete="off">
        <Flex justify="space-between">
          <p
            style={{
              textAlign: "left",
              fontSize: 24,
              fontWeight: 600,
              marginTop: 8,
            }}
          >
            Tambah Pengguna
          </p>

          <Button type="primary" onClick={handleSubmitPengguna}>
            Tambah
          </Button>
        </Flex>

        <Row style={{ marginTop: "-15px" }} justify="space-between">
          <Col span={12}>
            <div
              style={{
                backgroundColor: "white",
                borderRadius: 10,
                maxHeight: "80vh",
                width: "98%",
                overflow: "auto",
              }}
            >
              <p
                style={{
                  textAlign: "left",
                  marginLeft: 10,
                  fontWeight: 600,
                  fontSize: 20,
                }}
              >
                Informasi Pengguna
              </p>
              <hr
                style={{
                  backgroundColor: "grey",
                  borderColor: "grey",
                  border: "1px solid #F0F0F0",
                }}
              />
              <div style={{ width: "90%", margin: "0px auto 0px auto" }}>
                <p style={{ textAlign: "left" }}>Foto Profil</p>
                <Flex wrap="wrap" gap="small" style={{ alignItems: "center" }}>
                  <Avatar src={previewimage} size={96} />
                  <Flex wrap="wrap" gap="small" vertical>
                    <div>
                    <Flex>
                      <Form.Item name="photo">
                        <Upload
                          accept="image/*"
                          multiple={false}
                          // maxCount={1}
                          onRemove={handleRemove}
                          showUploadList={false}
                          beforeUpload={(file) => {
                            getBase64(file, (url) => {
                              setPreviewImage(url);
                            });

                            return false;
                          }}
                        >
                          <Button type="primary">Upload</Button>
                        </Upload>
                        {previewimage && (
                          <Button
                            // icon={<DeleteOutlined />}
                            onClick={handleRemove}
                          >
                            Hapus
                          </Button>
                        )}
                      </Form.Item>
                    </Flex>
                    <p style={{position:'absolute', top:170}}>Gambar harus berukuran 1:1 dengan file PNG/JPEG</p>
                    </div>
                  </Flex>
                </Flex>

                <Form.Item
                  label="Nama Lengkap"
                  name="name"
                  rules={[{ required: true }]}
                >
                  <Input placeholder="Masukkan Nama Lengkap" />
                </Form.Item>

                <Form.Item
                  label="Username"
                  name="username"
                  style={{ marginTop: "-15px" }}
                >
                  <Input placeholder="Masukkan Username" />
                </Form.Item>

                <Form.Item
                  label="NIK"
                  name="nik"
                  style={{ marginTop: "-15px" }}
                >
                  <Input placeholder="masukkan NIK" />
                </Form.Item>
                <Form.Item
                  label="Alamat"
                  name="address"
                  style={{ marginTop: "-15px" }}
                >
                  <Input placeholder="Masukkan Alamat" />
                </Form.Item>
              </div>
            </div>
          </Col>
          <Col span={12}>
            <div
              style={{
                backgroundColor: "white",
                borderRadius: 10,
                maxHeight: "80vh",
                width: "98%",
                overflow: "auto",
              }}
            >
              <p
                style={{
                  textAlign: "left",
                  marginLeft: 10,
                  fontWeight: 600,
                  fontSize: 20,
                }}
              >
                Detail Pengguna
              </p>
              <hr
                style={{
                  backgroundColor: "grey",
                  borderColor: "grey",
                  border: "1px solid #F0F0F0",
                }}
              />
              <div style={{ width: "90%", margin: "0px auto 0px auto" }}>
                <style jsx>
                  {`
                    .selected {
                      background-color: #ccf9dc;
                      border-color: green !important;
                    }

                    .select {
                      background-color: #dbe7ff;
                      border-color: #375dfb !important;
                    }

                    .ant-radio-wrapper-checked .ant-radio-inner {
                      border-color: green !important;
                      background-color: green !important;
                    }

                    .ant-radio-wrapper-checked .ant-radio-inner::hover {
                      border-color: green !important;
                      // background-color: green !important;
                    }
                  `}
                </style>
                <Flex vertical gap="middle" justifyContent="flex-start">
                  <Form.Item label="Status" name="status">
                    <Radio.Group
                      value={value}
                      onChange={handleChange}
                      name="status"
                      defaultValue="disable"
                      style={{ display: "block", textAlign: "left" }}
                    >
                      <Radio
                        style={{
                          display: "block",
                          borderTopRightRadius: "8px",
                          borderTopLeftRadius: "8px",
                          border: "1px solid #d9d9d9",
                          padding: "5px 0px 5px 10px",
                        }}
                        value="active"
                        className={value === "active" ? "selected" : ""}
                      >
                        Active
                      </Radio>
                      <Radio
                        style={{
                          display: "block",
                          borderBottomLeftRadius: "8px",
                          borderBottomRightRadius: "8px",
                          border: "1px solid #d9d9d9",
                          paddingLeft: 10,
                          padding: "5px 0px 5px 10px",
                        }}
                        value="disable"
                        className={value === "disable" ? "selected" : ""}
                      >
                        disable
                      </Radio>
                    </Radio.Group>
                  </Form.Item>
                </Flex>

                <Form.Item
                  label="Unit Usaha"
                  name="id_business_unit"
                  initialValue="61b9139c-86ff-4445-b826-7acc66d94479"
                  style={{}}
                >
                  <Select
                    onChange={handleChange}
                    options={[
                      {
                        value: "f139d9f9-d406-4fc2-92bf-bd660431c2bb",
                        label: "belawan butik",
                      },
                      {
                        value: "39d8cb82-0d6e-4997-87a3-e116b5e8296f",
                        label: "Retail",
                      },
                      {
                        value: "8e90f49e-b7d1-4528-ba93-ebc44e44d3a6",
                        label: "sabun",
                      },
                    ]}
                  />
                </Form.Item>

                <Flex vertical gap="middle" justifyContent="flex-start">
                  <Form.Item label="jabatan" name="id_position">
                    <Radio.Group
                      value={value}
                      onChange={handleChange}
                      style={{ display: "block", textAlign: "left" }}
                    >
                      <Radio
                        style={{
                          display: "block",
                          borderTopRightRadius: "8px",
                          borderTopLeftRadius: "8px",
                          border: "1px solid #d9d9d9",
                          padding: "5px 0px 5px 10px",
                        }}
                        value="7b45bbb4-196b-4785-8159-4515d0935f71"
                        className={
                          value === "7b45bbb4-196b-4785-8159-4515d0935f71"
                            ? "select"
                            : ""
                        }
                      >
                        Pimpinan
                      </Radio>
                      <Radio
                        style={{
                          display: "block",
                          border: "1px solid #d9d9d9",
                          paddingLeft: 10,
                          padding: "5px 0px 5px 10px",
                        }}
                        value="6c79898c-cbb9-4874-b745-158ac09849fe"
                        className={
                          value === "6c79898c-cbb9-4874-b745-158ac09849fe"
                            ? "select"
                            : ""
                        }
                      >
                        Admin
                      </Radio>
                      <Radio
                        style={{
                          display: "block",
                          borderBottomLeftRadius: "8px",
                          borderBottomRightRadius: "8px",
                          border: "1px solid #d9d9d9",
                          paddingLeft: 10,
                          padding: "5px 0px 5px 10px",
                        }}
                        value="6f5ac630-e35f-4b82-82ac-a770660e3755"
                        className={
                          value === "6f5ac630-e35f-4b82-82ac-a770660e3755"
                            ? "select"
                            : ""
                        }
                      >
                        Kasir
                      </Radio>
                    </Radio.Group>
                  </Form.Item>
                </Flex>
                <Form.Item
                  name="password"
                  label="Password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                  ]}
                >
                  <Input.Password />
                </Form.Item>

                <Form.Item
                  name="confirmPassword"
                  label="Konfirmasi Password"
                  dependencies={["password"]}
                  hasFeedback
                  rules={[
                    {
                      required: form.getFieldValue("password") !== "", // Hanya diperlukan jika password tidak kosong
                      message: "Konfirmasi password Anda!",
                    },
                    {
                      validator: validateConfirmPassword,
                    },
                  ]}
                  validateTrigger="onBlur" // Validasi saat nilai berubah
                  help={form.getFieldError("confirmPassword")} // Tampilkan pesan kesalahan
                >
                  <Input.Password />
                </Form.Item>
              </div>
            </div>
          </Col>
        </Row>
      </Form>
    </>
  );
};
export default TambahPengguna;
