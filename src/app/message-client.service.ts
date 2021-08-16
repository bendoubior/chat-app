import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Message } from "./message.model";
import { Data } from "@angular/router";
import {timestamp} from "rxjs/operators";
import {MessageService} from "./chat/message.service";

@Injectable({
  providedIn: 'root'
})
export class MessageClientService {
  currentMessage = this.socket.fromEvent<Message>('message');
  messages = this.socket.fromEvent<string[]>('messages');

  constructor(private socket: Socket, private messageService: MessageService) {
    this.socket.on("getMsg", (msg: any) => {
      messageService.addMessage(msg.username, msg.msg, msg.timestamp);
    });
  }

  getLastMessage() {
    let gg = this.socket.emit('getMsg');
    console.log(gg.msg);
  }

  newMessage(username: string, message: string, timestamp: Date = new Date(), id: string = this.msgId()) {
    this.socket.emit('addMsg', { id: id, username: username, msg: message, timestamp: timestamp });
  }

  editMessage(message: Message) {
    this.socket.emit('editMsg', message);
  }

  private msgId() {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 5; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
  }
}
