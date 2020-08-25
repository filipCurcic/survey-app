import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit {
  constructor() {}

  @Input() message: string;

  @Output() closeAlert = new EventEmitter<void>();

  ngOnInit(): void {}

  onClose(): void {
    this.closeAlert.emit();
  }
}
