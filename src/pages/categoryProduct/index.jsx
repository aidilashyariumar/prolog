import {
  Breadcrumb,
  Button,
  Flex,
  Space,
  Table,
  message,
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
import {
  deleteCategoryProduct,
  getAllCategoryProduct,
} from "../../services/categoryProduct";
import DeleteConfirmationModal from "../../components/modalComponent";
import PaginationComponent from "../../components/pagination";

const CategoryProduct = () => {
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [deleteModalRecord, setDeleteModalRecord] = useState(null);
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
      const pengguna = await getAllCategoryProduct(
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
      const pengguna = await getAllCategoryProduct(
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
      const pengguna = await getAllCategoryProduct(
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
      const pengguna = await getAllCategoryProduct();

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
      await deleteCategoryProduct(deleteModalRecord.id);
      message.success("KategorI Produk berhasil dihapus");
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
    },
    {
      title: "UNIT USAHA",
      dataIndex: "business_unit",
    },
    {
      title: "KATEGORI PRODUK",
      dataIndex: "name",
    },

    {
      title: "ACTION",
      dataIndex: "action",
      render: (text, record) => (
        <Space>
          {/* <Link to={`/category-product/edit-category-product/${record.id}`}> */}

          <Button
            icon={<RiEdit2Line />}
            style={{
              border: "none",
              backgroundColor: "transparent",
              boxShadow: "none",
            }}
            onClick={() =>
              navigate(
                `/category-product/edit-category-product/${record.id_business_unit}`,
                {
                  state: {
                    record,
                  },
                }
              )
            }
          />
          {/* </Link> */}
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
          <DeleteConfirmationModal
            visible={isModalVisible}
            onCancel={() => {
              setIsModalVisible(false);
            }}
            onConfirm={handleDelete}
            //  deletee={Deletee}
          ></DeleteConfirmationModal>
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
          <Link style={{ fontWeight: 500, color: "black" }}>
            Category Product
          </Link>
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
        Kategori Produk
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
              <Link to="/category-product/add-category-product">Tambah</Link>
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
export default CategoryProduct;
