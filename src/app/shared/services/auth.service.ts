export class AuthService {
  private isAutenticated = false;

  login() {
    this.isAutenticated = true;
  }

  logout() {
    this.isAutenticated = false;
    localStorage.clear();
  }

  isLoggedIn(): boolean {
    return this.isAutenticated;
  }
}
