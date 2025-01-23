import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import React from 'react'
import { Task } from '../Task/Task'

export default function Column({tasks}) {
  return (
    <div className='listData'>
        <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
            {tasks.map((task) => (
                <Task id={task.id} name={task.name} group={task.group} VIEDate_RIDate={task.VIEDate_RIDate} IEDate={task.IEDate} status={task.status}/>
            ))}
        </SortableContext>
    </div>
  )
}
