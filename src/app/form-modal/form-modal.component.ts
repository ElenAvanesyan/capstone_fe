import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CourseService } from '@app/_services';
import {first} from "rxjs/operators";

@Component({
  selector: 'app-form-modal',
  templateUrl: './form-modal.component.html'
})
export class FormModalComponent {
  @Input() public id: number;
  @Input() public user;
  schedule = {};
  error = '';
  loading = false;
  myForm: FormGroup;
  days = ['MWF', 'TH'];
  times = ['8:30-13:30', '13:30-18:30'];
  numbers = [1, 2, 3, 4];

  constructor(public activeModal: NgbActiveModal, private formBuilder: FormBuilder, private courseService: CourseService) {
    this.createForm();
  }

  private createForm() {
    this.myForm = this.formBuilder.group({
      preferredTime: '',
      preferredTimeFrom: '',
      preferredTimeTo: '',
      preferredDays: '',
      numberOfCore: 0,
      numberOfGened: 0,
      numberOfTrack: 0
    });
  }

  private submitForm() {
    const indexOfHyphen = this.myForm.value.preferredTime.indexOf('-');
    this.myForm.value.preferredTimeFrom = this.myForm.value.preferredTime.substring(0, indexOfHyphen);
    this.myForm.value.preferredTimeTo = this.myForm.value.preferredTime.substring(indexOfHyphen + 1,
      this.myForm.value.preferredTime.length);
    this.loading = true;
    this.activeModal.close(this.myForm.value);
    this.courseService.generateSchedule(this.user.id, this.myForm.value).pipe(first())
      .subscribe(
        data => this.schedule = data,
        error => {
          this.error = error;
          this.loading = false;
        });
  }
}
