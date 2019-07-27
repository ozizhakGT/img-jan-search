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
  constructor(private appService: AppService, private router: Router) { }
  ngOnInit() {
    /*
    * After delay of 1.4 sec check to see if input search length value is more then 3 letter
    * If So , do get request for photos.
    * TODO: IF NOT CREATE NOTOFICATION EXPLAINING THE PROBLEM!
    * */
    Observable.fromEvent(this.querySearch.nativeElement, 'keyup')
      .debounceTime(1400)
      .subscribe(() => {
        const query = this.querySearch.nativeElement.value;
        if (query.length >= 3) {
          this.isLoading = true;
          this.appService.getImages(query).subscribe(res => {
            this.appService.photos.next(res['photos']);
            this.isLoading = false;
          });
        }
      });
  }

}
