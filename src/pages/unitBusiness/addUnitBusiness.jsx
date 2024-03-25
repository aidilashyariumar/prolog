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
      
        const status = 'active'; 

      const f = new FormData();
      f.append("address", address);
      f.append("business_unit_name", business_unit_name);
      f.append("id_business_unit_categories", id_business_unit_categories);
      f.append("photo", photo.file);
      f.append("phone", phone);
      f.append("status", status);

      const response = await storeUnitBusiness(f);

      console.log("res", response);

      setIsLoading(false);

      if (response.status !== "success") {
        message.error("gagal menambah data");
        return;
      }

    //   message.success(response.message);
      Modal.success({
        title: 'Data Berhasil Disimpan',
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
      <Form name="trigger" form={form} layout="vertical" autoComplete="off" >
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
export default TambahUnitBusiness;
