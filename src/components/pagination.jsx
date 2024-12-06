import { Button, Flex, Radio } from "antd";
import { useState } from "react";

const PaginationComponent = ({
  current,
  pageSize,
  handleNext,
  handlePrev,
  handleChangePage,
  dataCurrent,
}) => {
  return (
    <>
      <Flex
        justify="space-between"
        style={{ backgroundColor: "white", alignItems: "center", padding: 10 }}
      >
        <Flex style={{ alignItems: "center" }} justify="space-between">
          <p style={{ marginLeft: "10px", marginRight: "10px" }}>Menampilkan</p>
          <select
            onChange={handleChangePage}
            style={{
              borderRadius: "10px",
              marginRight: "10px",
              height: "24px",
              width: "35px",
            }}
            value={pageSize}
          >
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
          </select>
          <p>dari {dataCurrent} </p>
        </Flex>
        <div className="div">
          <p style={{ textAlign: "center" }}> {current}</p>
          <div
            style={{
              width: "30px",
              height: "4px",
              backgroundColor: "#375DFB",
              borderTopRightRadius: 30,
              borderTopLeftRadius: 30,
            }}
          ></div>
        </div>

        <Flex gap="small" wrap="wrap">
          <Button
            onClick={handlePrev}
            style={{
              borderTopRightRadius: "0px",
              borderBottomRightRadius: "0px",
              border: "#375DFB solid 1px",
              color: "#375DFB",
            }}
          >
            Sebelumnya
          </Button>
          <Button
            onClick={handleNext}
            style={{
              marginLeft: "-10px",
              borderTopLeftRadius: "0px",
              borderBottomLeftRadius: "0px",
              backgroundColor: "#375DFB",
              color: "white",
            }}
          >
            Selanjutnya
          </Button>
        </Flex>
      </Flex>
    </>
  );
};

export default PaginationComponent;
