import { Breadcrumb, Button, Flex, Form, Input, Select, message } from "antd";
import { Link } from "react-router-dom";
import { useState } from "react";

const TambahCategoryProduk = () => {
  const [isLoading, setIsLoading] = useState("");
  const [value, setValue] = useState("");
  const [form] = Form.useForm();

  const handleChange = (selectedValue) => {
    setValue(selectedValue);
  };

  const handleSubmitPengguna = async () => {
    try {
      const { id_business_unit, name } = form.getFieldsValue(); // Mendapatkan nilai dari seluruh field
  
      setIsLoading(true);
  
      const data = {
        id_business_unit,
        name
      };
  
      const response = await fetch('https://api-prolog-dev.binaries.id/master/product-category', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${'v2.local.ok27zrliz9nKGS2_eEHqfU4vI9qSrQTRNNU1GMEtVjXWsjhzl_P3zEop_nHPLE5Q5XYlLXpXjCtAj77nK2gdUQ2bN2qBvHLCdQ9qNVNM_ykrBOWLDACQeyXfTIHKYe-p0V8YkzHR1_rtsgiye-TXiajGCRT-pBjLwm05ZsE0oS9EyZ17z4pO0wBDd02sCBasIMKnV06CQP0RtBIQwy5nRpo40bcrot0r_HRHZs8i-dtt52phJhLtVM8RPeKa2JvSoawXapAjxsVj_6dslGAFElzp13seznKXPaik1iAC1NAacD2WywxUPV8clkAtW2f4YlbQU4esbBDsG9BHz9BOlne30cj9j_8.bnVsbA'}`

        },
        body: JSON.stringify(data)
      });
  
      if (!response.ok) {
        throw new Error('Failed to add data');
      }
  
      const responseData = await response.json();
      console.log("res", responseData);
  
      setIsLoading(false);
  
      if (responseData.status !== "success") {
        throw new Error(responseData.message);
      }
  
      message.success(responseData.message);
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
      message.error("Gagal menambah data");
    }

  
  };
  return (
    <div style={{height:'90vh'}}>
      <Breadcrumb style={{ marginTop: -30 }}>
        <Breadcrumb.Item>
          <Link to="/">Dashboard</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/category-product">product</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="category-product/add-category-product">
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
          Tambah Pengguna
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
            initialValue="61b9139c-86ff-4445-b826-7acc66d94479"
            style={{padding:20, backgroundColor:'#FFFFFF'}}
          >
            <Select
              onChange={handleChange}
              style={{height:'52px'}}
              
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
          <Form.Item name="name" label="Nama"   style={{padding:20, backgroundColor:'#FFFFFF'}}>
            <Input placeholder="isi name" style={{height:'52px'}}></Input>
          </Form.Item>
        </Form>
      </Flex>
    </div>
  );
};

export default TambahCategoryProduk;
