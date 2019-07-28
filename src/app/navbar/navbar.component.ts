import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AppService} from '../app.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/do';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @ViewChild('serachIpnut', {static: true}) querySearch: ElementRef;
  isLoading = false;
  isShowSearches = false;
  allSearches = this.appService.getSearchesFromLocalStorage() || [];
  onSearch;

  constructor(private appService: AppService, private router: Router) {
  }

  ngOnInit() {

    this.appService.throwNotification('Welcome to ImgJan Search!', 'success');
    /*
    * After delay of 1.4 sec check to see if input search length value is more then 3 letter
    * If So , do get request for photos.
    * TODO: IF NOT CREATE NOTOFICATION EXPLAINING THE PROBLEM!
    * */
    this.onSearch = Observable.fromEvent(this.querySearch.nativeElement, 'keyup')
      .debounceTime(1400)
      .subscribe(() => {
        const query = this.querySearch.nativeElement.value;
        this.querySearch.nativeElement.value = '';
        // only by 3 letters and up it will start the request
        if (query.length >= 3) {
          this.isLoading = true;
          this.appService.getImages(query).subscribe(res => {
              this.appService.photos.next({photos: res['photos'], query: query});
              this.appService.saveSearch(query);
              this.allSearches = this.appService.getSearchesFromLocalStorage();
              this.isLoading = false;
              this.router.navigate([query]);
            },
            err => () => {
              this.isLoading = false;
              this.appService.throwNotification(`Search Failed, Try again`, 'failed');

            });
        }
      });

    // after choosing words from the recent search list whe the mouse click on the gallery it will getting the photos by your query you choose
    Observable.fromEvent(document.querySelector('.gallery'), 'mouseup')
      .subscribe(() => {
        if (this.querySearch.nativeElement.value.length > 0) {
          this.isShowSearches = false;
          return this.onSearch.next();
        }
      });
  }

  // by clicking on item from the recent search list it will add it to the input
  onAddToSearch(query) {
    this.querySearch.nativeElement.value += this.querySearch.nativeElement.value.length === 0 ? query : ' ' + query;
  }

  // confirm with the client that he want to erase all is recent search list from the local storage
  onClearSearches() {
    if (confirm(`You may lose all your recent searches, are you sure you want to continue ?`)) {
      localStorage.clear();
      this.allSearches = [];
      this.querySearch.nativeElement.value = '';
    }
  }
}
