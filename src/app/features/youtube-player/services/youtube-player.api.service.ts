import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BASE_API_URL } from './constants/api-constants';

@Injectable({
    providedIn: 'root'
})
export class YoutubePlayerApiService {

    constructor(private http: HttpClient) { }

    getPlayListItems(): Observable<string[]> {
        const url = `${BASE_API_URL}getPlayList`
        return this.http.get<string[]>(url);
    }

    insertVideoItem(videoId: string): Observable<any> {
        const url = `${BASE_API_URL}insertVideo`
        const body = { id: videoId };
        return this.http.post(url, body)
    }
}

