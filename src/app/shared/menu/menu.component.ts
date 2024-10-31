import {Component} from '@angular/core';
import {MatTooltip} from "@angular/material/tooltip";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    MatTooltip,
    RouterLink,
    RouterLinkActive,
    NgIf
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
  animations: [
    trigger('listItem', [
      transition(':enter', [
        style({
          opacity: '0',
        }),
        animate('500ms 3000ms ease-in-out', style({
          opacity: '1',
        })),
      ])
    ])
  ]
})
export class MenuComponent {

}
