import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SyncuserComponent } from './syncuser.component';

describe('SyncuserComponent', () => {
  let component: SyncuserComponent;
  let fixture: ComponentFixture<SyncuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SyncuserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SyncuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
