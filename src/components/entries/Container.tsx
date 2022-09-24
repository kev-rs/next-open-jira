import { DragEvent, useContext, useMemo } from 'react';
import { List, Paper } from "@mui/material"
import { EntryCard } from "./"
import { EntryStatus } from '../../interfaces/entries';
import { EntriesContext } from '../../context/entries/store';
import { UIContext } from '../../context';
import styles from './Container.module.css'

export const Container: React.FC<{ status: EntryStatus }> = ({ status }) => {

  const { entries, updateEntry } = useContext(EntriesContext);
  const { isDragging, setIsDragging } = useContext(UIContext);

  const entriesByStatus = entries.filter((entry) => entry.status === status);
  const entriesMemo = useMemo(() => entriesByStatus, [entriesByStatus]);

  const allowDrop = (e: DragEvent<HTMLDivElement>) => e.preventDefault();

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    const id = e.dataTransfer.getData("text");
    const entry = entries.find(({ id:entryId }) => entryId === id)!
    updateEntry({ ...entry, status });
    setIsDragging(false);
  }

  return (
    <Paper
      sx={{ height: 'calc(100vh - 180px)', overflow: 'scroll', overflowX: 'unset', backgroundColor: 'transparent', padding: '1px 5px' }}
      component='div'
      onDrop={onDrop}
      onDragOver={allowDrop}
      className={isDragging ? styles.dragging : ''}
    >
      <List sx={{ opacity: isDragging ? 0.2 : 1, transition: 'all .3s' }}>
        {entriesMemo.map((props, index) => (<EntryCard key={index} index={index} {...props} />))}
      </List>
    </Paper>
  )
}
