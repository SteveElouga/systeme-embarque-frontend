import {Component, OnInit} from '@angular/core';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatRippleModule} from "@angular/material/core";
import {NgForOf, NgIf} from "@angular/common";
import {animate, animateChild, query, stagger, state, style, transition, trigger} from "@angular/animations";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {Router, RouterLinkActive} from "@angular/router";
import {MatGridListModule} from '@angular/material/grid-list';

// @ts-ignore
// @ts-ignore
// @ts-ignore
@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [MatCheckboxModule, FormsModule, MatFormFieldModule, MatInputModule, MatRippleModule, NgForOf, NgIf, MatProgressSpinner, MatButtonModule, MatDividerModule,
    MatIconModule,
    MatGridListModule, RouterLinkActive
  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
  animations: [
    trigger('list', [
      transition(':enter', [
        query('@listItem', [
          stagger(50, [
            animateChild()
          ])
        ])
      ])
    ]),
    trigger('listItem', [
      transition(':enter', [
        style({
          transform: 'translateY(100%)',
          opacity: '0',
        }),
        animate('500ms ease-in-out', style({
          transform: 'translateY(0%)',
          opacity: '1',
        })),
      ])
    ])
  ]
})
export class LandingPageComponent implements OnInit {
  centered = false;
  disabled = false;
  unbounded = false;

  radius!: number;
  color!: string;

  loading = true

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.loading = false
    }, 1000)

    this.color = "rgba(0,92,187,0.18)"
  }

  audios() {
    this.router.navigateByUrl('audios')
  }

  videos() {
    this.router.navigateByUrl('videos')
  }

  pdf() {
    this.router.navigateByUrl('pdf')
  }

  images() {
    this.router.navigateByUrl('images')
  }

  textes() {
    this.router.navigateByUrl('textes')
  }

  autres() {
    this.router.navigateByUrl('other')
  }

  corbeille() {
    this.router.navigateByUrl('corbeille')
  }
}
