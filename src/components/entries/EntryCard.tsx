import { DragEvent, useContext } from 'react';
import { Entry } from "../../interfaces";
import { Card, CardActionArea, CardActions, CardContent, Typography } from "@mui/material";
import { EntriesContext, UIContext } from '../../context';

export const EntryCard: React.FC<Entry & {index: number}> = ({ id, info, createdAt, status, index }) => {
  const { setIsDragging } = useContext(UIContext);

  const onDragStart = (e: DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('text', id);
    setIsDragging(true)
  }

  const onDragEnd = () => {
    setIsDragging(false)
  }

  return (
    <Card
      sx={{ marginBottom: 1 }}
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <CardActionArea>
        <CardContent>
          <Typography sx={{ whiteSpace: 'pre-line' }}>{info}</Typography>
        </CardContent>

        <CardActions sx={{ display: 'flex', justifyContent: 'end', paddingRight: 2 }}>
          <Typography variant='body2'>30 minutes ago</Typography>
          <Typography variant='body2'>{status}</Typography>
        </CardActions>
      </CardActionArea>
    </Card>
  )
}
