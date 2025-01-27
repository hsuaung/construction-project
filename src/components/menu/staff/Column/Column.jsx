import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import React from 'react'
import { Task } from '../Task/Task'

export default function Column({tasks}) {
  return (
    <div className='listData'>
        <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
            {tasks.map((task) => (
                <Task id={task.id} image={task.image} name={task.name} email={task.email} team={task.team} staffType={task.staffType} status={task.status}/>
            ))}
        </SortableContext>
    </div>
  )
}
