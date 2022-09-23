import { DragEvent, useContext } from 'react';
import { Card, CardActionArea, CardContent, Typography, CardActions } from '@mui/material';
import { Entry } from '../../server/db/prisma';
import moment from 'moment'
import { UIContext } from '../../context';

interface Props extends Entry {
  index: number;
}

export const EntryCard: React.FC<Props> = ({ status, id, createdAt, info }) => {

  const { setIsDragging } = useContext(UIContext)

  const onDragStart = (e: DragEvent<HTMLInputElement>) => {
    e.dataTransfer.setData("text", id);
    // setIsDragging(true);
  }

  const onDragEnd = () => {
    // setIsDragging(false)
  };

  const lastTime = moment(createdAt).fromNow();

  return (
    <Card
      sx={{ marginBottom: 1 }}
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <CardActionArea>
        <CardContent>
          <Typography sx={{whiteSpace: 'pre-line'}}>{info}</Typography>
        </CardContent>

        <CardActions sx={{ display: 'flex', justifyContent: 'space-between', paddingRight: 2 }}>
        <Typography variant='body2' color='gray'>{`Last: ${lastTime}`}</Typography>
          <Typography 
            variant='body2' 
            color={status == 'pending' ? 'gray' : status == 'in_progress' ? 'orange' : 'green'}          
          >{status}</Typography>
        </CardActions>
      </CardActionArea>
    </Card>
  )
}
