export const generateRandomPassword = (length, options = {}) => {
  const numbers = '0123456789';
  const symbols = '!@#$%^&*()_+[]{}|;:,.<>?';
  // const lowerCaseAlphabets = 'abcdefghijklmnopqrstuvwxyz';
  const alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

  let characterPool = '';

  if (options.includeNumbers) {
    characterPool += numbers;
  }
  if (options.includeSymbols) {
    characterPool += symbols;
  }
  // if (options.includeLowerCaseAlphabets) {
  //   characterPool += lowerCaseAlphabets;
  // }
  if (options.includeAlphabets) {
    characterPool += alphabets;
  }

  if (characterPool.length === 0) {
    throw new Error('At least one character type should be included.');
  }

  let password = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characterPool.length);
    password += characterPool[randomIndex];
  }

  return password;
};
