import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Board } from 'src/app/models/board.model';
import { Column } from 'src/app/models/column.model';
import {TaskService} from '../../services/task.service';
import { Task } from '../../models/task';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss']
})
export class MainViewComponent implements OnInit {
//#region  variables
taskList: Task;
//#endregion
  constructor(public taskService: TaskService) { }

  board: Board = new Board('Test Board', [
    new Column('Ideas', [
      'Angular project',
      'UX prototype',
      'CSS Styles'
    ]),
    new Column('Research', [
      'asdasdasd',
      'asdasdasd',
      'asdasdasd'
    ]),
    new Column('Todo', [
      'Get to work',
      'Pick up groceries',
      'Go home',
      'Fall asleep'
    ]),
    new Column('Done', [
      'Get up',
      'Brush teeth',
      'Take a shower',
      'Check e-mail',
      'Walk dog'
    ])
  ]);

  ngOnInit() {
    this.getAllTask();
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }
//#region methods GET PUSH DELETE
getAllTask(){
  this.taskService.getAll()
  // tslint:disable-next-line: no-shadowed-variable
  .subscribe(( task: Task) =>
      {
        this.taskList = task;
        console.log(this.taskList);
      },
      err => console.log(err)
              );
          }
          // taskform: NgForm
  addTask(){
    this.taskService.setTask('')  //taskform.value
    .subscribe(msn => this.getAllTask());
            }

  delTask(i: number){
    this.taskService.delete(i)
    .subscribe(msn => this.getAllTask());

  }

//#endregion


}
