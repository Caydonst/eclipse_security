interface User {
    id: number;
    email: string;
    password: string;
}

export const users: User[] = [
    { id: 1, email: "user1@gmail.com", password: "user1password" },
    { id: 2, email: "user2@gmail.com", password: "user2password" },
    { id: 3, email: "user3@gmail.com", password: "user3password" },
]

export function createUser(formData: { email: string; password: string; }) {
    const id: number = users[users.length - 1].id + 1;
    const user: User = {
        id: id,
        email: formData.email,
        password: formData.password,
    }

    try {
        users.push(user)
        console.log(users)
        return true;
    } catch (error) {
        console.log(error)
        return false;
    }
}