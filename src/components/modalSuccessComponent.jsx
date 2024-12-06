import { Modal, Button } from "antd";
import PropTypes from "prop-types";
import sukses from "../assets/icon/berhasil.svg";

const SuksesConfirmationModal = ({ visible, onCancel, onConfirm }) => {
  //   const handleDelete = () => {
  //     onConfirm();
  //   };

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
        <img src={sukses} size={200} style={{ margin: "0 auto" }} />
        <p
          style={{ textAlign: "center", fontWeight: "400px", fontSize: "16px" }}
        >
          Data Berhasil Disimpan
        </p>
        <div className="div"></div>
        <div>
          <Button
            key="cancel"
            // type="dashed"
            onClick={onCancel}
            style={{
              width: "224px",
              height: "46px",
              borderRadius: "60px",
              color: "white",
              backgroundColor: "#0C7834",
            }}
          >
            Kembali
          </Button>
        </div>
      </div>
    </Modal>
  );
};

SuksesConfirmationModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default SuksesConfirmationModal;
