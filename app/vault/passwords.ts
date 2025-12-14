export interface Password {
    id: number;
    type: "password";
    name: string;
    login: string;
    password: string;
}
export interface PaymentCard {
    id: number;
    type: "paymentCard";
    name: string;
    cardNumber: string;
    expirationDate: string;
    cvc: string;
}
export interface BankAccount {
    id: number;
    type: "bankAccount";
    name: string;
    routingNumber: string;
    accountNumber: string;
}
export type VaultItem = Password | PaymentCard | BankAccount

export interface Account {
    items: VaultItem[];
}

export const vaultItems: Account = {
    items: [
        {id: 1, type: "password", name: "Email1", login: "myemail1@gmail.com", password: "mypassword1"},
        {id: 2, type: "password", name: "Email2", login: "myemail2@gmail.com", password: "mypassword2"},
        {id: 3, type: "password", name: "Email3", login: "myemail3@gmail.com", password: "mypassword3"},
        {id: 4, type: "password", name: "Email4", login: "myemail4@gmail.com", password: "mypassword4"},
        {id: 5, type: "password", name: "Email5", login: "myemail5@gmail.com", password: "mypassword5"},
        {id: 6, type: "password", name: "Email2", login: "myemail2@gmail.com", password: "mypassword2"},
        {id: 7, type: "password", name: "myaccount", login: "myemail3@gmail.com", password: "mypassword3"},
        {id: 8, type: "password", name: "random", login: "myemail4@gmail.com", password: "mypassword4"},
        {id: 9, type: "password", name: "testnotemail", login: "myemail5@gmail.com", password: "mypassword5"},
        {id: 10, type: "paymentCard", name: "Card2", cardNumber: "4400958645090956", expirationDate: "12/28", cvc: "956"},
        {id: 11, type: "paymentCard", name: "Card4", cardNumber: "4400958645090956", expirationDate: "12/28", cvc: "956"},
        {id: 12, type: "paymentCard", name: "Card3", cardNumber: "4400958645090956", expirationDate: "12/28", cvc: "956"},
        {id: 13, type: "paymentCard", name: "Card1", cardNumber: "4400958645090956", expirationDate: "12/28", cvc: "956"},
        {id: 14, type: "bankAccount", name: "Bank2", routingNumber: "003948534", accountNumber: "3023948543343"},
        {id: 15, type: "bankAccount", name: "Bank1", routingNumber: "005819283", accountNumber: "30049534"},
        {id: 16, type: "bankAccount", name: "Bank3", routingNumber: "009916647", accountNumber: "349500023948"},
    ]
}