import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { Course } from '@app/_models';
import {map} from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class CourseService {
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Course[]>(`${environment.apiUrl}/schedule/course`);
  }

  getAllBySemester(term) {
    return this.http.get<Course[]>(`${environment.apiUrl}/schedule/course/term/${term}`);
  }

  getStudentCourses(studentId) {
    return this.http.get<Course[]>(`${environment.apiUrl}/schedule/student/passed/${studentId}`);
  }

  generateSchedule(studentId, preferences) {
    return this.http.post<any>(`${environment.apiUrl}/schedule/generate/${studentId}`, {preferences})
      .pipe(map(schedule => {
        return schedule;
      }));
  }
}
