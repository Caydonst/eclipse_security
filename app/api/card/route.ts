export async function createPassword(formData: FormData) {
    const login = formData.get('login') as string;
    const password = formData.get('password') as string;
}

export async function createPaymentCard(formData: FormData) {
    const cardNumber = formData.get('cardNumber') as string;
    const expiryDate = formData.get('expiryDate') as string;
    const cvc = formData.get('cvc') as string;

    console.log("cardNumber: ", cardNumber);
    console.log("expiryDate: ", expiryDate);
    console.log("cvc: ", cvc);
}

export async function createBankAccount(formData: FormData) {
    const routeNumber = formData.get('routeNumber') as string;
    const accountNumber = formData.get('accountNumber') as string;
}