import {Component, OnInit} from '@angular/core';
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {MatList, MatListItem, MatListItemLine, MatListItemTitle} from "@angular/material/list";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {NgxPaginationModule} from "ngx-pagination";
import {animate, animateChild, query, stagger, style, transition, trigger} from "@angular/animations";
import {ServiceAppService} from "../../core/service-app.service";
import {Observable} from "rxjs";
import {MediaModel} from "../../core/model/media.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-corbeille',
  standalone: true,
  imports: [
    AsyncPipe,
    MatIcon,
    MatList,
    MatListItem,
    MatListItemLine,
    MatListItemTitle,
    MatProgressSpinner,
    NgForOf,
    NgIf,
    NgxPaginationModule
  ],
  templateUrl: './corbeille.component.html',
  styleUrl: './corbeille.component.scss',
  animations: [
    trigger('list', [
      transition(':enter', [
        query('@listItem', [
          stagger(200, [
            animateChild()
          ])
        ])
      ])
    ]),
    trigger('listItem', [
      transition(':enter', [
        style({
          transform: 'translateX(-100%)',
          opacity: '0',
        }),
        animate('1000ms ease-in-out', style({
          transform: 'translateX(0%)',
          opacity: '1',
        })),
      ])
    ])
  ]
})
export class CorbeilleComponent implements OnInit {
  loading$!: Observable<boolean>;
  medias$!: Observable<MediaModel[]>;
  page = 1;

  constructor(private mediaService: ServiceAppService, private router: Router) {
  }

  ngOnInit(): void {
    this.corbeille()
  }

  corbeille() {
    this.mediaService.getFromCorbeille()
    this.loading$ = this.mediaService.loading$
    this.medias$ = this.mediaService.mediasCorbeille$
  }

  onView(id: number) {
    this.router.navigateByUrl(`media/${id}`)
  }
}
