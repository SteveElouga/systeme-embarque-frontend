import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {MediaModel} from "./model/media.model";
import {BehaviorSubject, catchError, tap, throwError} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ServiceAppService {

  apiUrl = 'http://127.0.0.1:5000/api/'
  media = new MediaModel()


  mediaSubject$ = new BehaviorSubject<MediaModel>
  (this.media)
  imagesSubject$ = new BehaviorSubject<MediaModel[]>
  ([])
  videosSubject$ = new BehaviorSubject<MediaModel[]>
  ([])
  pdfSubject$ = new BehaviorSubject<MediaModel[]>
  ([])
  textesSubject$ = new BehaviorSubject<MediaModel[]>
  ([])
  audiosSubject$ = new BehaviorSubject<MediaModel[]>
  ([])
  otherSubject$ = new BehaviorSubject<MediaModel[]>
  ([])

  loading$ = new BehaviorSubject<boolean>(false)

  constructor(private http: HttpClient, private router: Router) {
  }

  get images$() {
    return this.imagesSubject$.asObservable()
  }

  get videos$() {
    return this.videosSubject$.asObservable()
  }

  get pdf$() {
    return this.pdfSubject$.asObservable()
  }

  get textes$() {
    return this.textesSubject$.asObservable()
  }

  get audios$() {
    return this.audiosSubject$.asObservable()
  }

  get other$() {
    return this.otherSubject$.asObservable()
  }

  get loading() {
    return this.loading$.asObservable()
  }

  getImages() {
    this.loading$.next(true)
    this.http.get<{ msg: string, result: MediaModel[] }>(this.apiUrl + "get/images", {headers:{'Cache-Control':'no-cache'}} ).pipe(
      tap((res) => {
        const sortRes = res.result.sort((a, b) => b.created_at.localeCompare(a.created_at))
        this.imagesSubject$.next(sortRes)
        this.loading$.next(false)
      })
    ).subscribe()
  }

  getVideos() {
    this.loading$.next(true)
    this.http.get<{ msg: string, result: MediaModel[] }>(this.apiUrl + "get/videos").pipe(
      tap((res) => {
        const sortRes = res.result.sort((a, b) => b.created_at.localeCompare(a.created_at))
        this.videosSubject$.next(sortRes)
        this.loading$.next(false)
      })
    ).subscribe()
  }

  getPdf() {
    this.loading$.next(true)
    this.http.get<{ msg: string, result: MediaModel[] }>(this.apiUrl + "get/pdf").pipe(
      tap((res) => {
        const sortRes = res.result.sort((a, b) => b.created_at.localeCompare(a.created_at))
        this.pdfSubject$.next(sortRes)
        this.loading$.next(false)
      })
    ).subscribe()
  }

  getTextes() {
    this.loading$.next(true)
    this.http.get<{ msg: string, result: MediaModel[] }>(this.apiUrl + "get/texts").pipe(
      tap((res) => {
        const sortRes = res.result.sort((a, b) => b.created_at.localeCompare(a.created_at))
        this.textesSubject$.next(sortRes)
        this.loading$.next(false)
      })
    ).subscribe()
  }

  getAudios() {
    this.loading$.next(true)
    this.http.get<{ msg: string, result: MediaModel[] }>(this.apiUrl + "get/audios").pipe(
      tap((res) => {
        const sortRes = res.result.sort((a, b) => b.created_at.localeCompare(a.created_at))
        this.audiosSubject$.next(sortRes)
        this.loading$.next(false)
      })
    ).subscribe()
  }

  getOther() {
    this.loading$.next(true)
    this.http.get<{ msg: string, result: MediaModel[] }>(this.apiUrl + "get/other").pipe(
      tap((res) => {
        const sortRes = res.result.sort((a, b) => b.created_at.localeCompare(a.created_at))
        this.otherSubject$.next(sortRes)
        this.loading$.next(false)
      })
    ).subscribe()
  }

  get media$() {
    return this.mediaSubject$.asObservable()
  }

  createMedia(file: File, metadata: { titre: string, description: string }) {
    this.loading$.next(true)
    const formData = new FormData();

    // Ajoute le fichier sous la clé 'file'
    formData.append('file', file, file.name);

    // Ajoute les métadonnées en tant que JSON string
    formData.append('metadata', JSON.stringify(metadata));

    this.http.post<any>(this.apiUrl + "add", formData).pipe(
      tap(() => this.loading$.next(false)),
      catchError(this.handleError)
    ).subscribe()
  }

  // Gestion des erreurs
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Une erreur est survenue';
    if (error.error instanceof ErrorEvent) {
      // Erreur côté client
      errorMessage = `Erreur : ${error.error.message}`;
    } else {
      // Erreur côté serveur
      errorMessage = `Erreur ${error.status}: ${error.message}`;
    }
    return throwError(errorMessage);
  }

  getMediaById(mediaId: number) {
    this.loading$.next(true)
    this.http.get<{ result: MediaModel }>(this.apiUrl + `get/${mediaId}`).pipe(
      tap((res) => {
        this.mediaSubject$.next(res.result)
        this.loading$.next(false)
      })
    ).subscribe()
  }

  toCorbeiille(id: number, type: string) {
    this.loading$.next(true)

    this.http.patch(this.apiUrl + `move/${id}`, '').pipe(
      tap(() => {
        this.loading$.next(false)
        switch (type) {
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
      })
    ).subscribe()
  }
  deleteMedia(id: number, type: string) {
    this.loading$.next(true)

    this.http.delete(this.apiUrl + `delete/${id}`).pipe(
      tap(() => {
        this.loading$.next(false)
        if (status == 'pending') {
          this.router.navigateByUrl('corbeille')
        } 
        else{
          switch (type) {
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
      })
    ).subscribe()
  }

  mediasCorbeille$ = new BehaviorSubject<MediaModel[]>([])
  get mediasCorbeille(){
    return this.mediasCorbeille$.asObservable()
  }
  getFromCorbeille() {
    this.loading$.next(true)
    this.http.get<{ msg: string, result: MediaModel[] }>(this.apiUrl + 'get/corbeille').pipe(
      tap((res)=>{
        const sortRes = res.result.sort((a, b) => a.name.localeCompare(b.name))
        this.mediasCorbeille$.next(sortRes)
        this.loading$.next(false)
      })
    ).subscribe()
  }

  restaure(id: number) {
    this.loading$.next(true)
    this.http.patch(this.apiUrl + `restaure/${id}`, '').pipe(
      tap(()=>{
        this.loading$.next(false)
        this.router.navigateByUrl('corbeille')
      })
    ).subscribe()
  }
}
