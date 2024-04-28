



export const toggleTodo = async (id: string, complete: boolean ) => {


    const response = await fetch(`/api/todos/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ complete })
    });

    if (!response.ok) {
        throw new Error('Failed to update todo');
    }

    return await response.json();

}


export const createTodo = async ( description: string) => {


    const response = await fetch('/api/todos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ description })
    });

    if (!response.ok) {
        throw new Error('Failed to update todo');
    }

    return await response.json();

}

export const deleteTodo = async () => {

    const response = await fetch('/api/todos', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        throw new Error('Failed to update todo');
    }

    return await response.json();

}