'use client';

import { Todo } from "@prisma/client";
import style from './TodoItem.module.css'
import { IoCheckboxOutline, IoSquareOutline } from "react-icons/io5";
import { startTransition, useOptimistic } from "react";


interface Props {
    todo: Todo;
    toggleTodo: (id: string, complete: boolean) => Promise<Todo | void>;
}

export const TodoItem = ({ todo, toggleTodo }: Props) => {

    const [ todoOptimistic, setTodoOptimistic ] = useOptimistic(
        todo,
        ( state, newCompleteValue: boolean ) => ({ ...state, complete: newCompleteValue }),
    );

    const onToggleTodo = async () => {

        try{

            startTransition( () => setTodoOptimistic( !todoOptimistic ) ) // lo marco a nivel visual
            await toggleTodo( todoOptimistic.id, !todoOptimistic.complete ); // lo lanzo a la base de datos

        } catch (error) {
            
            startTransition( () => setTodoOptimistic( !todoOptimistic.complete ) )
        }


    }





  return (
    <div className={  todoOptimistic.complete ? style.todoDone : style.todoPending}>
        <div className="flex flex-col sm:flex-row justify-start items-center gap-4">
            <div className={`
                flex p-2 rounded-md cursor-pointer
                hover:bg-opacity-25 hover:bg-gray-300
                ${ todo.complete ? 'text-green-500' : 'text-red-500' }
            `}
            // onClick={() => toggleTodo(todo.id, !todo.complete)}
            onClick={ onToggleTodo }
            >
                {
                    todoOptimistic.complete 
                    ? <IoCheckboxOutline size={24} />
                    : <IoSquareOutline size={24} />
                }

            </div>

            <div className="text-center sm:text-left">
                { todoOptimistic.description }
            </div>
        </div>

    </div>
  )
}
