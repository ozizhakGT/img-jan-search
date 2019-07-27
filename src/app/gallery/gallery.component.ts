import {Component, OnInit} from '@angular/core';
import {AppService} from '../app.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  photos: any[];
  validGallery = false;

  constructor(private appService: AppService) {}

  ngOnInit() {
    this.appService.photos.subscribe(photos => {
        console.log(photos);
        if (parseInt(photos['total']) > 0) {
          this.photos = photos['photo'];
          this.validGallery = true;
        } else {
          this.photos = [];
          this.validGallery = false;
        }
      },
      err => {
        this.photos = [];
        this.validGallery = false;
      });
  }

}
