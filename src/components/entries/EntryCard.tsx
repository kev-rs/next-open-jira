import { DragEvent, useContext, useRef, useEffect, useState } from 'react';
import { Entry } from "../../interfaces";
import { Card, CardActionArea, CardActions, CardContent, Typography } from "@mui/material";
import { EntriesContext, UIContext } from '../../context';

export const EntryCard: React.FC<Entry & {index: number}> = ({ id, info, createdAt, status, index }) => {

  const { entries, updateEntries } = useContext(EntriesContext)
  const { setIsDragging, dragItem, dragOverItem, setDragItem, setDragOverItem } = useContext(UIContext);
  // const dragItem = useRef<any>(null);
  // const dragOverItem = useRef<any>(null);

  // console.log('dragItem', dragItem)
  // console.log('dragOverItem', dragOverItem)

  const onDragStart = (e: DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('text', id);
    setIsDragging(true)
    // setDragItem(index);
    // dragItem.current = index;
    // console.log('dragItem',index)
  }

  const onDragEnter = (e: DragEvent<HTMLDivElement>) => {
    // console.log('Element',{ index });
    // setDragOverItem(index);
    // console.log('dragOverItem',dragOverItem);
  }

  const onDragEnd = () => {
    setIsDragging(false)
    // let _entries = [...entries];

    // // remove and save the dragged item
    // const draggedItem = _entries.splice(dragItem!, 1);

    // // switch the position
    // _entries.splice(dragOverItem!, 0, draggedItem);

    // // reset the position ref
    // setDragItem(null);
    // setDragOverItem(null);

    // // update the actual array
    // updateEntries(_entries);

    
    
    // console.log(draggedItem)
    // console.log(_entries)
    // console.log('dragItem',dragItem)
    // console.log('dragOverItem',dragOverItem);
    // dragItem.current = null;
    // dragOverItem.current = null;
  }

  return (
    <Card
      sx={{ marginBottom: 1 }}
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragEnter={onDragEnter}
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
