import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PlayService } from '../play.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss']
})
export class PlayComponent implements OnInit {

  constructor(private servicePlay: PlayService, private sanitizer: DomSanitizer) { }

  @ViewChild('card', { read: null, static: false }) card: ElementRef;

  nameFullImages: any[] = [];
  imgExist: boolean = false;
  campeoes: any[] = [];
  index: number = 0;
  image: any;
  images: any[] = [];

  ngOnInit() {
    this.getChampions();
  }

  getChampions() {
    // if (this.campeoesStorage.length == 0 || this.imagesStorage.length == 0) {
    this.imgExist = true;
    this.servicePlay.getAllChampions()
      .subscribe(result => {
        result.forEach(e => {
          this.campeoes = Object.keys(e.data).map(function (key) { return e.data[key] });
          localStorage.setItem('campeoes', JSON.stringify(this.campeoes));
          this.getAllImages();
        })
      }, err => {
        console.log(err);
      });
    // }
    // else {
    // this.getAllImages();
    // this.imgExist = false;
    // }
  }

  getAllImages() {
    // let imagesStorage = JSON.parse(localStorage.getItem('images'));
    // this.images.push(imagesStorage);
    // this.imgExist = false;

    this.imgExist = true;
    this.campeoes.forEach(result => {
      this.nameFullImages.push(result.image.full);
    });
    this.servicePlay.getAllImages(this.nameFullImages)
      .subscribe(result => {
        result.forEach(e => {
          let objectURL = 'data:image/png;base64,' + e;
          this.images.push(this.sanitizer.bypassSecurityTrustUrl(objectURL));
          localStorage.setItem('images', JSON.stringify(this.images));
          this.imgExist = false;
        })
      }, err => {
        console.log(err);
      })
  }

  // click(champ, i, e) {
  //   this.index = i;

  //   var full = champ.image.full;
  //   this.getImage(full);
  // }

  // getImage(full: string) {
  //   this.servicePlay.getImageChampion(full)
  //     .subscribe((blob: any) => {
  //       let objectURL = 'data:image/png;base64,' + blob;
  //       this.image = this.sanitizer.bypassSecurityTrustUrl(objectURL);
  //     }, err => {
  //       console.log(err);
  //     })
  // }

}
