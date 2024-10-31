import {Component, OnInit} from '@angular/core';
import {MatGridListModule} from "@angular/material/grid-list";
import {ServiceAppService} from "../../core/service-app.service";
import {Observable} from "rxjs";
import {MediaModel} from "../../core/model/media.model";
import {AsyncPipe, DatePipe, NgForOf, NgIf} from "@angular/common";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";
import {MatDividerModule} from "@angular/material/divider";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {HlmSkeletonComponent} from "@spartan-ng/ui-skeleton-helm";
import {NgxPaginationModule} from "ngx-pagination";
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {animate, animateChild, query, stagger, style, transition, trigger} from "@angular/animations";
import {MatTooltip} from "@angular/material/tooltip";

@Component({
  selector: 'app-images',
  standalone: true,
    imports: [
        MatGridListModule,
        NgForOf,
        NgIf,
        AsyncPipe,
        MatCardModule,
        MatButtonModule,
        MatListModule,
        MatIconModule, MatDividerModule, DatePipe, MatProgressSpinner, HlmSkeletonComponent,
        NgxPaginationModule, MatTooltip, RouterLink, RouterLinkActive
    ],
  templateUrl: './images.component.html',
  styleUrl: './images.component.scss',
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
export class ImagesComponent implements OnInit {
  images$!: Observable<MediaModel[]>
  loading$! : Observable<boolean>
  page = 1

  constructor(private mediaService: ServiceAppService, private router: Router) {
  }

  ngOnInit(): void {
    this.getImages()
  }

  getImages() {
    this.mediaService.getImages()
    this.loading$ = this.mediaService.loading$
    this.images$ = this.mediaService.images$
  }

  onView(mediaId: number) {
    this.router.navigateByUrl(`media/${mediaId}`)
  }
}
