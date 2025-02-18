import { Drawer, List, ListItem, ListItemText } from "@mui/material";

const Sidebar = () => {
  return (
    <Drawer variant="permanent" sx={{ width: 240 }}>
      <List>
        <ListItem button>
          <ListItemText primary="All Tasks" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Completed Tasks" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
