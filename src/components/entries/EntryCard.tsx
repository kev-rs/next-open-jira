import { DragEvent, useContext } from 'react';
import { Entry } from "../../interfaces";
import { Card, CardActionArea, CardActions, CardContent, Typography } from "@mui/material";
import { UIContext } from '../../context';
import { useRouter } from 'next/router';
import moment from 'moment';

export const EntryCard: React.FC<Entry & {index: number}> = ({ id, info, createdAt, status, index }) => {
  const router = useRouter();
  const { setIsDragging } = useContext(UIContext);

  const onDragStart = (e: DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('text', id);
    setIsDragging(true)
  }

  const onDragEnd = () => {
    setIsDragging(false)
  }
  const dateCreation = moment(createdAt).fromNow();

  return (
    <Card
      sx={{ marginBottom: 1 }}
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onClick={() => router.push(`/entries/${id}`)}
    >
      <CardActionArea>
        <CardContent>
          <Typography sx={{ whiteSpace: 'pre-line' }}>{info}</Typography>
        </CardContent>

        <CardActions sx={{ display: 'flex', justifyContent: 'space-between', paddingRight: 2 }}>
          <Typography variant='body2' color='gray'>{`Last: ${dateCreation}`}</Typography>
          <Typography 
            variant='body2' 
            color={status == 'pending' ? 'gray' : status == 'in_progress' ? 'orange' : 'green'}          
          >{status}</Typography>
        </CardActions>
      </CardActionArea>
    </Card>
  )
}
