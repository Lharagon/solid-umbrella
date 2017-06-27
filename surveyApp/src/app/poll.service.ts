import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs';

@Injectable()
export class PollService {

  constructor(private _http: Http) { }
  login(User) {
    return this._http.post('/api/login', User).map(data=>data.json()).toPromise();
  }
  LogOut() {
    return this._http.get('/api/getOut').map(data=>data.json()).toPromise();
  }
  getCurrent() {
    return this._http.get('/api/getCurrent').map(data=>data.json()).toPromise();
  }
  makePoll(newPoll) {
    return this._http.post('/api/createPoll', newPoll).map(data=>data.json()).toPromise();
  }
  getPolls() {
    console.log('coming into service')
    return this._http.get('/api/getPolls').map(data=>data.json()).toPromise();
  }
  pollPage(id) {
    return this._http.get('/api/getPollsPage/' + id).map(data=>data.json()).toPromise();
  }
  increase(option) {
    return this._http.get('/api/increase/' + option).map(data=>data.json()).toPromise();
  }
  deleteThis(ids) {
    return this._http.get('/api/deletePoll/' + ids).map(data=>data.json()).toPromise();
  }
}
