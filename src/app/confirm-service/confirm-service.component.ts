import { Component, OnInit } from '@angular/core';
import { ConfirmServiceService } from '../shared/confirm-service.service';

@Component({
  selector: 'app-confirm-service',
  templateUrl: './confirm-service.component.html',
  styleUrls: ['./confirm-service.component.css']
})
export class ConfirmServiceComponent implements OnInit {
  message: any;
  constructor(private confirmService:ConfirmServiceService) { }

  ngOnInit(): void {
    // getMessage call from  confirm-service
    this.confirmService.getMessage().subscribe(message=>{
      this.message=message;
      console.log('message',this.message)
    })
  }

}
