import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PollService } from './../poll.service';


@Component({
  selector: 'app-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.css']
})
export class PollComponent implements OnInit {
  poll: any = {};
  OptNum: number = null;
  constructor(private _route: ActivatedRoute, private _pollService: PollService, private _router: Router) {
    this._route.params.subscribe((param)=>{

      console.log(param.id)
       this._pollService.pollPage(param.id)
       .then(data => {this.poll = data; console.log(data); this.OptNum = this.poll.options.length})
       .catch(err => console.log(err))

    })
  }
  vote(opt) {
    this._pollService.increase(opt)
    .then(data => console.log(data))
    .catch(err => console.log(err))

    this._pollService.pollPage(this.poll._id)
    .then(data => {this.poll = data; console.log(data)})
    .catch(err => console.log(err))
  }
  Dashboard() {
    this._router.navigate(['/dashboard']);
  }
  ngOnInit() {

  }

}
