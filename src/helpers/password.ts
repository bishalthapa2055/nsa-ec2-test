import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";
import Cryptr from "cryptr";
const scryptAsync = promisify(scrypt);

export class Password {
  static async toHash(password: string) {
    try {
      const salt = randomBytes(8).toString("hex");

      // console.log(salt , password)
      const buf = (await scryptAsync(password, salt, 64)) as Buffer;
      // console.log(buf.toString("hex"), salt);

      return `${buf.toString("hex")}.${salt}`;
    } catch (error) {
      console.error("Error hashing password:", (error as any).message);
      throw error; 
    }
    
  }

  /**
   *
   * @param storedPassword
   * @param suppliedPassword
   * @returns boolean
   */

  
  static async compare(storedPassword: string, suppliedPassword: string) {
    const [hashedPassword, salt] = storedPassword.split(".");
    const buf = (await scryptAsync(suppliedPassword, salt, 64)) as Buffer;

    return buf.toString("hex") === hashedPassword;
  }
}
