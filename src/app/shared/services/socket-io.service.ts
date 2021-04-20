import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs/internal/Observable';
import { YoutubeVideoItem } from 'src/app/features/youtube-player/models/video-item.dto';
import { EMIT_ITEM_KEY } from 'src/app/features/youtube-player/youtube-player/constants/constants';

@Injectable({
  providedIn: 'root'
})
export class SocketIoService {

  constructor(private socket: Socket) { }


  onNewVideoAdded(): Observable<YoutubeVideoItem> {
    return this.subscribeToSocketInputEvents(EMIT_ITEM_KEY);
  }

  private subscribeToSocketInputEvents(eventKey:string):Observable<any>{
    return this.socket.fromEvent(eventKey);
  }
}
