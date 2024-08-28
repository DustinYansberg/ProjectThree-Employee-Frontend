import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class NotificationService {

  constructor(private http: HttpClient) { }

   //url: String = 'http://localhost:8082/notification/';
  url: String = 'http://4.156.40.62:9001/notification/'

  getNotificationsById(id: string) {
    return this.http.get(this.url + 'notifications/' + id, { observe: 'response' });
  }

  checkNotifictionsById(id: string) {
    return this.http.delete(this.url + 'check/' + id, { observe: 'response' });
  }

}
