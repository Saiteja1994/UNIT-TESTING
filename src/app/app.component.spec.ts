import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let appComp = new AppComponent();
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });


it("toBe() for String",()=>{
  expect(appComp.showMessage("Hello")).toBe("Hello");
});

xit("toBe() for number",()=>{
  expect(appComp.Addition(20,30)).toBe(49);
});

it("toBe() And toEqual()", () =>{
  var a = "Hello";
  var b = "Hello";
  var c = ['1'];
  var d = ['1'];
  expect(c).not.toBe(d);
  expect(c).toEqual(d);
});

it("toBe(true) And toBeTrue()", () =>{
  var a = "Hello";
  var b = true;
  var c = false;
  var ip = "Angular is Front End Framework";
  var pi= 3.1415926, e= 2.78;
  expect(a).toBe("Hello");
  expect(a).not.toBeTrue();
  expect(b).toBeTrue();
  expect(c).toBeFalse();
 
  expect(undefined).not.toBeTruthy();
  expect(true).toBeTruthy();
  expect(false).toBeFalsy();
  expect(undefined).toBeFalsy();
  expect(10).toBeGreaterThan(9);
  expect(10).toBeGreaterThanOrEqual(10);
  expect(10).toBeLessThan(20);
  expect(10).toBeLessThanOrEqual(10);
  expect(ip).toMatch(/is/);
  expect(pi).not.toBeCloseTo(e);
  expect(pi).toBeCloseTo(e,0);
});

});
