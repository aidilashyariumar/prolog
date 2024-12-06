import {
  Avatar,
  Breadcrumb,
  Button,
  Col,
  Flex,
  Form,
  Input,
  Row,
  Select,
  Upload,
  message,
} from "antd";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { storePengguna } from "../../services/pengguna";
import modalComponent from "../../components/modalComponent";
import { getAllUnitBusinessCategory } from "../../services/unitBusiness";
import { getAllCategoryProduct } from "../../services/categoryProduct";
import "./style.css";
import useFilePreview from '../hooks/useFilePreview';

const { Option } = Select;

// const getBase64 = (img, callback) => {
//   const reader = new FileReader();
//   reader.addEventListener("load", () => callback(reader.result));
//   reader.readAsDataURL(img);
// };

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};
const beforeUpload = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

const TambahProduct = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const [data, setData] = useState([]);
  const [dataCategory, setDataCategory] = useState([]);

  const [gambar, setGambar] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const onDrop = (acceptedFiles) => {
    console.log("Dropped files:", acceptedFiles); // Log dropped files

    setGambar(acceptedFiles[0]);

    const reader = new FileReader();
    reader.addEventListener("load", () => setPreviewImage(reader.result));
    try {
      reader.readAsDataURL(acceptedFiles[0]); // Handle potential errors
    } catch (error) {
      console.error("Error reading file:", error); // Log error message
    }
  };

  useEffect(() => {
    getData();
    getDataCategory();
  }, []);

  const handleChange = (selectedValue) => {
    setValue(selectedValue);
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
        content: "Data Anda telah disimpan dengan sukses.",
      });
      navigate("/pengguna");
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
    }
  };
  const handleRemove = () => {
    setPreviewImage(null);
  };

  const getData = async () => {
    try {
      const business = await getAllUnitBusinessCategory();
      const dataArray = Object.values(business.data);
      const formattedData = dataArray.map((item, index) => ({
        ...item,
        key: index + 1,
      }));
      console.log("getAllUnitBusinessCategory", formattedData);
      setData(formattedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const getDataCategory = async () => {
    try {
      const business = await getAllCategoryProduct();
      const dataArray = Object.values(business.data);
      const formattedData = dataArray.map((item, index) => ({
        ...item,
        key: index + 1,
      }));
      console.log("getAllCategoryProduct", formattedData);
      setData(formattedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

    const { Dragger } = Upload;
    const TambahProduct = ({ addFile, removeFile }) => {
      const [handlePreview, previewContent] = useFilePreview();
      const beforeUploadHandler = (file) => {
        addFile(file);
        return false;
      }
    };

  return (
    <>
      <Breadcrumb style={{ marginTop: -30 }}>
        <Breadcrumb.Item>
          <Link to="/">Dashboard</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/product">Produk</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="">Tambah Produk</Link>
        </Breadcrumb.Item>
      </Breadcrumb>
      <Form
        name="trigger"
        form={form}
        layout="vertical"
        autoComplete="off"
        style={{ maxHeight: "90vh", overflow: "auto" }}
      >
        <Flex justify="space-between">
          <p
            style={{
              textAlign: "left",
              fontSize: 24,
              fontWeight: 600,
              marginTop: 8,
            }}
          >
            Tambah Produk
          </p>

          <Button type="primary" onClick={handleSubmitPengguna}>
            Tambah
          </Button>
        </Flex>

        <Row style={{ marginTop: "-15px" }} justify="space-between">
          <Col flex="1 1 200px">
            <div
              style={{
                backgroundColor: "white",
                marginBottom: "20px",
                borderRadius: 10,
                maxHeight: "80vh",
                width: "90%",
                overflow: "auto",
                padding: " 0px -20px 0px -20px",
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
              <div
                style={{
                  width: "890px",
                  margin: "30px auto 0px auto",
                }}
              >
                <Flex>
                  <Form.Item
                    label="Unit Usaha"
                    name="id_business_unit_categories"
                    style={{ marginTop: "-15px" }}
                  >
                    <Select
                      onChange={handleChange}
                      placeholder="pilih category unit usaha"
                      style={{ width: "430px", marginRight: 10, height: 40 }}
                    >
                      {data.map((item) => (
                        <Option key={item.key} value={item.id}>
                          {item.name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>

                  <Form.Item
                    label="Kategori"
                    name="id_business_unit_categories_1"
                    style={{ marginTop: "-15px" }}
                  >
                    <Select
                      onChange={handleChange}
                      placeholder="pilih category unit usaha"
                      style={{ width: "430px", height: 40 }}
                    >
                      {data.map((item) => (
                        <Option key={item.key} value={item.id}>
                          {item.name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Flex>

                <Flex>
                  <Form.Item
                    label="coba"
                    name="product_code"
                    style={{ marginTop: "-15px" }}
                  >
                    <Input
                      placeholder="Masukkan Username"
                      style={{ width: "600px", height: 40, marginRight: 10 }}
                      className="input-buttom"
                    />
                  </Form.Item>
                  <Form.Item
                    label="Username"
                    name="username"
                    style={{ marginTop: "-15px" }}
                  >
                    <Input
                      placeholder="Masukkan Username"
                      style={{ width: "261px", height: 40 }}
                      className="input-top"
                    />
                  </Form.Item>
                </Flex>
                <Flex>
                  <Form.Item
                    label="Username"
                    name="username"
                    style={{ marginTop: "-15px" }}
                  >
                    <Input
                      placeholder="Masukkan Username"
                      style={{ width: "261px", marginRight: 10, height: 40 }}
                      className="input-top"
                    />
                  </Form.Item>
                  <Form.Item
                    label="coba"
                    name="product_code"
                    style={{ marginTop: "-15px" }}
                  >
                    <Input
                      placeholder="Masukkan Username"
                      style={{ width: "600px", height: 40 }}
                      className="input-buttom"
                    />
                  </Form.Item>
                </Flex>
                <Flex>
                  <Form.Item
                    label="Username"
                    name="username"
                    style={{ marginTop: "-15px" }}
                  >
                    <Input
                      placeholder="Masukkan Username"
                      style={{ width: "261px", marginRight: 10, height: 40 }}
                      className="input-top"
                    />
                  </Form.Item>
                  <Form.Item
                    label="coba"
                    name="product_code"
                    style={{ marginTop: "-15px" }}
                  >
                    <Input
                      placeholder="Masukkan Username"
                      style={{ width: "600px", height: 40 }}
                      className="input-buttom"
                    />
                  </Form.Item>
                </Flex>
              </div>
            </div>
          </Col>
          <Col flex="0 1 300px" style={{ marginLeft: "10px" }}>
            <div
              style={{
                backgroundColor: "white",
                borderRadius: 10,
                maxHeight: "80vh",
                width: "100%",
                overflow: "auto",
                marginBottom: 100,
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
                Gambar Produk
              </p>
              <hr
                style={{
                  backgroundColor: "grey",
                  borderColor: "grey",
                  border: "1px solid #F0F0F0",
                }}
              />
              <Flex>
                <Form.Item name="photo">
                <Dragger
            multiple={true}
            onRemove={removeFile}
            showUploadList={true}
            listType="picture-card"
            beforeUpload={beforeUploadHandler}
            onPreview={handlePreview}
            accept="image/*"
          >
            <p className="ant-upload-drag-icon">
              <PlusOutlined />
            </p>
            <p className="ant-upload-text">
              Click this area or drag files to upload
            </p>
          </Dragger>
          {previewContent}
                </Form.Item>
              </Flex>
            </div>
            {/* </Flex> */}
          </Col>
        </Row>
      </Form>
    </>
  );
};
export default TambahProduct;
