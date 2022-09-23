import { DragEvent, useContext, useMemo, useState } from 'react';
import { Paper, List } from '@mui/material';
import { EntryCard } from './EntryCard';
import { EntriesContext, UIContext } from '../../context';
import { Status } from '../../server/db/prisma';
import styles from './container.module.css'

export const Container: React.FC<{ status: Status }> = ({ status }) => {

  const { entries, updateEntry } = useContext(EntriesContext);
  const { isDragging, setIsDragging } = useContext(UIContext)

  const entriesByStatus = entries.filter((entry) => entry.status === status);
  const entriesMemo = useMemo(() => entriesByStatus, [ entriesByStatus ]);

  const allowDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  }

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    const id = e.dataTransfer.getData("text");
    const entry = entries.find((item) => item.id === id)!;
    updateEntry({...entry, status});
    // setIsDragging(false);
  }

  return (
    <Paper
      sx={{ height: 'calc(100vh - 180px)', overflow: 'scroll', overflowX: 'unset', backgroundColor: 'transparent', padding: '1px 5px' }}
      component='div'
      onDrop={onDrop}
      onDragOver={allowDrop}
      className={isDragging ? styles.dragging : ''}
    >
      <List 
        sx={{ opacity: isDragging ? 0.2 : 1, transition: 'all .3s' }}
      >
        {entriesMemo.map((props, index) => (<EntryCard key={index} index={index} {...props} />))}
      </List>
    </Paper>
  )
}
