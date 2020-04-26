import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { Course } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class CourseService {
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Course[]>(`${environment.apiUrl}/courses`);
  }

  getStudentCourses(studentId) {
    return this.http.get<Course[]>(`${environment.apiUrl}/courses/${studentId}`);
  }
}
