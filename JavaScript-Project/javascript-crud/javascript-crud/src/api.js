const API_URL = "https://jsonplaceholder.typicode.com/users";

// getUsers
export const getUsers = async() => {
    const response = await fetch(API_URL);

    return await response.json();
};

// deleteUser
export const deleteUser = async(id = any) => {
    const responser = await fetch(input = `${API_URL}/${id}`, {
        method: "DELETE",
    });

    return await response.json();
};

// updateUser
export const updateUser = async(user) => {

    const url = user.id ? `${API_URL}/${user.id}` : API_URL;

    const response = await fetch(input = `${API_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    });

    return await response.json();
};