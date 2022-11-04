import jwt_decode from "jwt-decode";

export type UserCB = (user: User | null, error: any) => void;

export type User = {
  email: string;
  first_name: string;
  last_name: string;
  middle_name: string;
  access_token: string;
};

export class Auth {
  user: User | null;

  error: { message: string } | null;

  cb: UserCB | null;

  constructor() {
    this.user = null;
    this.error = null;
    this.cb = null;
  }

  onAuthStateChanged(cb: UserCB) {
    this.cb = cb;

    return () => {
      this.cb = null;
    };
  }

  protected onUserChange(user: User | null, error?: { message: string }) {
    this.cb && this.cb(user, error);
  }

  private getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }

  signIn(email: string, password: string) {
    return new Promise((resolve, reject) => {
      // if (email !== userEmail || password !== userPassword) {
      //   const error = { message: "Неверный логин или пароль" };
      //   this.error = error;
      //   reject(error);
      //   this.onUserChange(null, this.error);

      //   return;
      // }
      const tokenData = this.getDecodedAccessToken("token");
      this.user = {
        email: tokenData.email,
        first_name: tokenData.first_name,
        last_name: tokenData.last_name,
        middle_name: tokenData.middle_name,
        access_token: "token",
      };
      window.sessionStorage.setItem("user", JSON.stringify(this.user));
      this.onUserChange(this.user);
      resolve(this.user);
    });
  }

  resolveUser(timeout: number) {
    setTimeout(() => {
      if (window) {
        const signedInUser = window.sessionStorage.getItem("user");
        if (signedInUser) {
          this.user = JSON.parse(signedInUser);
        }
      } else {
        this.user = null;
      }
      this.onUserChange(this.user);
    }, timeout);

    return this;
  }
}
