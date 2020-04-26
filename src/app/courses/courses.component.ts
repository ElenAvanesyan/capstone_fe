import {Component, OnInit} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';

import { Course } from '@app/_models';
import { CourseService } from '@app/_services';
import { FormModalComponent } from '@app/form-modal/form-modal.component';

@Component({ templateUrl: 'courses.component.html', styleUrls: ['courses.component.css'] })
export class CoursesComponent implements OnInit {
    loading = false;
    courses: Course[];
    courseHeaders = [{name: 'ID', fieldName: 'id'},
      {name: 'Course Number', fieldName: 'courseNumber'},
      {name: 'Title', fieldName: 'title'},
      {name: 'Credits', fieldName: 'credit'}];

    constructor(private courseService: CourseService, private modalService: NgbModal) { }

    ngOnInit() {

      this.courses = [{ id: 1, courseNumber: 'FND 102', title: 'Freshman Seminar 2', credit: 3 }];
      // remove when getStudentCourses implemented in backend

      this.loading = true;
      this.courseService.getAll().pipe(first()).subscribe(courses => {
        this.loading = false;
        this.courses = courses;
      }, err => this.loading = false);
    }

  openFormModal() {
    const modalRef = this.modalService.open(FormModalComponent);

    modalRef.result.then((result) => {
      console.log(result);
    }).catch((error) => {
      console.log(error);
    });
  }
}
