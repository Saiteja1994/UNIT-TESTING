import { Component, OnInit } from '@angular/core';
import { StudentServiceService } from '../student-service.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
num1:number = 0;
num2:number = 2;
value:any;
studentRes:any;
CountNumber = 0;
private Name : any;
course = "angular";
type= "number";
isReadOnly = false;
redColor = 'font-red';
blueCOlor = 'font-blue';
number1=20;
pageHeader : string = "Student Info";
columspan  =2;
arialabel ="NewAriaLabel";
label : string = "SAI TEJA";
studentName : string = " ";
num =25;
selectNum = 1;
size = 2000000;
  constructor(public studentService : StudentServiceService) { }
  sum = 0;
  result:any;
  ngOnInit(): void {
  }
colorNames =  ['Black','White','Blue','Green'];
Colorlist = [
  {name : 'Black',id:1},
  {name : 'White',id:2},
  {name : 'Blue',id:3},
  {name : 'Green',id:4},
]
  setName() {
    this.studentName = "SAI TEJA";
  }

  button1Click() {
    this.label = "SAI TEJA CHEDE";
  }

  button2Click() {
    this.label = "label value change on button 2";
  }

  onChangeEvent() {
    this.label = "onchange input label";
  }

  onChangeLabelEvent(event : any) {
      this.label = event.target.value;
  }

  calculate(num1:number,num2:number) :any {
    this.sum = num1 + num2;
  }

  private add(num1:number,num2:number) :any {
    this.sum = num1 + num2;
  }

 private showName() {
  this.Name = "SAI TEJA";
 }


  saveData() {
    let info = {
      sumVal : this.calculate(2,4),
      name : "sum of Integer"
    };
    this.studentService.saveStudentInfo(info).subscribe((res: any) => {
      this.result = res;
    })
  }

  studentResult() {
    if( this.calculate(10,20) >=40) {
      return "Pass";
    } else {
      return "Fail";
    }
}


studentSchoolResult() {
  if(this.calculate(10,20) >=40) {
    this.studentRes = "Pass";
    return this.studentRes ;
  } else {
    this.studentRes = "Fail";
    return this.studentRes ;
  }
}
incrementNumber() {
  this.CountNumber = this.CountNumber+1;
}
decrementNumber() {
  this.CountNumber = this.CountNumber-1;
}

}
