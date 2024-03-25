import React, { useState } from 'react';
import { Button, Flex, Space, Table } from 'antd';
import './TableComponent.css'; // Import file CSS terpisah
import Search from 'antd/es/input/Search';
import {RiAddLine,RiTableLine} from 'react-icons/ri';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
];

const data = [];
for (let i = 0; i < 10; i++) {
  data.push({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`,
  });
}

const TableComponent = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const onSelectChange = (newSelectedRowKeys) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
      {
        key: 'odd',
        text: 'Select Odd Row',
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = changeableRowKeys.filter((_, index) => index % 2 !== 0);
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
      {
        key: 'even',
        text: 'Select Even Row',
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = changeableRowKeys.filter((_, index) => index % 2 === 0);
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
    ],
  };

  return (
    <div className='table'>
        <Flex justify='space-between' style={{padding:10}}>
            <Search placeholder='cari apa' style={{width:200, border: 'none', background: 'transparent' }}/>
        <Space size={10}  style={{marginLeft:'auto', width:300}}>
            <Button>Ekspor</Button>
            <Button icon={<RiTableLine/>}>Kolom</Button>
            <Button type='primary' icon={<RiAddLine/>}>Ekspor</Button>
        </Space>
        </Flex>
        <Table
          style={{height:'65vh', overflowY: 'auto' }}
          rowSelection={rowSelection}
          columns={columns}
          dataSource={data}
          rowClassName={(record, index) => (index % 2 === 0 ?'odd-row' : 'even-row' )}
        />
    </div>
  );
};

export default TableComponent;
