import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { from } from 'rxjs';
import * as SockJS from "sockjs-client";
import { ChatResponse } from 'src/app/interface/chat-response';
import { ChatService } from 'src/app/service/chat.service';
import {ChatMessage} from 'src/app/interface/chat-message';
import * as Stomp from "stompjs"

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit{

  private CHANNEL = "/topic/chat";
  private ENDPOINT = "http://localhost:8080/socket";
  private stompClient: any;
  isConnected = false;
  messages: ChatMessage[] = [];
  
  chatFormGroup: FormGroup = new FormGroup({
    message: new FormControl('', Validators.required)
  });
  constructor(
    private chatService: ChatService
  ){}
  ngOnInit(): void {
     this.connectWebsocket(); 
  }

  private connectWebsocket(){
    let ws = new SockJS(this.ENDPOINT);
    this.stompClient = Stomp.over(ws);
    let that = this;
    this.stompClient.connect({}, function(){
        that.isConnected = true;
        that.subScribeToGlobalChat();
    });
  }

private subScribeToGlobalChat(){
  let that = this;
  this.stompClient.subscribe(this.CHANNEL, (message: any)=>{
    let newMessage = JSON.parse(message.body) as ChatMessage;
    console.log(newMessage);
    that.messages.push(newMessage);
  });
}

  onSubmit(){
    let message = this.chatFormGroup.controls.message.value;
    alert(message);
    if(!this.isConnected){
      alert("Pls connect to web socket");
      return;
    }
    this.chatService.postMessage(message).subscribe(
      {
        next: response => console.log(response),
        error: error =>console.log(error)
      }
    )
  }
  }

