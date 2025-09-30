interface Account {
    id: number;
    name: string;
    email: string;
    password: string;
}

export const accounts: Account[] = [
    {id: 1, name: "Email", email: "myemail@gmail.com", password: "mypassword1"}
]