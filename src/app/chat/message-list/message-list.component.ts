import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Message } from "../message";
import { MessageService } from "../message.service";

import {SharedService} from "../../shared.service";
import {MessageClientService} from "../../message-client.service";

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit, OnDestroy {
  messages$!: Observable<Message[]>;
  selectedId = 0;

  username = '';
  cur_message = ''

  intervalId: any;

  constructor(
    private service: MessageService,
    private route: ActivatedRoute,
    private sharedService: SharedService,
    private messageClientService: MessageClientService
  ) {}

  ngOnInit() {
    this.messages$ = this.route.paramMap.pipe(
      switchMap(params => {
        this.selectedId = parseInt(params.get('timestamp')!, 10);
        this.sharedService.sharedMessage.subscribe(message => this.username = message);
        return this.service.getHeroes();
      })
    );

    /*this.intervalId = setInterval(() =>{
      this.AddNewMessages();
    }, 1000);*/
  }

  SendMessage() {
    this.messageClientService.newMessage(this.username, this.cur_message);
  }

  AddNewMessages() {
    this.messageClientService.getLastMessage();
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }
}
