import { CheckBoxOutlineBlankOutlined, DraftsOutlined, HomeOutlined, InboxOutlined, MailOutline, ReceiptOutlined } from '@mui/icons-material';
import { Button, Drawer, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import React, { useState } from 'react'

const data = [
  {
    name: "Home",
    icon: <HomeOutlined />,
  },
  { name: "Inbox", icon: <InboxOutlined /> },
  { name: "Outbox", icon: <CheckBoxOutlineBlankOutlined /> },
  { name: "Sent mail", icon: <MailOutline /> },
  { name: "Draft", icon: <DraftsOutlined /> },
  { name: "Trash", icon: <ReceiptOutlined /> },
];

function AdminSidemenu() {
  const [open, setOpen] = useState(false);
  const getList = () => (
    <div style={{ width: 250, top: 100 }} onClick={() => setOpen(false)}>
      {data.map((item, index) => (
        <ListItem button key={index}>
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.name} />
        </ListItem>
      ))}
    </div>
  );
  return (
    <div>
      <Button onClick={() => setOpen(true)}>Click me</Button>
      <Drawer open={open} anchor={"left"} onClose={() => setOpen(false)}>
        {getList()}
      </Drawer>
    </div>
  );
}

export default AdminSidemenu
