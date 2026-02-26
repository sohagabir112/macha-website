export const isValidEmail = (email: string): boolean => {
    // Simple regex for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const isValidPassword = (password: string): boolean => {
    // Check if password is at least 6 characters
    return password.length >= 6;
};

export const isValidUsername = (username: string): boolean => {
    // Check if username is alphanumeric and between 3 and 20 characters
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    return usernameRegex.test(username);
};
