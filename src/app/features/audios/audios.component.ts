import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {MediaModel} from "../../core/model/media.model";
import {ServiceAppService} from "../../core/service-app.service";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {MatList, MatListItem, MatListItemLine, MatListItemTitle} from "@angular/material/list";
import {MatDivider} from "@angular/material/divider";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {NgxPaginationModule} from "ngx-pagination";
import {Router} from "@angular/router";
import {animate, animateChild, query, stagger, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-audios',
  standalone: true,
  imports: [
    AsyncPipe,
    MatIcon,
    MatList,
    MatListItem,
    MatListItemLine,
    MatListItemTitle,
    NgForOf,
    NgIf,
    MatDivider,
    MatProgressSpinner,
    NgxPaginationModule
  ],
  templateUrl: './audios.component.html',
  styleUrl: './audios.component.scss',
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
export class AudiosComponent implements OnInit {
  medias$!: Observable<MediaModel[]>
  loading$! : Observable<boolean>
  page: number = 1;
  constructor(private mediaService: ServiceAppService, private router: Router) {
  }

  ngOnInit(): void {
    this.getAudios()
  }

  getAudios() {
    this.mediaService.getAudios()
    this.loading$ = this.mediaService.loading$
    this.medias$ = this.mediaService.audios$
  }

  onView(mediaId: number) {
    this.router.navigateByUrl(`media/${mediaId}`)
  }
}
