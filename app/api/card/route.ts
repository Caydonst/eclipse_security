import {vaultItems} from "@/app/api/vault/vaultItems"
import {VaultItem} from "@/app/api/vault/vaultItems"

export async function createPassword(formData: FormData) {
    const login = formData.get('login') as string;
    const password = formData.get('password') as string;
}

export function createPaymentCard(formData: FormData) {
    const cardNumber = formData.get('cardNumber') as string;
    const expirationDate = formData.get('expirationDate') as string;
    const cvc = formData.get('cvc') as string;

    console.log("cardNumber: ", cardNumber);
    console.log("expirationDate: ", expirationDate);
    console.log("cvc: ", cvc);

    if (checkCardNumber(cardNumber) && checkExpirationDate(expirationDate) && checkCvc(cvc)) {
        console.log("All payment card data is valid!")
        const newItem: VaultItem = {
            id: vaultItems.items.length + 1,
            type: "paymentCard",
            name: "random",
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
}

export async function createBankAccount(formData: FormData) {
    const routeNumber = formData.get('routeNumber') as string;
    const accountNumber = formData.get('accountNumber') as string;
}

function checkCardNumber(cardNumber: string) {
    /*
    What we need to check:
        - Check if card number fully consists of numbers
     */
    if (/[0-9]/.test(cardNumber)) {
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
    if (newExpDate.length != 4) {
        return false;
    }
    if (numberCheckRegex.test(newExpDate)) {
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
    if (cvc.length != 3) {
        return false;
    }
    if (numberCheckRegex.test(cvc)) {
        return true;
    }
    return false;
}