import {Component, OnInit} from '@angular/core';
import {AppService} from '../app.service';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  photos: any[];
  validGallery = false;

  constructor(private appService: AppService,) {
  }

  ngOnInit() {
    this.appService.photos.subscribe(photos => {
        this.photos = photos['photo'];
        console.log(this.photos);
        this.validGallery = true;
      },
      err => {
          this.photos = [];
          this.validGallery = false;
      });
  }

}
