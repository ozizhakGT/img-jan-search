import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';
import {MatSnackBar} from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  constructor(private http: HttpClient, private notification: MatSnackBar) { }
  apiUrl = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&safe_search=1&format=json&nojsoncallback=1&api_key=bac9f1ccfd854f27894fd47c4f01b1e8&content_type=1&is_getty=1&text='
  photos = new Subject<{}>();

  getImages(query) {
    return this.http.get(this.apiUrl + query);
  }
  saveSearch(search) {
    let allSearchs = JSON.parse(localStorage.getItem('allSearches'));
    if (allSearchs) {
      allSearchs.push(search)
      localStorage.setItem('allSearches', JSON.stringify(Array.from(new Set(allSearchs))));
    } else {
      localStorage.setItem('allSearches', JSON.stringify([search]));
    }
  }
  getSearchesFromLocalStorage() {
    return JSON.parse(localStorage.getItem('allSearches'));
  }
  throwNotification(message, method) {
      this.notification.open(message, null, {
        duration: 3500,
        panelClass: method,
        verticalPosition: 'top',
        horizontalPosition: 'right'
      });
  }
}
