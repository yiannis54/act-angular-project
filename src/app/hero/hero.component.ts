import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hero',
  template: ` <img
    src="https://onelity.com/wp-content/uploads/2020/11/onelity-logo-dark-background-1-e1605202976927.png"
    class="hero-image"
  />`,
  styles: [
    `
      .hero-image {
        filter: invert();
        max-width: 100vw;
        position: absolute;
        left: 50%;
        top: 40%;
        transform: translate(-50%, -50%);
      }
    `,
  ],
})
export class HeroComponent implements OnInit {
  constructor() {}
  ngOnInit(): void {}
}
