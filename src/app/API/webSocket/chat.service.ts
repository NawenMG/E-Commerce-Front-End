import { Injectable } from '@angular/core';
import { Client, IMessage } from '@stomp/stompjs'; //Protoccolo di messaggistica
import SockJS from 'sockjs-client'; //Fornisce una connessione websocker browser

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private client: Client;
  private messages: IMessage[] = []; //Array di messaggi
  private messagesCallback: ((messages: IMessage[]) => void) | undefined;

  constructor() {
    this.client = new Client({ //Istanza del client socks
      webSocketFactory: () => new SockJS('http://localhost:8080/ws'),
      debug: (str) => { console.log(str); },
      onConnect: (frame) => {
        console.log('Connected: ' + frame);
        this.client.subscribe('/topic/messages', (message) => {
          this.handleMessage(message);
        });
      },
      onStompError: (frame) => {
        console.error('Errore del broker: ' + frame.headers['message']);
        console.error('Analisi addizionali: ' + frame.body);
      },
    });
  }

  connect() {
    this.client.activate();
  }

  disconnect() {
    this.client.deactivate();
  }

  sendMessage(messaggio: any) {
    this.client.publish({
      destination: '/app/send/message',
      body: JSON.stringify(messaggio),
    });
  }

  subscribeToMessages(callback: (messages: IMessage[]) => void) {
    this.messagesCallback = callback;
  }

  private handleMessage(message: IMessage) { //Gestionde dei messaggi ricevuti
    const body = JSON.parse(message.body);
    this.messages.push(body);
    if (this.messagesCallback) {
      this.messagesCallback(this.messages);
    }
  }
}
