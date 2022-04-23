import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as xml2js from 'xml2js';

const CORS_PROXY = "https://cors-anywhere.herokuapp.com/"

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private urlRequest="https://www.lemonde.fr/rss/en_continu.xml";

  constructor(private http: HttpClient) { }
  async getData(){
    return await this.http.get(CORS_PROXY + this.urlRequest,{ responseType: 'text'}).toPromise();
  }
  /**
 * Converts the feed response to json
 *
 * @private
 * @param {any} response
 * @memberof FeedService
 */
public extractFeeds(response: any) {
  const parser = new xml2js.Parser({explicitArray : false, mergeAttrs : true});
  let feed: any;
  parser.parseString(response, function(err: any, result: any) {
    if (err) {
      console.warn(err);
    }
    feed = result;
  });

  return feed || { };
}

}
