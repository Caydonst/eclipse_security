interface Account {
    id: number;
    type: string;
    name: string;
    email: string;
    password: string;
}

export const accounts: Account[] = [
    {id: 1, type: "password", name: "Email1", email: "myemail1@gmail.com", password: "mypassword1"},
    {id: 2, type: "password", name: "Email2", email: "myemail2@gmail.com", password: "mypassword2"},
    {id: 3, type: "paymentCard", name: "Card1", email: "myemail5@gmail.com", password: "mypassword5"},
    {id: 4, type: "bankAccount", name: "Bank2", email: "myemail5@gmail.com", password: "mypassword5"},
    {id: 5, type: "password", name: "Email3", email: "myemail3@gmail.com", password: "mypassword3"},
    {id: 6, type: "password", name: "Email4", email: "myemail4@gmail.com", password: "mypassword4"},
    {id: 7, type: "password", name: "Email5", email: "myemail5@gmail.com", password: "mypassword5"},
    {id: 8, type: "paymentCard", name: "Card3", email: "myemail5@gmail.com", password: "mypassword5"},
    {id: 9, type: "password", name: "Email2", email: "myemail2@gmail.com", password: "mypassword2"},
    {id: 10, type: "password", name: "myaccount", email: "myemail3@gmail.com", password: "mypassword3"},
    {id: 11, type: "password", name: "random", email: "myemail4@gmail.com", password: "mypassword4"},
    {id: 12, type: "password", name: "testnotemail", email: "myemail5@gmail.com", password: "mypassword5"},
    // Payment Cards
    {id: 13, type: "paymentCard", name: "Card2", email: "myemail1@gmail.com", password: "mypassword1"},
    {id: 14, type: "paymentCard", name: "Card4", email: "myemail1@gmail.com", password: "mypassword1"},
    // Bank Accounts
    {id: 15, type: "bankAccount", name: "Bank1", email: "myemail4@gmail.com", password: "mypassword4"},
    {id: 16, type: "bankAccount", name: "Bank3", email: "myemail1@gmail.com", password: "mypassword1"},

]