import { HttpClient } from '@angular/common/http';
import { Pipe, PipeTransform } from '@angular/core';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import 'moment-duration-format';


@Pipe({
  name: 'urlFormat'
})
export class UrlFormatPipe implements PipeTransform {

  constructor(private http: HttpClient) { }
  transform(videoId: string): any {
    const queryUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails&id=${videoId}&key=AIzaSyDOjAVBO9zIard9S9BDzzCzZSjfn-Q2xwk`
    return this.http.get(queryUrl).pipe(map(response => {
      return <any>response['items'].map(item => {
        const duration = moment.duration(item.contentDetails.duration);
        return item.snippet.title + '  :   ' + duration.format('HH:mm:ss', { trim: false });

      })
    }));
  }
}

