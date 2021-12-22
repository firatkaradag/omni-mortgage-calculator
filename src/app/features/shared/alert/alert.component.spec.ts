import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertComponent } from './alert.component';

describe('AlertComponent', () => {
  let component: AlertComponent;
  let fixture: ComponentFixture<AlertComponent>;
  let alert = "Test Alert"

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it(`should render info '${alert}'`, () => {
    component.alert = alert
    component.type = 'info'
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('[name="alert-content"]')?.textContent).toEqual(alert);
    const alertInfo = compiled.querySelector('.alert-info') as HTMLElement;
    let styles = window.getComputedStyle(alertInfo);
    expect(styles.borderColor).toEqual('rgb(38, 154, 188)');
    expect(styles.backgroundColor).toEqual('rgb(215, 250, 255)');
  });

  it(`should render danger '${alert}'`, () => {
    component.alert = alert
    component.type = 'danger'
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('[name="alert-content"]')?.textContent).toEqual(alert);
    const alertInfo = compiled.querySelector('.alert-danger') as HTMLElement;
    let styles = window.getComputedStyle(alertInfo);
    expect(styles.borderColor).toEqual('rgb(211, 8, 12)')
    expect(styles.backgroundColor).toEqual('rgb(243, 233, 232)')
  });
});
