import * as _ from "lodash";


export class ObjectUtils {

  public static getYouTubeVideoId(url) {
    url = url.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
    return (url[2] !== undefined) ? url[2].split(/[^0-9a-z_\-]/i)[0] : url[0];
  }

  public static isItemInArray(arr: any[], item: any): boolean {
    return _.some(arr, item);
  }

}