import {Component, HostListener, Input, OnInit, ViewChild} from '@angular/core';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatDrawer, MatSidenavModule} from "@angular/material/sidenav";
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {MatNavList} from "@angular/material/list";
import {NgIf, NgStyle} from "@angular/common";
import {MatTooltip} from "@angular/material/tooltip";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    RouterLink,
    RouterLinkActive,
    MatNavList,
    NgIf,
    MatTooltip,
    NgStyle,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  animations: [
    trigger('listItem', [
      state('default', style({
        'z-index': '1',
      })),
      state('active', style({
        transform: "rotate(720deg)",
        'z-index': '2',
      })),
      transition('default => active', [
        animate('1000ms ease-in-out'),
      ]),
      transition('active => default', [
        animate('1000ms ease-in-out'),
      ]),
      transition(':enter', [
        style({
          transform: 'rotate(0deg)',
        }),
        animate('1000ms ease-in-out', style({
          transform: 'rotate(1080deg)',
        })),
      ])
    ])
  ]
})
export class HeaderComponent implements OnInit {
  @ViewChild('snav') snav!: MatDrawer
  drawerZIndex = 0
  @Input() nameApp!: String;

  openValue = false

  hover = false;
  hoverStaet = 'default'

  isMallScreen = false

  constructor(private router: Router) {

  }

  ngOnInit(): void {
    this.checkScreenResize()
  }

  @HostListener('window: resize', ['$event'])
  onResize() {
    this.checkScreenResize()
  }

  checkScreenResize() {
    if (typeof window !== 'undefined') {
      this.isMallScreen = window.innerWidth <= 500;
      console.log(this.isMallScreen);
    }
  }

  onDrawerStateChange(isOpen: boolean) {
    this.drawerZIndex = isOpen ? 1000 : 0
    this.openValue = isOpen
  }

  display() {
    this.openValue = !this.openValue
  }

  onListItemMouseEnter() {
    this.hoverStaet = 'active'
  }

  onListItemMouseLeave() {
    this.hoverStaet = 'default'
  }

}
