import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {AuthGuard} from "../login/auth.guard";
import {MessageListComponent} from "./message-list/message-list.component";

const chatRoutes: Routes = [
  {
    path: 'chat',
    component: MessageListComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(chatRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class ChatRoutingModule { }
