export function generateRandomCode(): string {
  // Generate a random number between 1000 and 9999
  return Math.floor(1000 + Math.random() * 9000).toString();
}

export function generate8DigitRandomString() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const charactersLength = characters.length;
  
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  
  return result;
}
