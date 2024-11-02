import {Component, HostListener, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {ServiceAppService} from "../../core/service-app.service";
import {MediaModel} from "../../core/model/media.model";
import {Observable, tap} from "rxjs";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {AsyncPipe, NgIf, NgStyle, NgSwitch, NgSwitchCase} from "@angular/common";
import {MatDividerModule} from "@angular/material/divider";
import {MatIconModule} from "@angular/material/icon";
import {animate, animateChild, query, stagger, style, transition, trigger} from "@angular/animations";
import {MatProgressSpinner} from "@angular/material/progress-spinner";

@Component({
  selector: 'app-media-plus',
  standalone: true,
  imports: [MatCardModule, NgIf, AsyncPipe, RouterLink, MatButtonModule, MatDividerModule, MatIconModule, NgSwitch, NgSwitchCase, MatProgressSpinner, NgStyle],
  templateUrl: './media-plus.component.html',
  styleUrl: './media-plus.component.scss',
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
          transform: 'translateX(100%)',
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
export class MediaPlusComponent implements OnInit {

  animationsStates: { [key: string]: 'default' | 'active' } = {};

  media$!: Observable<MediaModel>
  type!: string
  loading$!: Observable<boolean>
  isMallScreen = false
  constructor(private route: ActivatedRoute, private mediaService: ServiceAppService, private router: Router) {
  }

  ngOnInit(): void {
    this.getMedia()
    this.loading$ = this.mediaService.loading$
    this.checkScreenResize();
  }

  @HostListener('window: resize', ['$event'])
  onResize(){
    this.checkScreenResize()
  }

  checkScreenResize(){
    if (typeof window !== 'undefined') {
      this.isMallScreen = window.innerWidth <= 500;
      console.log(this.isMallScreen);
    }
  }

  getMedia() {
    const mediaId = this.route.snapshot.params["id"];
    this.mediaService.getMediaById(mediaId)
    this.media$ = this.mediaService.media$
    this.media$.pipe(
      tap((res) => this.type = res.type)
    ).subscribe()
  }

  back(status: string) {
    if (status == 'pending') {
      this.router.navigateByUrl('corbeille')
    } else {
      switch (this.type) {
        case 'image':
          this.router.navigateByUrl('images')
          break;
        case 'video':
          this.router.navigateByUrl('videos')
          break;
        case 'text':
          this.router.navigateByUrl('textes')
          break;
        case 'pdf':
          this.router.navigateByUrl('pdf')
          break;
        case 'else':
          this.router.navigateByUrl('other')
          break;
        default:
          this.router.navigateByUrl('audios')
      }
    }
  }

  move(id: number, type: string) {
    this.mediaService.toCorbeiille(id, type)
  }

  restaure(id: number) {
    this.mediaService.restaure(id)
  }

  delete(id: number, type: string, status: string) {
    this.mediaService.deleteMedia(id, type)
  }
}
