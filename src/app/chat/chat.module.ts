import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ChatRoutingModule } from './chat-routing.module';
import {MessageListComponent} from "./message-list/message-list.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ChatRoutingModule
  ],
  declarations: [
    MessageListComponent
  ]
})
export class ChatModule {}
