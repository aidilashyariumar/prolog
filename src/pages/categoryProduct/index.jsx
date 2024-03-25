import {
  Breadcrumb,
  Button,
  Flex,
  Space,
  Table,
  Popconfirm,
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

const CategoryProduct = () => {
  const [dataSource, setDataSource] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const pengguna = await getAllCategoryProduct();
      const dataArray = Object.values(pengguna.data.items);
      const formattedData = dataArray.map((item, index) => ({
        ...item,
        key: index + 1,
      }));
      setDataSource(formattedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteCategoryProduct(id);
      message.success("Product berhasil dihapus");
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
    },
    {
      title: "UNIT USAHA",
      dataIndex: "business_unit",
    },
    {
      title: "Kategori Produk",
      dataIndex: "name",
    },

    {
      title: "ACTION",
      dataIndex: "action",
      render: (text, record) => (
        <Space>
          <Popconfirm
            title="Apakah Anda yakin ingin menghapus pengguna ini?"
            onConfirm={() => handleDelete(record.id)}
            okText="Ya"
            cancelText="Tidak"
          >
            <Button
              type="submit"
              onClick={handleDelete}
              icon={<RiDeleteBin6Line />}
            />
          </Popconfirm>
          {/* <Link to={`/category-product/edit-category-product/${record.id}`}> */}
          <Button
            icon={<RiEdit2Line />}
            onClick={() =>
              navigate(`/category-product/edit-category-product/${record.id}`, {
                state: {
                  record,
                },
              })
            }
          />
          {/* </Link> */}
        </Space>
      ),
    },
  ];

  return (
    <>
      <Breadcrumb style={{ marginTop: -30 }}>
        <Breadcrumb.Item>
          <Link to="/">Dashboard</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/category-product">Category Product</Link>
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
          dataSource={dataSource}
          rowClassName={(record, index) =>
            index % 5 === 0 ? "odd-row" : "even-row"
          }
        />
      </div>
    </>
  );
};
export default CategoryProduct;
