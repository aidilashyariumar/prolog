import {
  Breadcrumb,
  Button,
  Flex,
  Space,
  Table,
  message,
  Avatar,
  Modal,
} from "antd";
import { Link, useNavigate } from "react-router-dom";
import Search from "antd/es/input/Search";
import {
  RiAddLine,
  RiDeleteBin6Line,
  RiEdit2Line,
  RiDownload2Line,
} from "react-icons/ri";
import { useState, useEffect } from "react";
import { getAllPengguna, deletePengguna } from "../../services/pengguna";
import Deletee from "../../assets/icon/delete.svg";
import PaginationComponent from "../../components/pagination";

const Pengguna = () => {
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [deleteModalRecord, setDeleteModalRecord] = useState(null);
  const [tableData, setTableData] = useState({
    items: [],
    current: 1,
    pageSize: 5,
  });
  // State untuk menentukan apakah modal terbuka atau tidak

  useEffect(() => {
    getData();
  }, []);

  const handleNext = async () => {
    try {
      const pengguna = await getAllPengguna(
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
      const pengguna = await getAllPengguna(
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
      const pengguna = await getAllPengguna(
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
      const pengguna = await getAllPengguna();

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
      await deletePengguna(deleteModalRecord.id);
      message.success("Pengguna berhasil dihapus");
      setIsModalVisible(false);
      getData();
    } catch (error) {
      console.error("Error deleting pengguna:", error);
      message.error("Gagal menghapus pengguna");
    }
  };

  const columns = [
    {
      title: "No",
      dataIndex: "key",
      render: (text, record, index) => index + 1,
      style: { // Menambahkan gaya untuk kolom "No"
        textAlign: "center", // Atur alignment teks menjadi center
        fontWeight: "bold", // Atur tebal teks menjadi bold
        color: "blue", // Atur warna teks menjadi biru
      },
    },
    {
      title: "UNIT USAHA",
      dataIndex: "business_unit",
    },
    {
      title: "PENGGUNA",
      dataIndex: "name",
      render: (text, record) => (
        <span>
          {/* <Image src={record.photo} alt={record.name} width={50}  style={{borderRadius:50,}}/> */}
          <Avatar
            style={{ marginRight: 10 }}
            src={record.photo}
            alt={record.name}
            size={35}
          />
          {text}
        </span>
      ),
    },
    {
      title: "USERNAME",
      dataIndex: "username",
    },
    {
      title: "JABATAN",
      dataIndex: "position",
    },
    {
      title: "STATUS",
      dataIndex: "status",
      render: (text) => (
        <span
          style={{
            backgroundColor: text === "active" ? "#CCF9DC" : "#FADFDF",
            color: text === "active" ? "#0C7834" : "#DC2626",
            padding: "2px 12px 2px 12px",
            borderRadius: 20,
          }}
        >
          {text}
        </span>
      ),
    },
    {
      title: "ACTION",
      dataIndex: "action",
      render: (text, record) => (
        <Space>
          <Modal
            visible={isModalVisible}
            // title="Konfirmasi Penghapusan"
            onCancel={() => setIsModalVisible(false)}
            footer={false}
            closable={false}
            // style={{ maxWidth:"200px !important" }}
            width={302}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <img src={Deletee} size={200} style={{ margin: "0 auto" }} />
              <p style={{ textAlign: "center" }}>
                Data akan terhapus permanen, apakah anda yakin ingin
                menghapusnya?
              </p>
              <div className="div">
                <Button
                  key="delete"
                  style={{
                    backgroundColor: "red",
                    color: "white",
                    width: "224px",
                    height: "46px",
                    borderRadius: "60px",
                  }}
                  onClick={handleDelete}
                >
                  Ya, Hapus
                </Button>
              </div>
              <div>
                <Button
                  key="cancel"
                  // type="dashed"
                  onClick={() => setIsModalVisible(false)}
                  style={{
                    width: "224px",
                    height: "46px",
                    borderRadius: "60px",
                    color: "red",
                    border: "none",
                    boxShadow: "none",
                  }}
                >
                  Tidak
                </Button>
              </div>
            </div>
          </Modal>

          <Button
            icon={<RiEdit2Line />}
            style={{
              border: "none",
              backgroundColor: "transparent",
              boxShadow: "none",
            }}
            onClick={() =>
              navigate(`/pengguna/edit-pengguna/${record.id}`, {
                state: {
                  record,
                },
              })
            }
          />
          <Button
            style={{
              border: "none",
              backgroundColor: "transparent",
              boxShadow: "none",
            }}
            onClick={() => {
              setIsModalVisible(true); // Buka modal konfirmasi penghapusan
              setDeleteModalRecord(record); // Simpan data pengguna yang akan dihapus
            }}
          >
            <RiDeleteBin6Line />
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Breadcrumb style={{ marginTop: -30 }} separator=">">
        <Breadcrumb.Item>
          <Link to="/">Dashboard</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link style={{ fontWeight: 500, color: "black" }}>Pengguna</Link>
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
        Pengguna
      </p>
      <div className="table">
        <Flex justify="space-between" style={{ padding: 10 }}>
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
              <Link to="add-pengguna">Pengguna</Link>
            </Button>
          </Space>
        </Flex>
        <Table
          style={{ height: "50vh", overflowY: "auto" }}
          columns={columns}
          dataSource={tableData.items}
          rowClassName={(record, index) =>
            index % 2 === 0 ? "odd-row" : "even-row"
          }
          pagination={false}
        />
      </div>
      <PaginationComponent
        current={tableData.current}
        pageSize={tableData.pageSize}
        handleNext={handleNext}
        handlePrev={handlePrev}
        handleChangePage={handleChangePage}
        dataCurrent={tableData.total}
      />
    </>
  );
};
export default Pengguna;
