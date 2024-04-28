'use client';

import { Todo } from "@prisma/client";
import { TodoItem } from "./TodoItem";
import * as api from '@/todos/helpers/todos';
// import { useRouter } from "next/navigation";
import { toggleTodo } from "../actions/todos";


interface Props {
    todos?: Todo[];
}

export const TodosGrid = ({ todos = [] }: Props) => {

  //! OPCION CONVECIONAL PARA ACTUALIZAR EL ESTADO DE UN TODO
  // const router = useRouter();

  // const handleToggleTodo = async ( id: string, complete: boolean ) => {

  //   await api.toggleTodo( id, complete )
  //   router.refresh();

  // };

  //! OPCION CON SERVER ACTIONS
  const handleToggleTodo = async ( id: string, complete: boolean ) => {
    await toggleTodo( id, complete );
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        {
            todos.map(todo => (
                <TodoItem key={todo.id} todo={todo}  toggleTodo={ handleToggleTodo }/>
            ))
        }
    </div>
  )
}
