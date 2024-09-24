export const isPasswordValid = (password: string): boolean => {
    let hasLetter = false;
    let hasNumber = false;

    for (const char of password) {
        if (/[a-zA-Z]/.test(char)) {
            hasLetter = true;
        }
        if (/\d/.test(char)) {
            hasNumber = true;
        }

        if (hasLetter && hasNumber) {
            break;
        }
    }

    return hasLetter && hasNumber && password.length >= 8 && password.length <= 50;
};

export const isEmailValid = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}
