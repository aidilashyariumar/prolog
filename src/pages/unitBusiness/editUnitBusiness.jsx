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
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  getAllUnitBusinessCategory,
  updateUnitBusiness,
} from "../../services/unitBusiness";
import { RiAddLine } from "react-icons/ri";
const { Option } = Select;

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};

const EditUnitBusiness = () => {
  const location = useLocation();
  const record = location.state.record;
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    getData();
    form.setFieldsValue({
      business_unit_name: record.business_unit_name,
      id_business_unit_categories: record.id_business_unit_categories,
      address: record.address,
      phone: record.phone,
      photo: record.image, // Gunakan properti image dari record untuk nilai awal photo
    });
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

  const handleSubmit = async () => {
    try {
      const {
        business_unit_name,
        id_business_unit_categories,
        address,
        phone,
        photo,
      } = form.getFieldsValue();

      setIsLoading(true);

      const status = "active";

      const formData = new FormData();
      formData.append("business_unit_name", business_unit_name);
      formData.append(
        "id_business_unit_categories",
        id_business_unit_categories
      );
      formData.append("address", address);
      formData.append("phone", phone);
      formData.append("status", status);
      formData.append("photo", photo.file); // Ambil file dari properti photo

      const response = await updateUnitBusiness(formData);

      setIsLoading(false);

      if (response.status !== "success") {
        message.error("Gagal mengupdate data");
        return;
      }

      Modal.success({
        title: "Data Berhasil Diupdate",
        content: "Data telah berhasil diupdate.",
      });
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
    }
  };

  const handleRemove = () => {
    setPreviewImage(null);
    form.setFieldsValue({ photo: undefined }); // Set nilai photo pada form menjadi undefined
  };

  const handleChange = (value) => {
    console.log(`selected ${value}`);
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
            Edit Unit Usaha
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
            Edit Unit Usaha
          </p>

          <Button
            type="primary"
            icon={<RiAddLine />}
            onClick={handleSubmit}
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
              <Avatar src={previewImage} shape="square" size={96} />
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
                      {previewImage && (
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
    </>
  );
};

export default EditUnitBusiness;
