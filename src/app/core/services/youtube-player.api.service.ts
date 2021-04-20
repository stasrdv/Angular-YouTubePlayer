import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { YoutubeVideoItem } from '../../features/youtube-player/models/video-item.dto';


@Injectable({
    providedIn: 'root'
})
export class YoutubePlayerApiService {

    constructor(private http: HttpClient) { }

    getPlayListItems(): Observable<YoutubeVideoItem[]> {
        const url = `${BASE_API_URL}getVideos`
        return this.http.get<YoutubeVideoItem[]>(url);
    }

    insertVideoItem(videoId: string): Observable<YoutubeVideoItem> {
        const url = `${BASE_API_URL}insertVideo`
        const body = { videoId: videoId };
        return this.http.post<YoutubeVideoItem>(url, body);
    }
}

export const BASE_API_URL = 'http://localhost:8000/api/'
