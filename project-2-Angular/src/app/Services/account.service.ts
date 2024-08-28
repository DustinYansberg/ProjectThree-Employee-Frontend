import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Account } from '../Models/account';
import { identity } from 'rxjs';

@Injectable()
export class AccountService {

  constructor(private http: HttpClient) { }

  url: string = 'http://4.156.40.62:9001/account/';

  getAllAccountsByIdentityId(identityId: string) {
    return this.http.get(this.url + identityId, { observe: 'response' });
  }

  getAccountById(id: string) {
    return this.http.get(this.url + id, { observe: 'response' });
  }
  
  createAccount(account: Account) {
    return this.http.post(this.url , account, { observe: 'response' });
  }

  processEntitlements(id: string){
    return this.http.put(this.url + "permission/" + id, { observe: 'response' });
  }

  deleteAccount(id: string) {
    return this.http.delete(this.url + "/" + id, { observe: 'response' });
  }

}
