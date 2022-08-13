import { Injectable } from '@angular/core';
import { LivesyncReqVo } from '../models/livesync-req-vo';
import { LivesyncResDto } from '../models/livesync-res-dto';
import { AudioService } from "../services/audio.service";
import { StreamState } from "../interfaces/stream-state";
import { LivesyncService } from '../services/livesync.service';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  private socketConnectUrl = "wss://3q0gocmh51.execute-api.eu-west-2.amazonaws.com/production?liveSyncId=";

  webSocket!: WebSocket;
  state!: StreamState;

  constructor(public audioService: AudioService,
    private livesyncService: LivesyncService) {
    this.audioService.getState().subscribe(state => {
      this.state = state;
    });
  }

  public connectWebSocket(liveSync: any){
    this.webSocket = new WebSocket(this.socketConnectUrl + liveSync);

    this.webSocket.onopen = (event) => {
      console.log('Open: ', event);
    };

    this.webSocket.onmessage = (event) => {
      const responseMes = JSON.parse(event.data);
      console.log('read message: ', responseMes);

      if(responseMes['action'] == 'pause'){
        this.livesyncService.pause();
      }
      if(responseMes['action'] == 'play'){
        this.livesyncService.play();
      }
      if(responseMes['action'] == 'next'){
        this.livesyncService.next();
      }
      if(responseMes['action'] == 'previous'){
        this.livesyncService.previous();
      }
      if(responseMes['action'] == 'select'){
        const index = responseMes['value'];
        console.log('-->'+index);
        this.livesyncService.openSongFile(index);
      }
    };

    this.webSocket.onclose = (event) => {
      console.log('Close: ', event);
    };
  }

  public sendMessage(livesyncVo: LivesyncReqVo){
    console.log('send message: ', JSON.stringify(livesyncVo));
    this.webSocket.send(JSON.stringify(livesyncVo));
  }

  public disconnectWebSocket() {
    this.webSocket.close();
  }
}
