import { Input, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { NgbCarousel } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-image-carousel',
  templateUrl: './image-carousel.component.html',
  styleUrls: ['./image-carousel.component.css'],
})
export class ImageCarouselComponent implements OnInit {
  // Images to show in this carousel
  @Input() imageUrls: Array<string>;

  // For calling the carousel API
  @ViewChild('ngcarousel', { static: true }) ngCarousel: NgbCarousel;

  constructor() {}

  ngOnInit(): void {}

  // Sets the carousel image using the specified index
  showImage(index: number) {
    this.ngCarousel.select(`image-${index}`);
  }
}
