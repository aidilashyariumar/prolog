import React, { useState, useEffect } from "react";
import {
  Breadcrumb,
  Button,
  Flex,
  Input,
  message,
  Modal,
  Space,
  Card,
  Avatar,
} from "antd";
import { Link, useNavigate } from "react-router-dom";
import {
  RiAddLine,
  RiSearch2Line,
  RiDownload2Line,
  RiEdit2Line,
  RiDeleteBin6Line,
} from "react-icons/ri";
import {
  deleteUnitBusiness,
  getAllUnitBusiness,
} from "../../services/unitBusiness";
import PaginationComponent from "../../components/pagination";
import "./style.css";
import DeleteConfirmationModal from "../../components/modalComponent";


const UnitBusiness = () => {
  // const [data, setData] = useState({ items: [], pageSize: 5, current: 1 });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [deleteModalRecord, setDeleteModalRecord] = useState(null);
  const navigate = useNavigate();
  const [tableData, setTableData] = useState({
    items: [],
    current: 1,
    pageSize: 5,
  });

  useEffect(() => {
    getData();
  }, []);

  const handleNext = async () => {
    try {
      const pengguna = await getAllUnitBusiness(
        tableData.current + 1,
        tableData.pageSize,
        tableData.total
      );
      const { items, current, page_size, total } = pengguna.data;

      setTableData({
        items: items,
        current,
        pageSize: page_size,
        total: total,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const handlePrev = async () => {
    try {
      const pengguna = await getAllUnitBusiness(
        tableData.current === 1 ? 1 : tableData.current - 1,
        tableData.pageSize,
        tableData.total
      );
      const { items, current, page_size, total } = pengguna.data;

      setTableData({
        items: items,
        current,
        pageSize: page_size,
        total: total,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const handleChangePage = async (e) => {
    console.log(e.target.value);
    try {
      const pengguna = await getAllUnitBusiness(
        tableData.current,
        e.target.value,
        tableData.total
      );
      const { items, current, page_size, total } = pengguna.data;

      setTableData({
        items: items,
        current,
        pageSize: page_size,
        total: total,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const getData = async () => {
    try {
      const pengguna = await getAllUnitBusiness();

      const { items, current, page_size, total } = pengguna.data;

      setTableData({
        items: items,
        current,
        pageSize: page_size,
        total: total,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteUnitBusiness(deleteModalRecord.id);
      message.success("Unit Usaha berhasil dihapus");
      setIsModalVisible(false);
      getData();
    } catch (error) {
      console.error("Error deleting Unit Usaha:", error);
      message.error("Gagal menghapus Unit Usaha");
    }
  };

  return (
    <>
      <Breadcrumb style={{ marginTop: -30 }} separator=">">
        <Breadcrumb.Item>
          <Link to="/">Dashboard</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link style={{ fontWeight: 500, color: "black" }}>Unit Usaha</Link>
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
      <div style={{ height: "80vh", overflow: "auto" }}>
        <Flex style={{ paddingBottom: 10, justifyContent: "space-between" }}>
          <Input
            size="large"
            placeholder="Search"
            style={{ width: "80%" }}
            prefix={<RiSearch2Line />}
          />

          <Space size={10} style={{ marginLeft: "auto", width: 220 }}>
            <Button icon={<RiDownload2Line />}>Ekspor</Button>
            <Button type="primary" icon={<RiAddLine />}>
              <Link to="/unit-business/add-unit-business">Tambah</Link>
            </Button>
          </Space>
        </Flex>

        {tableData.items.map((item) => (
          <Flex
            key={item.id}
            style={{
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "25px",
              gap: 25,
            }}
          >
            <Avatar
              shape="square"
              src={item.image}
              size={190}
              style={{ backgroundColor: "grey" }}
            />
            <Card
              style={{
                flex: 1,
                padding: "0px !important",
                boxShadow: "black solid 50px 10px",
              }}
            >
              <table cellSpacing={10}>
                <tr>
                  <td className="titel">Unit Usaha</td>
                  <td>:</td>
                  <td className="isi">{item.business_unit_name}</td>
                </tr>
                <tr>
                  <td className="titel">Kategori</td>
                  <td>:</td>
                  <td className="isi">{item.business_category_name}</td>
                </tr>
                <tr>
                  <td className="titel">Alamat</td>
                  <td>:</td>
                  <td className="isi">{item.address}</td>
                </tr>
                <tr>
                  <td className="titel">Nomor Hp</td>
                  <td>:</td>
                  <td className="isi">{item.phone}</td>
                </tr>
              </table>
              <div className="btnn">
                <Flex gap={10}>  
                  <Button
                    icon={<RiEdit2Line style={{ fontSize: "20px" }} />}
                    style={{
                      border: "1px solid #375DFB",
                      color: "#375DFB",
                      width: "40px",
                      height: "40px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    onClick={() =>
                      navigate(`/unit-business/edit-unit-business/${item.id}`, {
                        state: { record: item },
                      })
                    }              
                  />
                  {/* </div> */}
      
          <DeleteConfirmationModal
            visible={isModalVisible}
            onCancel={() => {
              setIsModalVisible(false);
            }}
            onConfirm={handleDelete}
            //  deletee={Deletee}
          />

                  {/* <div> */}
                  <Button
                    style={{
                      border: "1px solid red",
                      color: "red",
                      width: "40px",
                      height: "40px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    onClick={() => {
                      setIsModalVisible(true);
                      setDeleteModalRecord(item);
                    }}
                    icon={<RiDeleteBin6Line style={{ fontSize: "20px" }} />}
                  />
                </Flex>
                {/* <RiDeleteBin6Line
                      style={{
                        margin: "0px auto",
                       
                        flexShrink: 0,
                      }}
                    /> */}
                {/* </Button> */}
              </div>
            </Card>
          </Flex>
        ))}
        <PaginationComponent
          current={tableData.current}
          pageSize={tableData.pageSize}
          handleNext={handleNext}
          handlePrev={handlePrev}
          handleChangePage={handleChangePage}
          dataCurrent={tableData.total}
        />


      </div>
    </>
  );
};

export default UnitBusiness;
