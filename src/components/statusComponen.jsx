import { Badge, Tag } from "antd";

const StatusBar = ({ statuses }) => {
    return (
      <div>
        {statuses.map((status) => (
          <Badge key={status} status={status === 'Active' ? 'success' : 'error'}>
            <Tag>{status}</Tag>
          </Badge>
        ))}
      </div>
    );
  };
  
  export default StatusBar;
  