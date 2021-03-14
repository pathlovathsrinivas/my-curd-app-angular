import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UserServiceService } from '../service/user-service.service';
import { ConfirmServiceService } from '../shared/confirm-service.service';
import { user } from './userModel'

export interface UserData {
  id: string;
  name: string;
  progress: string;
  color: string;
}

@Component({
  selector: 'app-user-component',
  templateUrl: './user-component.component.html',
  styleUrls: ['./user-component.component.css']
})
export class UserComponentComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'username', 'Actions'];


  userDataSource: any;
  userModel: user;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;

  editFlag: boolean = false;
  editValues: boolean = false;
  userData: any[];

  constructor(private service: UserServiceService, private confirmService: ConfirmServiceService) {

  }
  ngOnInit(): void {
    this.userModel = new user;
    this.userDataSource = new MatTableDataSource();
    this.userDataSource.sort = this.sort;
    this.userDataSource.paginator = this.paginator;
    this.getUserDetails();


  }

  // User API call
  getUserDetails() {
    this.service.getUserDetails().subscribe(data => {
      if (data) {
        this.userData = data;
        this.userDataSource.data = this.userData;
        this.userDataSource.sort = this.sort;
        this.userDataSource.paginator = this.paginator;
      }
    })
  }

  // For new user creations submit method
  userCreationModal(userModel) {
    if (this.editValues === true) {
      this.userData.forEach(element => {
        if (element.id === userModel.id) {
          element = userModel
        }
      });
    }
    else {
      this.userData.push(userModel);
      const filtrvalue = this.userData.filter((plan: any) => plan);
      this.userData = filtrvalue;
      this.userDataSource.data = this.userData;
    }
    this.editValues = false;
    // this.userModel=new user

  }
  //  For Form closing
  closeForm(form: any) {
    this.userModel = new user
  }

  //  Create user button flags
  createUser() {
    this.editFlag = false;
    this.editValues = false;
    this.userModel = new user

  }
  // To view the selected user data
  viewData(row) {
    this.userModel = new user
    this.editFlag = true;
    this.editValues = false;
    const filtrvalue = this.userData.filter((plan: any) => plan.id === row.id);
    this.userModel = filtrvalue[0]
    this.userDataSource.data = this.userData;
  }
  // Edit the selected user details
  EditData(row) {
    this.userModel = new user
    this.editFlag = false;
    this.editValues = true;
    const filtrvalue = this.userData.filter((plan: any) => plan.id === row.id);
    this.userModel = filtrvalue[0];
    this.userDataSource.data = this.userData;
  }

  // Delete the selected user data and make API call with method DELETE 

  Delete(row: any) {
    let that = this
    this.confirmService.confirm('Are you sure?', function () {
      const obj = { id: row.id }
      const filtrvalue = that.userData.filter((plan: any) => plan.id !== row.id);
      that.userData = filtrvalue;
      that.userDataSource.data = that.userData;
      that.service.deleteUser(obj.id).subscribe(data => {
      })
    }, function () {
    });
  }
  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter() {
    this.userDataSource.filter = this.searchKey.trim().toLowerCase();
  }
}







