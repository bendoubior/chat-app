import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Message } from "../message";
import { MessageService } from "../message.service";

import {SharedService} from "../../shared.service";

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  messages$!: Observable<Message[]>;
  selectedId = 0;

  username = '';

  constructor(
    private service: MessageService,
    private route: ActivatedRoute,
    private sharedService: SharedService
  ) {}

  ngOnInit() {
    this.messages$ = this.route.paramMap.pipe(
      switchMap(params => {
        this.selectedId = parseInt(params.get('timestamp')!, 10);
        this.sharedService.sharedMessage.subscribe(message => this.username = message);
        console.log(this.username);
        return this.service.getHeroes();
      })
    );
  }
}
