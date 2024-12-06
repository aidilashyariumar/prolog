import React, { useState, useEffect } from "react";
import { Breadcrumb, Button, Flex, Form, Input, Select, message } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  getSpesifikCategoryProduct,
  updateCategoryProduct,
} from "../../services/categoryProduct";
import { getAllUnitBusiness } from "../../services/unitBusiness";

const { Option } = Select;

const EditCategoryProduk = () => {
  const location = useLocation();
  let record = location.state.record;

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [selectedUnit, setSelectedUnit] = useState(record.id);
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    fetchData();
    form.setFieldsValue({
      name: record.name,
      id_business_unit: record.business_unit,
    });
    fetchDataSpesifik();
  }, []);

  const fetchData = async () => {
    try {
      const response = await getAllUnitBusiness();
      setData(response.data.items);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchDataSpesifik = async () => {
    try {
      const res = await getSpesifikCategoryProduct();
      setData(res.data.items);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSubmit = async () => {
    try {
      const formData = await form.validateFields();
      const idList = selectedUnit;
      const name = formData.name;

      setIsLoading(true);
      await updateCategoryProduct({
        id: data.id,
        id_business_unit: idList,
        name: name,
      });
      navigate("/category-product");
      message.success("Category product updated successfully");
    } catch (error) {
      const err = error.response.data.message;
      message.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Breadcrumb style={{ marginTop: -30 }} separator=">">
        <Breadcrumb.Item>
          <Link to="/">Dashboard</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/category-product">Product</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link style={{ fontWeight: 500, color: "black" }}>
            Edit Kategori Produk
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
          Edit Kategori Produk
        </p>
        <Button type="primary" onClick={handleSubmit}>
          Simpan
        </Button>
      </Flex>

      <Flex gap="middle" vertical>
        <Form form={form} layout="vertical">
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
              onChange={(value) => {
                setSelectedUnit(value);
              }}
              placeholder="Pilih unit usaha"
              style={{ height: 52 }}
              value={selectedUnit}
            >
              {data.map((item) => (
                <Option key={item.id} value={item.id} defaultValue={item.id}>
                  {item.business_unit_name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Nama"
            name="name"
            style={{ padding: 20, backgroundColor: "#FFFFFF" }}
          >
            <Input
              placeholder="Nama kategori produk"
              style={{ height: 52 }}
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
          </Form.Item>
        </Form>
      </Flex>
    </div>
  );
};

export default EditCategoryProduk;
