import {Routes} from '@angular/router';
import {LandingPageComponent} from "./features/landing-page/landing-page.component";

export const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent
  },
  {
    path: 'images',
    loadComponent: () => import('./features/images/images.component').then(m => m.ImagesComponent)
  },
  {
    path: 'videos',
    loadComponent: () => import('./features/videos/videos.component').then(m => m.VideosComponent)
  },
  {
    path: 'pdf',
    loadComponent: () => import('./features/pdf/pdf.component').then(m => m.PdfComponent)
  },
  {
    path: 'textes',
    loadComponent: () => import('./features/textes/textes.component').then(m => m.TextesComponent)
  },
  {
    path: 'audios',
    loadComponent: () => import('./features/audios/audios.component').then(m => m.AudiosComponent)
  },
  {
    path: 'other',
    loadComponent: () => import('./features/other/other.component').then(m => m.OtherComponent)
  },
  {
    path: 'add',
    loadComponent: () => import('./features/add-media/add-media.component').then(m => m.AddMediaComponent)
  },
  {
    path: "media/:id",
    loadComponent: () => import('./features/media-plus/media-plus.component').then(m => m.MediaPlusComponent)
  },
  {
    path: "corbeille",
    loadComponent: () => import('./features/corbeille/corbeille.component').then(m => m.CorbeilleComponent)
  },
  {
    path: "about-app",
    loadComponent: () => import('./features/about-app/about-app.component').then(m => m.AboutAppComponent)
  },
];
