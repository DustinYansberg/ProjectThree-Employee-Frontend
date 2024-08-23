import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Account } from '../Models/account';

@Injectable()
export class AccountService {

  constructor(private http: HttpClient) { }

  url: String = 'http://localhost:3000/';

  getAllAccounts() {
    return this.http.get(this.url + 'api/accounts', { observe: 'response' });
  }

  getAccountById(id: string) {
    return this.http.get(this.url + 'api/accounts/' + id, { observe: 'response' });
  }
  
  createAccount(account: Account) {
    return this.http.post(this.url + 'api/accounts', account, { observe: 'response' });
  }

  deleteAccount(id: string) {
    return this.http.delete(this.url + 'api/accounts/' + id, { observe: 'response' });
  }

}
