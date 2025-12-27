import {vaultItems} from "@/app/api/vault/vaultItems"
import {VaultItem} from "@/app/api/vault/vaultItems"

export function createLogin(formData: FormData) {
    const name = formData.get("name") as string;
    const login = formData.get('login') as string;
    const password = formData.get('password') as string;

    console.log("name: ", name);
    console.log("login: ", login);
    console.log("password: ", password);

    if (checkName(name) && checkLogin(login) && checkPassword(password)) {
        console.log("All login data is valid!")
        const newItem: VaultItem = {
            id: vaultItems.items.length + 1,
            type: "login",
            name: name,
            login: login,
            password: password,
        }
        vaultItems.items.push(newItem);
        console.log(vaultItems.items);
        return vaultItems;
    } else {
        console.log("Some login data is invalid!")
        return false;
    }

    function checkName(name: string) {
        if (name != "" && name.length <= 255) {
            return true;
        }
        return false
    }
    function checkLogin(login: string) {
        if (login != "" && login.length <= 255) {
            return true;
        }
        return false
    }
    function checkPassword(password: string) {
        if (password != "" && password.length <= 255) {
            return true;
        }
        return false
    }

}

export function createPaymentCard(formData: FormData) {
    const name = formData.get('name') as string;
    const cardNumber = formData.get('cardNumber') as string;
    const expirationDate = formData.get('expirationDate') as string;
    const cvc = formData.get('cvc') as string;

    console.log("name: ", name);
    console.log("cardNumber: ", cardNumber);
    console.log("expirationDate: ", expirationDate);
    console.log("cvc: ", cvc);

    if (checkCardNumber(cardNumber) && checkExpirationDate(expirationDate) && checkCvc(cvc)) {
        console.log("All payment card data is valid!")
        const newItem: VaultItem = {
            id: vaultItems.items.length + 1,
            type: "paymentCard",
            name: name,
            cardNumber: cardNumber,
            expirationDate: expirationDate,
            cvc: cvc,
        }
        vaultItems.items.push(newItem);
        console.log(vaultItems.items);
        return vaultItems;
    } else {
        console.log("Some payment card data is invalid!")
        return false;
    }

    function checkCardNumber(cardNumber: string) {
        /*
        What we need to check:
            - Check if card number is <= 255 chars
            - Check if card number fully consists of numbers
         */
        const numberCheckRegex = /[0-9]/
        if (cardNumber.length <= 255 && numberCheckRegex.test(cardNumber)) {
            return true;
        }
        return false;
    }
    function checkExpirationDate (expirationDate: string) {
        /*
        What we need to check:
            - Replace all white space and "/" with ""
                - If the expiration date is valid, this will return a string of 4 numbers
            - Check if the remaining string is 4 numbers
         */
        const replaceRegex = /[\s/]/g
        const numberCheckRegex = /[0-9]/
        const newExpDate = expirationDate.replace(replaceRegex, "");
        console.log(newExpDate);
        if (newExpDate.length === 4 && numberCheckRegex.test(newExpDate)) {
            return true;
        }
        return false;
    }
    function checkCvc(cvc: string) {
        /*
        What we need to check:
            - Check if cvc length === 6
            - Check if cvc fully contains numbers
         */
        const numberCheckRegex = /[0-9]/;
        if (cvc.length === 3 && numberCheckRegex.test(cvc)) {
            return true;
        }
        return false;
    }
}

export function createBankAccount(formData: FormData) {
    const name = formData.get("name") as string;
    const routingNumber = formData.get('routingNumber') as string;
    const accountNumber = formData.get('accountNumber') as string;

    if (checkRoutingNumber(routingNumber) && checkAccountNumber(accountNumber)) {
        console.log("All bank account data is valid!")
        const newItem: VaultItem = {
            id: vaultItems.items.length + 1,
            type: "bankAccount",
            name: name,
            routingNumber: routingNumber,
            accountNumber: accountNumber,
        }
        vaultItems.items.push(newItem);
        console.log(vaultItems.items);
        return vaultItems;
    } else {
        console.log("Some bank account data is invalid!")
        return false;
    }

    function checkRoutingNumber(routingNumber: string) {
        /*
        What we need to check:
            - Check if routing number fully contains numbers
         */
        const numberCheckRegex = /[0-9]/;
        if (numberCheckRegex.test(routingNumber)) {
            return true;
        }
        return false;
    }

    function checkAccountNumber(accountNumber: string) {
        /*
        What we need to check:
            - Check if account number fully contains numbers
         */
        const numberCheckRegex = /[0-9]/;
        if (numberCheckRegex.test(accountNumber)) {
            return true;
        }
        return false;
    }
}