import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import {FormsModule} from "@angular/forms";
import { MessageComponent } from './chat/message/message.component';
import {ChatModule} from "./chat/chat.module";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MessageComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ChatModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
