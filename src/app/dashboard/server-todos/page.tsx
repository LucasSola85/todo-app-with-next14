//! NO FUNCIONA
// export const dynamic = 'force-dynamic';
// export const revalidate = 0;
//? The only ways to affect the Router Cache are to use Server Actions OR to use router.refresh().


import prisma from "@/lib/prisma";
import { TodosGrid } from "@/todos";
import { NewTodo } from "@/todos/components/NewTodo";

export const metadata = {
  title: "Listado de todos",
  description: "Esta es la página de listado de todos",
};

export default async function ServerTodosPage() {
  const todos = await prisma.todo.findMany({ orderBy: { description: "asc" } });

  return (
    <>
      <div className="flex flex-row m-5 p-3">
        <NewTodo />
      </div>
      <TodosGrid todos={todos} />
    </>
  );
}