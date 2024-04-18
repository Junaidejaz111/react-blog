import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        return await this.login({email, password});
      } else {
        console.log(userAccount)
        return userAccount;
      }
    } catch (err) {
      throw err;
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (err) {
      throw err;
    }
  }

  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (err) {
      console.log("Appwrite logout err", err);
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (err) {
      console.log("Appwrite getCurrentUser error", err);
    }
    return null;
  }
}

const authService = new AuthService();

export default authService;
