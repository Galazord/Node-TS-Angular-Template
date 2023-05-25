import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogsAnalyzerComponent } from './logs-analyzer.component';

describe('LogsAnalyzerComponent', () => {
  let component: LogsAnalyzerComponent;
  let fixture: ComponentFixture<LogsAnalyzerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LogsAnalyzerComponent]
    });
    fixture = TestBed.createComponent(LogsAnalyzerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
