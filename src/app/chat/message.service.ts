import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { Message } from "./message";
import { MESSAGES } from "./mock-messages";

@Injectable({
  providedIn: 'root',
})
export class MessageService {

  constructor() { }

    getHeroes(): Observable<Message[]> {
    return of(MESSAGES);
  }

  addMessage(username: string, data: string, timestamp: string) {
    MESSAGES.push({ username: username, data: data, timestamp: (new Date(timestamp)).toLocaleTimeString()});
  }

  getHero(id: number | string) {
    return this.getHeroes().pipe(
      // (+) before `id` turns the string into a number
      map((messages: Message[]) => messages.find(message => message.timestamp === id)!)
    );
  }
}

