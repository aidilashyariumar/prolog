import {
  Breadcrumb,
  Button,
  Flex,
  Space,
  Avatar,
  Card,
} from "antd";
import { Link } from "react-router-dom";
import Search from "antd/es/input/Search";
import {
  RiAddLine,
  RiDeleteBin6Line,
  RiEdit2Line,
  RiDownload2Line,
} from "react-icons/ri";
import { useState, useEffect } from "react";
import './style.css';
import { getAllUnitBusiness } from "../../services/unitBusiness";

const UnitBusiness = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const bisnisUnit = await getAllUnitBusiness();
      const dataArray = Object.values(bisnisUnit.data.items);
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
          <Link to="/unit-business">Unit Usaha</Link>
        </Breadcrumb.Item>
      </Breadcrumb>

      <p
        style={{
          textAlign: "left",
          fontSize: 24,
          fontWeight: 600,
          marginTop: 8,
        }}
      >
        Unit Usaha
      </p>
      <div>
        <Flex  style={{ paddingBottom:10, justifyContent:'space-between'}}>
          <Search
            placeholder="cari apa"
            style={{
              width: 200,
              border: "none",
              background: "transparent",
              borderBlock: "none",
            }}
          />
          <Space size={10} style={{ marginLeft: "auto", width: 220 }}>
            <Button icon={<RiDownload2Line />}>Ekspor</Button>
            <Button type="primary" icon={<RiAddLine />}>
              <Link to="/unit-business/add-unit-business">Tambah</Link>
            </Button>
          </Space>
        </Flex>
        
{data.map(item =>
        <Flex style={{alignItems:'center', justifyContent:'space-between'}}>
          <Avatar shape="square"  src={item.image} size={150} />
          <Card style={{ width:"75%", padding:'0px !important'}}>
            <table>
                <tr>
                    <td>Unit Usaha</td>
                    <td>:</td>
                    <td>{item.business_unit_name}</td>
                </tr>
                <tr>
                    <td>Kategori</td>
                    <td>:</td>
                    <td>{item.business_category_name}</td>
                </tr>
                <tr>
                    <td>Alamat</td>
                    <td>:</td>
                    <td>{item.address}</td>
                </tr>
                <tr>
                    <td>Nomor Hp</td>
                    <td>:</td>
                    <td>{item.phone}</td>
                </tr>
            </table>
            <div className="btnn">
            <Link to="/category-product/add-category-product" >
              <Button type="primary" icon={<RiEdit2Line />} />
             </Link>
            <Link to="/category-product/add-category-product" >
              <Button type="primary" icon={<RiDeleteBin6Line/>} />
             </Link>
                {/* <Button>ha</Button> */}
            </div>
          </Card>
        </Flex>
)}
      </div>
    </>
  );
};
export default UnitBusiness;
