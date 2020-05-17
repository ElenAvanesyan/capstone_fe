import {Component, OnInit} from '@angular/core';

import {Course, Student} from '@app/_models';
import { StudentService } from '@app/_services';
import { CourseService } from '@app/_services';

@Component({ templateUrl: 'professor_home.component.html', styleUrls: ['professor_home.component.css'] })
export class ProfessorHomeComponent implements OnInit {
    loading = false;
    user: Student;

    constructor(private userService: StudentService,
                private courseService: CourseService) { }

    ngOnInit() {
      // get current user from localStorage
      this.user = JSON.parse(localStorage.getItem('currentUser'));
    }
}
