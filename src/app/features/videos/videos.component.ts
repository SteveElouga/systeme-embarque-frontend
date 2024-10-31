import {Component, OnInit} from '@angular/core';
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {
  MatList,
  MatListItem,
  MatListItemAvatar,
  MatListItemLine,
  MatListItemTitle,
  MatListModule
} from "@angular/material/list";
import {Observable} from "rxjs";
import {MediaModel} from "../../core/model/media.model";
import {ServiceAppService} from "../../core/service-app.service";
import {MatDividerModule} from "@angular/material/divider";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {NgxPaginationModule} from "ngx-pagination";
import {Router} from "@angular/router";
import {animate, animateChild, query, stagger, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-videos',
  standalone: true,
  imports: [
    AsyncPipe,
    MatIcon,
    MatList,
    MatListItem,
    MatListItemAvatar,
    MatListItemLine,
    MatListItemTitle,
    NgForOf,
    NgIf,
    MatListModule, MatDividerModule, MatProgressSpinner, NgxPaginationModule
  ],
  templateUrl: './videos.component.html',
  styleUrl: './videos.component.scss',
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
export class VideosComponent implements OnInit {
  medias$!: Observable<MediaModel[]>
  loading$! : Observable<boolean>
  page=1;
  constructor(private mediaService: ServiceAppService, private router: Router) {
  }

  ngOnInit(): void {
    this.getVideos()
  }

  getVideos() {
    this.mediaService.getVideos()
    this.loading$ = this.mediaService.loading$
    this.medias$ = this.mediaService.videosSubject$
  }

  onView(mediaId: number) {
    this.router.navigateByUrl(`media/${mediaId}`)
  }
}
