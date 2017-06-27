import { Component, OnInit } from '@angular/core';
import { PollService } from './../poll.service';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  pollList: any = [];
  currentUser: any = {};
  constructor(private _pollService: PollService, private _route: ActivatedRoute, private _router: Router) { }

  createPoll() {
    this._router.navigate(['/create']);
  }

  logOut() {
    console.log("Leaving...")
    this._pollService.LogOut()
    .then( (data) => {this._router.navigate(['/'])})
    .catch((err) => console.log('did not log out successfully'))
  }

  getCurrent() {
    this._pollService.getCurrent()
    .then((data) => this.currentUser = data)
    .catch( err => console.log('trouble getting currentUser'))
  }
  getPolls() {
    this._pollService.getPolls()
    .then( (data) => {
      console.log(data);
      this.pollList = data;
    })
    .catch( (err) => console.log('Problem getting polls'))
  }
  pollPage(pollNum) {
    this._router.navigate(['/poll/'+pollNum])
  }
  deleteT(id) {
    this._pollService.deleteThis(id)
    .then(data => console.log('great'))
    .catch(err => console.log(err))

    this.getPolls()
  }
  ngOnInit() {
    this.getCurrent()
    this.getPolls();

  }

}
