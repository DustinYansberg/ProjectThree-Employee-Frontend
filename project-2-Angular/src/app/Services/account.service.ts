import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AccountDetail } from '../Models/accountDetails';

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

  createAccount(accountDetails: AccountDetail) {
    return this.http.post(this.url + 'api/accounts', accountDetails, { observe: 'response' });
  }

  deleteAccount(id: string) {
    return this.http.delete(this.url + 'api/accounts/' + id, { observe: 'response' });
  }

}
