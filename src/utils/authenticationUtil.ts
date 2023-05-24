export const passwordRegex = /^(?=.*[0-9])(?=.*[!@#£$%^&*+-])[a-zA-Z0-9!@#£$%^&*+-]{8,25}$/;
export const isStrongPassword = (password: string) => passwordRegex.test(password);

export const invalidSymbolRegex = /[^a-zA-Z0-9!@#£$%^&*i+\-]/g;