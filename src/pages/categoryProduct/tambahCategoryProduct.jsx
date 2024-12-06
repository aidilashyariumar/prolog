import { Breadcrumb, Button, Flex, Form, Input, Select, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllUnitBusiness } from "../../services/unitBusiness";
import SuksesConfirmationModal from "../../components/modalSuccessComponent";
const { Option } = Select;

const TambahCategoryProduk = () => {
  const [isLoading, setIsLoading] = useState("");
  const [value, setValue] = useState("");
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();

  const handleChange = (selectedValue) => {
    setValue(selectedValue);
  };

  const handleSubmitPengguna = async () => {
    try {
      const { id_business_unit, name } = form.getFieldsValue(); // Mendapatkan nilai dari seluruh field

      setIsLoading(true);

      const data = {
        id_business_unit,
        name,
      };

      const response = await fetch(
        "https://api-prolog-dev.binaries.id/master/product-category",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${"v2.local.ok27zrliz9nKGS2_eEHqfU4vI9qSrQTRNNU1GMEtVjXWsjhzl_P3zEop_nHPLE5Q5XYlLXpXjCtAj77nK2gdUQ2bN2qBvHLCdQ9qNVNM_ykrBOWLDACQeyXfTIHKYe-p0V8YkzHR1_rtsgiye-TXiajGCRT-pBjLwm05ZsE0oS9EyZ17z4pO0wBDd02sCBasIMKnV06CQP0RtBIQwy5nRpo40bcrot0r_HRHZs8i-dtt52phJhLtVM8RPeKa2JvSoawXapAjxsVj_6dslGAFElzp13seznKXPaik1iAC1NAacD2WywxUPV8clkAtW2f4YlbQU4esbBDsG9BHz9BOlne30cj9j_8.bnVsbA"}`,
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add data");
      }

      const responseData = await response.json();
      console.log("res", responseData);

      setIsLoading(false);

      if (responseData.status !== "success") {
        throw new Error(responseData.message);
      }

      setIsModalVisible(true);
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
      message.error("Gagal menambah data");
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await getAllUnitBusiness();
      setData(response.data.items);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  return (
    <div style={{ height: "90vh" }}>
      <Breadcrumb style={{ marginTop: -30 }} separator=">">
        <Breadcrumb.Item>
          <Link to="/">Dashboard</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/category-product">product</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link style={{ fontWeight: 500, color: "black" }}>
            Tambah Pengguna
          </Link>
        </Breadcrumb.Item>
      </Breadcrumb>

      <Flex justify="space-between">
        <p
          style={{
            textAlign: "left",
            fontSize: 24,
            fontWeight: 600,
            marginTop: 8,
          }}
        >
          Tambah Kategori Produk
        </p>

        <Button type="primary" onClick={handleSubmitPengguna}>
          Tambah
        </Button>
      </Flex>

      <Flex gap="middle" vertical>
        <Form name="trigger" form={form} layout="vertical" autoComplete="off">
          <Form.Item
            label="Unit Usaha"
            name="id_business_unit"
            style={{
              padding: 20,
              backgroundColor: "#FFFFFF",
              marginTop: "-15px",
            }}
          >
            <Select
              // onChange={(value) => setSelectedUnit(value)}
              onChange={handleChange}
              placeholder="Pilih unit usaha"
              style={{ height: 52 }}
              // value={selectedUnit}
            >
              {data.map((item) => (
                <Option key={item.key} value={item.id}>
                  {item.business_unit_name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="name"
            label="Nama"
            style={{ padding: 20, backgroundColor: "#FFFFFF" }}
          >
            <Input placeholder="isi name" style={{ height: "52px" }}></Input>
          </Form.Item>
        </Form>
      </Flex>
      <SuksesConfirmationModal
        visible={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          navigate("/category-product");
        }}
        //  deletee={Deletee}
      ></SuksesConfirmationModal>
    </div>
  );
};

export default TambahCategoryProduk;
