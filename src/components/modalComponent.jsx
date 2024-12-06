import { Modal, Button } from "antd";
import PropTypes from "prop-types";
import Delete from "../assets/icon/delete.svg";

const DeleteConfirmationModal = ({
  visible,
  onCancel,
  onConfirm,
  modalRecord,
}) => {
  const handleDelete = () => {
    onConfirm();
  };

  return (
    <Modal
      visible={visible}
      // title="Konfirmasi Penghapusan"
      onCancel={onCancel}
      footer={null}
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
        <img src={Delete} size={200} style={{ margin: "0 auto" }} />
        <p style={{ textAlign: "center" }}>
          Data akan terhapus permanen, apakah Anda yakin ingin menghapusnya?
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
            onClick={onCancel}
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
  );
};

DeleteConfirmationModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  modalRecord: PropTypes.func.isRequired,
};

export default DeleteConfirmationModal;
