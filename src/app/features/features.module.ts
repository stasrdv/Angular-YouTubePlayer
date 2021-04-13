
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YoutubePlayerComponent } from './youtube-player/youtube-player/youtube-player.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { SocketIoModule } from 'ngx-socket-io';
import { socketIoConfig } from './youtube-player/youtube-player/constants/constants';
import { CoreModule } from '../core/core.module';



const routes: Routes = [
  { path: '', component: YoutubePlayerComponent },

];


@NgModule({
  declarations: [YoutubePlayerComponent],
  imports: [
    CommonModule, SharedModule, RouterModule.forChild(routes), SocketIoModule.forRoot(socketIoConfig),CoreModule
  ],
  exports: [YoutubePlayerComponent, RouterModule, SocketIoModule]
})
export class FeaturesModule { }
