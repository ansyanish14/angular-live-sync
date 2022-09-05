import { HttpClient } from '@angular/common/http'; 
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AppSettingsService {

   constructor(private http: HttpClient) {
        
    }
}