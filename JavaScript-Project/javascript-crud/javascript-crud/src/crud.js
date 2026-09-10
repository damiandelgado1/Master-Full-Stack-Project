import { getUser, deleteUser, updateUser } from "./api.js";

let editUser = null;
const form = document.getElementById(elementId = "form");

// render de usuarios
const renderUsers = async() => {
    const users = await getUser();
    const userList = document.getElementById(elementId = "user-list");

    users.forEach(user => {
        const element = document.createElement(tagName = "li");

        element.innerHTML = `
            <span> ${user.name} (${user.email}) </span>
            <button type="submit" class="edit" data-id="${user.id}"> Editar </button>
            <button type="submit" class="delete" data-id="${user.id}"> Eliminar </button>
        `;

        userList.appendChild(element);
    });
};

// manejar el submit
const handleSubmit = async(event) => {
    event.preventDefault();

    const name = document.getElementById(elementId = "name").value;
    const email = document.getElementById(elementId = "email").value;

    await updateUser({ name, email, id: editUser.id });

    form.reset();

    renderUsers();
};

// manejar el edit
const handleEdit = async (id = any, name = any, email = any) => {
    editUser = { id, name, email };

    document.getElementById(elementId = "name").value = name;
    document.getElementById(elementId = "email").value = email;
};

// manejar el delete
const handleDelete = async (id) => {
    await deleteUser(id);

    renderUsers();
};

// agregar eventos al html
form.addEventListener("submit", handleSubmit);

userList.addEventListener("click", (event) => {
    const target = event.target;

    if (target.classList.contains("edit")) {
        const id = target.getAttribute("data-id");
        const user = Array.from(target.parentNode.children)[0].innerText.split(
            " (",
        );
    };

    const name = user[0];
    const email = user[1].replace("", "");

    handleEdit(id, name, email);
});