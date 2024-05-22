import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";
interface DynamoDBStringAttribute  {
S: string;
// Add other types as needed, e.g., N for numbers, SS for string sets, etc.
}

interface DynamoDBItem  {
[key: string]: DynamoDBStringAttribute;
}

const scryptAsync = promisify(scrypt);

export class Password {
    static async toHash(password: string) {
        const salt = randomBytes(8).toString('hex');
        const buf = (await scryptAsync(password, salt, 64)) as Buffer;

        return `${buf.toString('hex')}.${salt}`;
    }
    
    static async compare(storedPassword: DynamoDBStringAttribute, suppliedPassword: string) {
        console.log('storePass ', storedPassword)
        console.log('typeof storepass ', typeof storedPassword.S)
        const storedPasswordString = storedPassword.S;
        if (storedPasswordString) {
            const [hashedPassword, salt] = storedPasswordString.split('.');
            const buf = (await scryptAsync(suppliedPassword, salt, 64)) as Buffer;

            return buf.toString('hex') === hashedPassword;
        } else {
            throw new Error('Stored password is invalid.');
        }
        // const [hashedPassword, salt] = storedPassword.split('.');
        // const buf = (await scryptAsync(suppliedPassword, salt, 64)) as Buffer;

        // return buf.toString('hex') === hashedPassword;
    }
}