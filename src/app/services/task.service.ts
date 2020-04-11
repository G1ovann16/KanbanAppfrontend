import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private URL = 'http://localhost:3000/task';
  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get<Task>('http://localhost:3000/task');
  }

    // POST
  setTask(body: any){
    return this.http.post<Task>('http://localhost:3000/task', body);
  }
  // DELETE
    delete(id: number){
      return this.http.delete(`http://localhost:3000/task/${id}`);
    }


}