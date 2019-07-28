import {Component, OnInit} from '@angular/core';
import {AppService} from '../app.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  photos: any[];
  firstPhotos: any[];
  validGallery = false;
  query: string;

  constructor(private appService: AppService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    /*
    * Subject that receive the newest photos array form the navbar component
    * if Its empty array , it will notify the client theirs no results.
    * by error getting photos will clean up the photos array and invalid the gallery
    * */
    this.appService.photos.subscribe(res => {
        if (parseInt(res['photos'].total) > 0) {
          this.photos = res['photos'].photo;
          this.firstPhotos = this.photos.slice(0, Math.floor(this.photos.length / 3));
          this.validGallery = true;
        } else {
          this.firstPhotos = this.photos = [];
          this.validGallery = false;
          this.appService.throwNotification(`Theirs no results for ${res['query']}`, 'failed');
        }
      },
      err => {
        this.photos = [];
        this.validGallery = false;
      });
  }


  // By scrolling down will give you more photo from the photos array. (fake Lazy loading)
  onScroll() {
    const rest = this.photos.length - this.firstPhotos.length;
    console.log(rest);
    if (rest === 0) {
      return;
    }
    else if (rest < 5) {
      this.firstPhotos = [...this.photos];
    } else {
      this.firstPhotos = [...this.firstPhotos, ...this.photos.slice(this.firstPhotos.length, Math.floor(this.firstPhotos.length + (rest * 0.25)))];
    }
  }
}
