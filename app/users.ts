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