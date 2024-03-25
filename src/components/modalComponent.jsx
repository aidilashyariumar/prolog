import { Modal } from "antd";

const modalComponent = () => {
    return(
        <>
        <Modal title="Basic Modal" >
            <p></p>
            <p style={{textAlign:'center'}}>Data berhasil disimpan</p>
            <p>Some contents...</p>
        </Modal>
        </>
    )
}

export default modalComponent;