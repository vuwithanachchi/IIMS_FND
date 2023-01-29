import {Component, Inject, OnInit} from '@angular/core';
import {io} from "socket.io-client";
import {environment} from "../../../environments/environment";
import {DOCUMENT} from "@angular/common";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {


  SOCKET_ENDPOINT = environment.baseUrl;
  socket:any;
  message!:string;
  msgs:any


  constructor() { }

  ngOnInit() {
    if (!localStorage.getItem('foo')) {
      localStorage.setItem('foo', 'no reload')
      location.reload()
    } else {
      localStorage.removeItem('foo')
    }
    this.setupSocketConnection();
  }


  setupSocketConnection() {
    this.socket = io(this.SOCKET_ENDPOINT);
    this.socket.on('message-broadcast', (data: string) => {

      if (data) {

        const element = document.createElement('li');
        element.innerHTML = data;
        element.style.background = '#E6E7E9';
        element.style.padding =  '15px 30px';
        element.style.margin = '10px';
        element.style.borderRadius = '5px'
        const msg = document.getElementById('message-list');
  //       msg?.insertAdjacentHTML("beforeend", `
  //   <div class="myDiv" style="position: absolute;flex-direction: row">
  //   <p>User</p>
  //    <img src="https://i.ibb.co/W39DC1D/icons8-farmer-100.png" alt="icons8-farmer-100" style="width: 47px; margin-left: 12px">
  //   </div>
  // `);
        if (msg != null) {
          msg.appendChild(element);
        }else{
          console.log("non setupSocketConnection child")
        }
      }else{
        console.log("non setupSocketConnection master")
      }
    });
  }

  SendMessage() {
    this.socket.emit('message', this.message);
    const element = document.createElement('li');
    var msg = document.getElementById('message-list');
  //   msg?.insertAdjacentHTML("beforeend", `
  //   <div class="myDiv" style="position: absolute;flex-direction: row; left: 67rem">
  //    <p>Admin</p>
  //    <img src="https://i.ibb.co/W39DC1D/icons8-farmer-100.png" alt="icons8-farmer-100" style="width: 47px; margin-left: 12px">
  //   </div>
  // `);
      element.innerHTML = this.message;
      element.style.background = '#01A5F9';
      element.style.color = 'white';
      element.style.padding = '15px 30px';
      element.style.margin = '10px';
      element.style.textAlign = 'right';
      element.style.borderRadius = '5px'
      msg?.appendChild(element);
      this.message = '';
  }
}
