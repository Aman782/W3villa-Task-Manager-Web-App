import { Card, CardContent, Typography, IconButton } from "@mui/material";
import { Delete, Edit, Star } from "@mui/icons-material";

const TaskCard = ({ task }) => {
  return (
    <Card sx={{ width: 300, m: 2, p: 1, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h6">{task.title}</Typography>
        <Typography variant="body2" color="textSecondary">
          {task.description}
        </Typography>
        <Typography variant="subtitle2" color={task.priority === "high" ? "error" : "primary"}>
          {task.priority.toUpperCase()}
        </Typography>
        <IconButton><Edit /></IconButton>
        <IconButton><Delete /></IconButton>
        <IconButton><Star /></IconButton>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
