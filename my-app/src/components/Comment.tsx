import { Card, CardContent, Typography } from "@mui/material";
import { CommentType } from ".";

interface CommentProps {
  comment: CommentType;
}

const Comment = ({ comment }: CommentProps) => (
  <Card sx={{backgroundColor: '#c5e5ff' }}>
    <CardContent>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        {comment.user}
      </Typography>
      <Typography variant="subtitle1" component="div">
        {comment.commentContent}
      </Typography>
    </CardContent>
  </Card>
);

export default Comment;
