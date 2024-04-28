"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const toggleTodo = (id: string, complete: boolean) => {
  const findTodo = prisma.todo.findFirst({
    where: {
      id: id,
    },
  });

  if (!findTodo) {
    throw new Error("Todo not found");
  }

  const todo = prisma.todo.update({
    where: {
      id: id,
    },
    data: {
      complete: complete,
    },
  });

  revalidatePath("/dashboard/server-todos");
  return todo;
};

export const addTodo = async (description: string) => {
  try {
    const todoaAdded = await prisma.todo.create({
      data: {
        description: description,
      },
    });

    revalidatePath("/dashboard/server-todos");
    return todoaAdded;

  } catch (error) {
    console.error(error);
  }
};


export const deleteTodoCompleted = async () => {


  const todos = prisma.todo.deleteMany({
    where: {
      complete: true,
    },
  });

  revalidatePath("/dashboard/server-todos");
  return todos;
};
