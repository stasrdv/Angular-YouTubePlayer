import { HttpClient } from '@angular/common/http';
import { OnDestroy, ViewEncapsulation } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { Socket } from 'ngx-socket-io';
import { Subject } from 'rxjs/internal/Subject';
import { filter, map, takeUntil } from 'rxjs/operators';
import { CustomValidators } from 'src/app/shared/utils/custom.validators';
import { ObjectUtils } from 'src/app/shared/utils/object.utils';
import { YoutubePlayerApiService } from '../services/youtube-player.api.service';
import { EMIT_ITEM_KEY } from './constants/constants';


@Component({
  selector: 'app-youtube-player',
  templateUrl: './youtube-player.component.html',
  styleUrls: ['./youtube-player.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class YoutubePlayerComponent implements OnInit, OnDestroy {

  public urlInputControl = new FormControl('', CustomValidators.youtubeUrlValidator);
  private youtubePlayer;
  private ytEvent;
  public playListItems: string[] = [];
  private cleanupSubject = new Subject<void>();
  constructor(private socket: Socket, private playerApiService: YoutubePlayerApiService) { }


  ngOnInit(): void {
    this.getPlayListItems();
    this.subscribeToSocketEvent();
  }

  private subscribeToSocketEvent(): void {
    this.socket.fromEvent(EMIT_ITEM_KEY).pipe(takeUntil(this.cleanupSubject),
      map(item => item.toString())).subscribe(videoId => {
        this.playListItems.indexOf(videoId) === -1 ? this.playListItems.push(videoId) : null;
      });
  }

  private getPlayListItems() {
    this.playerApiService.getPlayListItems().pipe(takeUntil(this.cleanupSubject)).subscribe(items => {
      this.playListItems = items.filter(item => item);
    });
  }


  onStateChange(event) {
    this.ytEvent = event.data;
    if (this.ytEvent == 0) {
      this.playListItems.shift();
      if (this.playListItems.length > 0) {
        const videoId = this.playListItems[0];
        this.youtubePlayer.loadVideoById(videoId);
      }
    }
  }

  onPlayerReady(player): void {
    this.youtubePlayer = player;
    if (this.playListItems.length > 0) {
      const videoId = this.playListItems[0];
      this.youtubePlayer.loadVideoById(videoId);
    }
  }


  onVideoSelected($event) {
    const videoId = ObjectUtils.getYouTubeVideoId(this.urlInputControl.value);
    this.playListItems.push(videoId);
    if (this.playListItems.length === 1) {
      this.youtubePlayer.loadVideoById(videoId);
    }
    this.insertVideoId(videoId)
    this.urlInputControl.setValue('');
  }

  private insertVideoId(videoId: string): void {
    this.playerApiService.insertVideoItem(videoId).pipe(takeUntil(this.cleanupSubject)).subscribe(() => console.info(`New item inserted`))
  }


  ngOnDestroy(): void {
    this.cleanupSubject.next()
    this.cleanupSubject.unsubscribe();
  }

}
