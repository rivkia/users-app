import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { User } from 'src/app/models/user';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {
  @Input() user: User;
  @Output() clickUser = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }
  onCardClick() {
    this.clickUser.emit(this.user);
  }
}
