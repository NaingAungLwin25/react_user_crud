import { useState, useEffect } from 'react';
import { Space, Table, Button, message,Modal} from 'antd';
import { useNavigate } from 'react-router-dom';
import { getUsers,deleteUser } from './requestHelper';
import './userDetail.css';

const UserDetail = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const navigate = useNavigate();
  
    useEffect(() => {
      fetchUsers();
    }, []);
  
    const fetchUsers = async () => {
      try {
        const userList = await getUsers();
        setUsers(userList);
        setLoading(false);
      } catch (error) {
        message.error('Failed to fetch users.');
        setLoading(false);
      }
    };
  
    const handleAddUser = () => {
      navigate('/register');
    };
  
    const handleEdit = (id) => {
      navigate('/editUser', { state: { userId: id } });
    };
  
    const showDeleteConfirm = (id) => {
      setSelectedUserId(id);
      setIsModalVisible(true);
    };
  
    const handleDelete = async () => {
      try {
        await deleteUser(selectedUserId);
        setUsers(users.filter(user => user.id !== selectedUserId));
        setIsModalVisible(false);
        message.success('User deleted successfully.');
      } catch (error) {
        message.error('Failed to delete user.');
      }
    };
  
    const handleCancel = () => {
      setIsModalVisible(false);
    };
  
  return (
    <div className="user-detail-container">
      <Button type="primary" onClick={handleAddUser} style={{ marginBottom: 16 , width:150}}>
        Add New User
      </Button>
      <Table dataSource={users} loading={loading} rowKey="id">
        <Table.Column title="Name" dataIndex="name" key="name" />
        <Table.Column title="Email" dataIndex="email" key="email" />
        <Table.Column title="Age" dataIndex="age" key="age" />
        <Table.Column title="Region" dataIndex="regions" key="region" />
        <Table.Column title="Phone Number" dataIndex="phoneNumber" key="phNumber" />
        <Table.Column title="Graduated" dataIndex="isGraduated" key="isGraduated" render={text => (text ? 'Yes' : 'No')} />
        <Table.Column title="Gender" dataIndex="gender" key="gender" />
        <Table.Column
          title="Action"
          key="action"
          render={(text, record) => (
            <Space size="middle">
              <Button type="primary" onClick={() => handleEdit(record.id)}>Edit</Button>
              <Button type="danger"  onClick={() => showDeleteConfirm(record.id)}>Delete</Button>
            </Space>
          )}
        />
      </Table>
      <Modal
        title="Confirm Deletion"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel} className="modal-cancel-button">
            Cancel
          </Button>,
          <Button key="delete" type="primary" onClick={handleDelete} danger className="modal-delete-button">
            Delete
          </Button>,
        ]}
      >
        <p>Are you sure you want to delete this user?</p>
      </Modal>
    </div>
  );
};

export default UserDetail;
