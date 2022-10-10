import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed, async, waitForAsync } from '@angular/core/testing';
import { of } from 'rxjs';
import { AppRoutingModule } from '../app-routing.module';
import { StudentServiceService } from '../student-service.service';
import { DebugElement, Inject, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StudentComponent } from './student.component';
import { BrowserModule, By } from '@angular/platform-browser';
import { LowerCasePipe, UpperCasePipe } from '@angular/common';
import { FilepipePipe } from '../filepipe.pipe';

class MockStudentService extends StudentServiceService{
  public NewsaveMethod() {
    return true;
  }
}

fdescribe('StudentComponent', () => {
  let component: StudentComponent;
  let fixture: ComponentFixture<StudentComponent>;
  let service :  StudentServiceService;
  let h1 : HTMLElement;
  let deb : DebugElement;
  let upperpipe : UpperCasePipe;
  let lowerpipe : LowerCasePipe;
  let pipe : FilepipePipe;

  beforeEach(async(() => {
       TestBed.configureTestingModule({
      declarations: [ StudentComponent , FilepipePipe],
      providers : [StudentServiceService],
      imports : [AppRoutingModule, HttpClientModule, FormsModule, BrowserModule,
      ]
    })
    .compileComponents();
    TestBed.overrideComponent(
      StudentComponent,
      {set : {providers:[{provide:StudentServiceService,useClass:MockStudentService}]}}
    )
    upperpipe = new UpperCasePipe();
    lowerpipe = new LowerCasePipe();
    pipe = new FilepipePipe();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    h1 = fixture.nativeElement.querySelector('h1');
    deb = fixture.debugElement;
    service = TestBed.inject(StudentServiceService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

 
 
  it('spyon', ()=>{
    // spyon should mock the function 
    spyOn(component,'calculate'); // mock the calculate function
    component.saveData(); // we are calling this method
    // calling the saveData(), In that method calculate() is calling or not
    expect(component.calculate).toHaveBeenCalled();
  })

  it('spyon one', ()=>{
    spyOn(component,'calculate').and.returnValues(40,20); // craeting mock obj & return the dummy value
    let result =  component.studentResult();
    expect(result).toEqual("Pass")
  })

  it('spyon service', ()=>{
  let service = fixture.debugElement.injector.get(StudentServiceService); // inject the service 
  // mock the service
  spyOn(service,'saveStudentInfo').and.callFake(()=>{
    return of({
      "result1" : 200
    })
  }); 
  component.saveData(); // calling savedata & this method internally calls the saveStudentInfo
  expect(component.result).toEqual({"result1" : 200}); // api returning value to result varible 

  })

  it('chnage detection', ()=>{
    component.studentSchoolResult(); // calling the studentschoolresult()
    fixture.detectChanges();
    expect(h1.textContent).toBe(component.studentRes);
  })

  it('unit test on interpolation',()=>{
    // getting the HTML element in the test file
    const course : HTMLElement = fixture.nativeElement.querySelector("#course");
    // 
    expect(course.innerHTML).toEqual(component.course);
    component.course = "CSS";
    fixture.detectChanges();
    expect(course.innerHTML).toEqual(component.course);
})  

  it('Increase Number count click', ()=>{
    const h2 = deb.query(By.css('h2'));
    const btn = deb.query(By.css('#btnIncreaseNumber'));
    btn.triggerEventHandler('click',{}); // event name & event obj 
    fixture.detectChanges(); 
    expect(component.CountNumber).toEqual(parseInt(h2.nativeElement.innerText));
  })

  it('call private methods and variables', () =>{
    component["showName"](); // private method
    expect(component["Name"]).toEqual("SAI TEJA"); // private variable
    component["add"](10,20); // priavte method
    expect(component.sum).toEqual(30);
  })

  it('call private methods and variables using spyon', () =>{
    let spyName = spyOn<any>(component,"showName"); // spyon private method
    component["showName"](); // calling private method
    expect(spyName).toHaveBeenCalled(); // private method is called or not
    let spyAdd = spyOn<any>(component,"add"); 
    component["add"](10,20); // priavte method
    expect(spyAdd).toHaveBeenCalled();
  })

 it('interpolation for text box',()=>{
  const num :  HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#usenum');
  expect(num.type).toEqual(component.type);
  component.type="text";
  fixture.detectChanges();
  expect(num.type).toEqual(component.type); // interpolation
  expect(num.readOnly).toBeFalsy(); // property binding
 })

 it('ngClass test case for p tag',()=>{
    let element = fixture.debugElement.nativeElement.querySelector('#header');
    expect(element.getAttribute('class')).toContain('font-red');
 })

 it('ngClass test acse for header tags',()=>{
  let element = fixture.nativeElement.querySelector('#header1');
  // component.number1 = 5;
  // fixture.detectChanges();
  expect(element.getAttribute('class')).toContain('font-blue');
 })

 it('ngStyle test case for header tag',()=>{
    let element = fixture.nativeElement.querySelector('#header2');
    expect(element.getAttribute('style')).toContain('color: black')
 })

 it('colspan attribute binding unit test case',()=>{
      const ele  : HTMLTableElement = fixture.debugElement.nativeElement.querySelector('#colId');
      expect(ele.getAttribute('colspan')).toEqual(component.columspan.toString());
 })

 it('button attribute binding unit test case',()=>{
  const ele : HTMLTableElement = fixture.debugElement.nativeElement.querySelector('#buttonId');
  expect(ele.getAttribute('aria-label')).toEqual(component.arialabel);
})

it('event binding for button 1', ()=> {
  const ele :  HTMLButtonElement = fixture.debugElement.nativeElement.querySelector('#button1');
  expect(component.label).toEqual("SAI TEJA");
  ele.click();
  fixture.detectChanges();
  expect(component.label).toEqual("SAI TEJA CHEDE");
})

it('event binding for button 2', ()=> {
  const ele :  HTMLButtonElement = fixture.debugElement.nativeElement.querySelector('#button2');
  ele.click();
  fixture.detectChanges();
  expect(component.label).toEqual("label value change on button 2");
})

it('Event Binding for Text box',()=>{
  const element : HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#textbox1');
  element.dispatchEvent(new Event('input'));
  fixture.detectChanges();
  expect(component.label).toEqual('onchange input label');
})

it('Event Binding for Text box2',()=>{
  const ele : HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#textbox2');
  ele.value= "SAI";
  ele.dispatchEvent(new Event('input'));
  fixture.detectChanges();
  expect(component.label).toEqual("SAI");
})


it('Two Way DataBinding',async ()=>{
  component.studentName = "SAI TEJA UPDATED";
  fixture.detectChanges();

  await fixture.whenStable()
      const ele : HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#name');
      expect(ele.value).toEqual('SAI TEJA UPDATED');
    
})

it('content rendering', ()=>{
    const ele : HTMLDivElement = fixture.debugElement.nativeElement.querySelector('#div1');
    const ele1 : HTMLDivElement = fixture.debugElement.nativeElement.querySelector('#div2');
    const ele2 : HTMLHeadElement = fixture.debugElement.nativeElement.querySelector('#ng1');
    const ele3 : HTMLHeadElement = fixture.debugElement.nativeElement.querySelector('#ng2');
    expect(ele).not.toBeNull();
    expect(ele1).toBeNull();
    expect(ele2).not.toBeNull();
    expect(ele3).toBeNull();
})

it('ngSwitch ', ()=>{
  const ele : HTMLDivElement = fixture.debugElement.nativeElement.querySelector('#div5');  
  expect(ele.childElementCount).toEqual(1);
  expect(ele.children.length).toEqual(1);
  // expect(ele.children[0].innerHTML).toEqual("One Is Selected");
  
})

it('ngFor',()=>{
  const element = fixture.debugElement.queryAll(By.css('.ngFor1'));
  expect(element.length).toEqual(4);
  element.forEach((obj: DebugElement, index : number)=>{
    expect(obj.children[0].nativeElement.innerHTML.trim()).toEqual(component.colorNames[index]);
  });
})

it('ngFor 1',()=>{
  const element = fixture.debugElement.queryAll(By.css('.ngFor2'));
  expect(element.length).toEqual(4);
  element.forEach((obj:DebugElement,index:number)=>{
    expect(obj.children[0].nativeElement.innerHTML.trim()).toEqual(component.Colorlist[index].name +'--'+ component.Colorlist[index].id);
  })
});

it('ngFor 2',()=>{
  const element = fixture.debugElement.queryAll(By.css('.ngFor3'));
  expect(element.length).toEqual(4);
  element.forEach((obj:DebugElement,index:number)=>{
    const output = `${index}-${index === 0 ? true : false }-${element.length-1===index?true:false}-${index %2===0?true : false}-${index %2!==0?true:false}`
    expect(obj.children[0].nativeElement.innerHTML.trim()).toEqual(output);
  })
});

it('DI unit test case for TestBed get()',()=> {
    expect(service instanceof StudentServiceService).toBeTruthy();
});

it('DI unit test case with override()',()=> {
  let element = fixture.debugElement.injector.get(StudentServiceService);
  expect(element instanceof(MockStudentService)).toBeTruthy();
});

it('unit test case for pre define pipe upper & lower',()=>{
    expect(upperpipe.transform(component.course)).toEqual("ANGULAR");
    expect(lowerpipe.transform(component.course)).toEqual("angular");
});


});