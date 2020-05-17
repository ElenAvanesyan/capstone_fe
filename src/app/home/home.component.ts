import {Component, OnInit} from '@angular/core';
import { first } from 'rxjs/operators';

import {Course, Student} from '@app/_models';
import { StudentService } from '@app/_services';
import { CourseService } from '@app/_services';

@Component({ templateUrl: 'home.component.html', styleUrls: ['home.component.css'] })
export class HomeComponent implements OnInit {
    loading = false;
    user: Student;
    passedCourses: Course[];
    courseHeaders = [
      {name: 'Course Number', fieldName: 'courseNumber'},
      {name: 'Title', fieldName: 'title'},
      {name: 'Credits', fieldName: 'credit'}];

    constructor(private userService: StudentService,
                private courseService: CourseService) { }

    ngOnInit() {
      // get current user from localStorage
      this.user = JSON.parse(localStorage.getItem('currentUser'));

      this.passedCourses = [{ id: 1, courseNumber: 'FND 102', title: 'Freshman Seminar 2', credit: 3 }];
      // remove when getStudentCourses implemented in backend

      this.loading = true;
      this.courseService.getStudentCourses(this.user.id).pipe(first()).subscribe(courses => {
        this.loading = false;
        this.passedCourses = courses;
      }, err => this.loading = false);
    }
}
