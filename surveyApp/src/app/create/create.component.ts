import { Component, OnInit } from '@angular/core';
import { PollService } from './../poll.service';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  question: any = {question: '', options: [{option: ''}, {option: ''}, {option: ''}, {option: ''}]}
  errorMess: string = '';
  constructor(private _pollService: PollService, private _route: ActivatedRoute, private _router: Router) { }

  ngOnInit() {
  }

  makePoll(){
    this.errorMess = '';
    console.log(this.question)
    this._pollService.makePoll(this.question)
    .then(data => {
      console.log('poll was made', data);
      if (data.hasOwnProperty('error')) {
        this.errorMess = data.error;
      } else {
        this._router.navigate(['/dashboard']);
      }
    })
    .catch(err => console.log('There was an error creating a poll, ', err))


  }

  cancel() {
    this._router.navigate(['/dashboard'])
  }

}
