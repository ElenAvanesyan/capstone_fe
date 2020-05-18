import { Component, Input } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CourseService } from '@app/_services';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-form-modal',
  templateUrl: './form-modal.component.html'
})
export class FormModalComponent {
  @Input() public id: number;
  @Input() public user;
  schedule;
  error = '';
  loading = false;
  myForm: FormGroup;
  days = ['MWF', 'TH'];
  times = ['08:30-14:45', '13:30-18:20', '08:30-18:20'];
  numbers = [0, 1, 2, 3];
  tracks = ['CS', 'MM'];
  headers = [
    {name: 'Course Number', fieldName: 'courseNumber'},
    {name: 'Title', fieldName: 'title'},
    {name: 'Days', fieldName: 'weekDays'},
    {name: 'Start Time', fieldName: 'startTime'},
    {name: 'End Time', fieldName: 'endTime'}];

  constructor(public activeModal: NgbActiveModal, private formBuilder: FormBuilder, private courseService: CourseService) {
    this.createForm();
  }

  private createForm() {
    this.myForm = this.formBuilder.group({
      preferredTime: ['', Validators.required],
      preferredStartTime: '',
      preferredEndTime: '',
      preferredDays: ['', Validators.required],
      numberOfCore: [0, Validators.required],
      numberOfGenEd: [0, Validators.required],
      track: '',
      numberOfTrack: 0,
      isFoundationChecked: false,
      term: 'Spring'
    });
  }

  private submitForm() {
    const indexOfHyphen = this.myForm.value.preferredTime.indexOf('-');
    this.myForm.value.preferredStartTime = this.myForm.value.preferredTime.substring(0, indexOfHyphen);
    this.myForm.value.preferredEndTime = this.myForm.value.preferredTime.substring(indexOfHyphen + 1,
      this.myForm.value.preferredTime.length);
    this.loading = true;
    this.courseService.generateSchedule(this.user.id, this.myForm.value).pipe(first())
      .subscribe(
      data => this.schedule = data,
      error => {
        this.error = error;
        this.loading = false;
      });
  }
}
