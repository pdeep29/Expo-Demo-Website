export const fetchUser = async (id: string) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);
    console.log("response", response)
    if (!response.ok) throw new Error("Failed to fetch user");
    return await response.json();
};