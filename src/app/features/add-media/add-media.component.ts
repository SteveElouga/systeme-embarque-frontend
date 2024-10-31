import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatDividerModule} from "@angular/material/divider";
import {ServiceAppService} from "../../core/service-app.service";
import {Observable} from "rxjs";
import {AsyncPipe, NgIf} from "@angular/common";
import {MatProgressBarModule} from "@angular/material/progress-bar";

@Component({
  selector: 'app-add-media',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, ReactiveFormsModule, MatButtonModule, MatDividerModule, MatIconModule, MatProgressBarModule, NgIf, AsyncPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './add-media.component.html',
  styleUrl: './add-media.component.scss'
})
export class AddMediaComponent implements OnInit {
  mediaInfosGroup!: FormGroup
  mediaTitleControl!: FormControl
  mediaDescriptionControl!: FormControl

  enable = false
  file!: File

  loading$!: Observable<boolean>

  constructor(private formBuilder: FormBuilder, private service: ServiceAppService) {
  }

  ngOnInit() {
    this.initMainForm();
  }

  private initMainForm() {
    this.mediaTitleControl = this.formBuilder.control(
      '', [Validators.minLength(3), Validators.required]
    )
    this.mediaDescriptionControl = this.formBuilder.control('', [Validators.minLength(10), Validators.required])

    this.mediaInfosGroup = this.formBuilder.group(
      {
        titre: this.mediaTitleControl,
        description: this.mediaDescriptionControl
      }
    )
  }

  getFormErrors(event: AbstractControl) {
    if (event.hasError('minlength')) {
      return 'Le nombre de caracteres minimum n\'est pas atteint';
    } else {
      return 'Ce champs est requis !';
    }
  }

  onFileSelected($event: Event) {
    const input = $event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      // console.log(input.files[0].name)
      // console.log(input.files[0].size, input.files[0].type)
      this.file = input.files[0]
      this.enable = true
    } else {
      this.enable = false
    }


  }

  createMedia() {
    this.loading$ = this.service.loading$
    if (this.enable) {
      this.service.createMedia(this.file, this.mediaInfosGroup.value)
      this.mediaInfosGroup.reset()
    }
  }
}
