import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { Student } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<Student>;
    private isProfessorSubject: BehaviorSubject<boolean>;
    public currentUser: Observable<Student>;
    public isProfessor: Observable<boolean>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<Student>(JSON.parse(localStorage.getItem('currentUser')));
        this.isProfessorSubject = new BehaviorSubject<boolean>(localStorage.getItem('role') === 'professor');
        this.currentUser = this.currentUserSubject.asObservable();
        this.isProfessor = this.isProfessorSubject.asObservable();
    }

    public get currentUserValue(): Student {
        return this.currentUserSubject.value;
    }

    login(username: string, password: string, role: string) {
        const url = role === 'professor' ? `${environment.apiUrl}/schedule/professor/authenticate` :
          `${environment.apiUrl}/schedule/student/authenticate`;
        return this.http.post<any>(url, { username, password })
            .pipe(map(user => {
                // store user details and basic auth credentials in local storage to keep user logged in between page refreshes
                user.authdata = window.btoa(username + ':' + password);
                localStorage.setItem('currentUser', JSON.stringify(user));
                localStorage.setItem('role', role);
                this.currentUserSubject.next(user);
                this.isProfessorSubject.next(role === 'professor');
                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        localStorage.removeItem('role');
        this.currentUserSubject.next(null);
        this.isProfessorSubject.next(null);
    }
}
