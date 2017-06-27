import { Component, OnInit } from '@angular/core';
import { PollService } from './../poll.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: any = {name: ''};

  constructor(private _pollService: PollService, private _route: ActivatedRoute, private _router: Router) { }
  login() {
      this._pollService.login(this.user)
      .then((data) => {console.log(data); this._router.navigate(['/dashboard']);})
      .catch((err) => console.log(err))
    }
  ngOnInit() {
  }

}
