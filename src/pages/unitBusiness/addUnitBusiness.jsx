import {
  Avatar,
  Breadcrumb,
  Button,
  Flex,
  Form,
  Input,
  Modal,
  Select,
  Upload,
  message,
} from "antd";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  getAllUnitBusinessCategory,
  storeUnitBusiness,
} from "../../services/unitBusiness";
import { RiAddLine } from "react-icons/ri";
import SuksesConfirmationModal from "../../components/modalSuccessComponent";
const { Option } = Select;

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};

const TambahUnitBusiness = () => {
  const [value, setValue] = useState("");
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [previewimage, setPreviewImage] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleChange = (selectedValue) => {
    setValue(selectedValue);
  };

  const handleSubmitPengguna = async () => {
    try {
      const {
        business_unit_name,
        id_business_unit_categories,
        address,
        photo,
        phone,
      } = form.getFieldsValue(); // Mendapatkan nilai dari seluruh field

      setIsLoading(true);
      // console.log(form.getFieldValue)

      const status = "active";

      const f = new FormData();
      f.append("address", address);
      f.append("business_unit_name", business_unit_name);
      f.append("id_business_unit_categories", id_business_unit_categories);
      f.append("phone", phone);
      f.append("status", status);
      if (photo) {
        f.append("photo", photo.file);
      }

      const response = await storeUnitBusiness(f);

      console.log("res", response);

      setIsLoading(false);

      if (response.status !== "success") {
        message.error("gagal menambah data");
        return;
      }

      setIsModalVisible(true);
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
    }
  };
  const handleRemove = () => {
    setPreviewImage(null);
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const business = await getAllUnitBusinessCategory();
      const dataArray = Object.values(business.data);
      const formattedData = dataArray.map((item, index) => ({
        ...item,
        key: index + 1,
      }));
      setData(formattedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      <Breadcrumb style={{ marginTop: -30 }} separator=">">
        <Breadcrumb.Item>
          <Link to="/">Dashboard</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/unit-business">Unit Usaha</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link style={{ fontWeight: 500, color: "black" }}>
            Tambah Unit Usaha
          </Link>
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
            Tambah Unit Usaha
          </p>

          <Button
            type="primary"
            icon={<RiAddLine />}
            onClick={handleSubmitPengguna}
            style={{ marginRight: "20px" }}
          >
            Tambah
          </Button>
        </Flex>

        <div
          style={{
            backgroundColor: "white",
            borderRadius: 10,
            maxHeight: "80vh",
            width: "98%",
            overflow: "auto",
            marginTop: "-15px",
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
            Informasi Unit Usaha
          </p>
          <hr
            style={{
              backgroundColor: "grey",
              borderColor: "grey",
              border: "1px solid #F0F0F0",
            }}
          />
          <div style={{ width: "90%", margin: "0px auto 0px auto" }}>
            <p style={{ textAlign: "left" }}>Foto Unit Usaha</p>
            <Flex wrap="wrap" gap="small" style={{ alignItems: "center" }}>
              <Avatar src={previewimage} shape="square" size={96} />
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
                          style={{ marginLeft: 10 }}
                          // icon={<DeleteOutlined />}
                          onClick={handleRemove}
                        >
                          Hapus
                        </Button>
                      )}
                    </Form.Item>
                  </Flex>
                  <p style={{ position: "absolute", top: 340 }}>
                    Gambar harus berukuran 1:1 dengan file PNG/JPEG
                  </p>
                </div>
              </Flex>
            </Flex>

            <Form.Item
              label="Nama Unit Usaha"
              name="business_unit_name"
              rules={[{ required: true }]}
            >
              <Input placeholder="Masukkan Nama Lengkap" />
            </Form.Item>
            <Form.Item
              label="Unit Usaha"
              name="id_business_unit_categories"
              style={{ marginTop: "-15px" }}
            >
              <Select
                onChange={handleChange}
                placeholder="pilih category unit usaha"
              >
                {data.map((item) => (
                  <Option key={item.key} value={item.id}>
                    {item.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="Alamat"
              name="address"
              style={{ marginTop: "-15px" }}
            >
              <Input placeholder="Masukkan Username" />
            </Form.Item>

            <Form.Item
              label="Nomor HP"
              name="phone"
              style={{ marginTop: "-15px" }}
            >
              <Input placeholder="+62 xxx-xxxx-xxxx" />
            </Form.Item>
            <Form.Item
              name="status"
              style={{ marginTop: "-15px" }}
              value="active"
              hidden={true}
            >
              <Input placeholder="+62 xxx-xxxx-xxxx" value="active" />
            </Form.Item>
          </div>
        </div>
      </Form>
      <SuksesConfirmationModal
        visible={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          navigate("/unit-business");
        }}
        //  deletee={Deletee}
      />
    </>
  );
};
export default TambahUnitBusiness;
