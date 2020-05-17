import {Component, OnInit} from '@angular/core';

import {Course, Student} from '@app/_models';
import { StudentService } from '@app/_services';
import { CourseService } from '@app/_services';
import {first} from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({ templateUrl: 'professor_home.component.html', styleUrls: ['professor_home.component.css'] })
export class ProfessorHomeComponent implements OnInit {
    loading = false;
    user: Student;
    courses: Course[];
    semester = 'Spring';
    courseHeaders = [
      {name: 'Course Number', fieldName: 'courseNumber'},
      {name: 'Title', fieldName: 'title'}];
    capacity;

    constructor(private userService: StudentService,
                private courseService: CourseService) { }

    ngOnInit() {
      // get current user from localStorage
      this.user = JSON.parse(localStorage.getItem('currentUser'));
      this.courseService.getAllBySemester(this.semester).pipe(first()).subscribe(courses => {
        this.loading = false;
        this.courses = courses;
      }, err => this.loading = false);
    }

    getCapacity(courseId) {
      this.courseService.getCourseCapacity(courseId).pipe(first()).subscribe(capacity => {
        this.capacity = capacity;
        Swal.fire({
          title: 'Course capacity',
          text: `The capacity of this course is: ${this.capacity}`,
          icon: 'success',
          confirmButtonText: 'OK'
        });
      });
    }
}
