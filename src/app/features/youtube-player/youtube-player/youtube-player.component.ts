import { OnDestroy, ViewEncapsulation } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/operators';
import { SocketIoService } from 'src/app/shared/services/socket-io.service';
import { CustomValidators } from 'src/app/shared/utils/custom.validators';
import { ObjectUtils } from 'src/app/shared/utils/object.utils';
import { YoutubePlayerApiService } from '../../../core/services/youtube-player.api.service';
import { YoutubeVideoItem } from '../models/video-item.dto';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';



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
  public videoItems: YoutubeVideoItem[] = [];
  private cleanupSubject = new Subject<void>();
  constructor(private playerApiService: YoutubePlayerApiService, private socketService: SocketIoService) { }


  ngOnInit(): void {
    this.getPlayListItems();
    this.subscribeToSocketEvent();
  }
  drop(event): void {
    moveItemInArray(this.videoItems, event.previousIndex, event.currentIndex);
  }
  
  private subscribeToSocketEvent(): void {
    this.socketService.onNewVideoAdded().pipe(takeUntil(this.cleanupSubject))
      .subscribe(videoItem => {
        !ObjectUtils.isItemInArray(this.videoItems, videoItem) ? this.videoItems.push(videoItem) : null;
      });
  }

  private getPlayListItems(): void {
    this.playerApiService.getPlayListItems().pipe(takeUntil(this.cleanupSubject)).subscribe(items => {
      this.videoItems = items
    });
  }


  onStateChange(event): void {
    this.ytEvent = event.data;
    if (this.ytEvent == 0) {
      this.videoItems.shift();
      if (this.videoItems.length > 0) {
        const videoId = this.videoItems[0];
        this.youtubePlayer.loadVideoById(videoId);
      }
    }
  }

  onPlayerReady(player): void {
    this.youtubePlayer = player;
    if (this.videoItems.length > 0) {
      const videoId = this.videoItems[0];
      this.youtubePlayer.loadVideoById(videoId);
    }
  }


  onVideoInserted(): void {
    const videoId = ObjectUtils.getYouTubeVideoId(this.urlInputControl.value);
    this.playerApiService.insertVideoItem(videoId).pipe(takeUntil(this.cleanupSubject)).subscribe((videoItem) => {
      !ObjectUtils.isItemInArray(this.videoItems, videoItem) ? this.videoItems.push(videoItem) : null;
      this.videoItems.length === 1 ? this.youtubePlayer.loadVideoById(videoItem.videoId) : null;
      this.urlInputControl.setValue('');
    });
  }


  ngOnDestroy(): void {
    this.cleanupSubject.next()
    this.cleanupSubject.unsubscribe();
  }

}
