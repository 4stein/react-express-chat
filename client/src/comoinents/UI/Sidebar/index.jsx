import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Input, Modal, Button, Select } from "antd";
import { TeamOutlined, FormOutlined } from "@ant-design/icons";
import styles from "./Sidebar.module.sass";
import { Dialogs } from "../../../containers";
import { authApi, dialogsApi } from "../../../utils";

const Sidebar = () => {
  // useState
  const [visible, setVisible] = useState(false);
  const [users, setUsers] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [partnerIdValue, setPartnerIdValue] = useState("");
  const [textareahValue, setTextareahValue] = useState("");
  // useSelector
  const userId = useSelector((state) => state.user.user._id);
  // antd
  const { Search } = Input;
  const { Option } = Select;
  const { TextArea } = Input;
  // Handkers
  const onSelectUser = (inputWithUserId) => {
    setPartnerIdValue(inputWithUserId);
  };
  const onSearch = async (value) => {
    try {
      const res = await authApi.findUsers(value);
      setUsers(res.data);
    } catch (e) {
      console.log(e);
    }
  };
  const onNewDialog = async () => {
    try {
      const res = await dialogsApi.create(
        partnerIdValue,
        userId,
        textareahValue
      );
      setVisible(false);
    } catch (e) {
      console.log(e);
    }
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <>
      <div className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <div>
            <TeamOutlined /> <p>List of dialogues</p>
          </div>
          <div>
            <FormOutlined
              style={{ cursor: "pointer" }}
              onClick={() => setVisible(true)}
            />
          </div>
        </div>
        <div className={styles.sidebarSearch}>
          <Search
            placeholder="input search text"
            onSearch={(value) => setSearchValue(value)}
          />
        </div>
        <div className={styles.sidebarDialogs}>
          <Dialogs userId={userId} searchValue={searchValue} />
        </div>
      </div>

      <Modal
        visible={visible}
        title="Title"
        onOk={handleCancel}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={onNewDialog}
            disabled={!partnerIdValue.length || !textareahValue.length}
          >
            Create Dialog
          </Button>,
        ]}
      >
        <Select
          placeholder="Write user name"
          style={{ width: "100%", marginBottom: "15px" }}
          onSearch={onSearch}
          onSelect={onSelectUser}
          showSearch
          showArrow={false}
          optionFilterProp="children"
        >
          {users.map((user) => (
            <Option key={user._id} value={user._id}>
              {user.fullname}
            </Option>
          ))}
        </Select>
        {partnerIdValue && (
          <TextArea
            value={textareahValue}
            onChange={(e) => {
              setTextareahValue(e.target.value);
            }}
            autoSize={{ minRows: 4, maxRows: 10 }}
            placeholder="Your first message"
          />
        )}
      </Modal>
    </>
  );
};

export default Sidebar;
