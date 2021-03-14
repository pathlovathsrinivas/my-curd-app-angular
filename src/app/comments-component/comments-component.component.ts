import { ViewChild } from '@angular/core';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UserServiceService } from '../service/user-service.service';
import { PageEvent } from '@angular/material/paginator';
import { Comments } from './commentModel'
import { ConfirmServiceService } from '../shared/confirm-service.service';
@Component({
  selector: 'app-comments-component',
  templateUrl: './comments-component.component.html',
  styleUrls: ['./comments-component.component.css']
})
export class CommentsComponentComponent implements OnInit {

  displayedColumns: string[] = ['postId', 'id', 'name', 'Actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;

  commentDataSource: any;
  CommentsModel: Comments;
  editFlag: boolean = false;
  editValues: boolean = false;
  commentData: any[];
  constructor(private service: UserServiceService, private confirmService: ConfirmServiceService) { }

  ngOnInit(): void {
    this.CommentsModel = new Comments;
    this.commentDataSource = new MatTableDataSource();
    this.commentDataSource.sort = this.sort;
    this.commentDataSource.paginator = this.paginator;
    this.getCommentDetails();

  }


  // User API call
  getCommentDetails() {
    this.service.getCommentDetails().subscribe(data => {
      if (data) {
        this.commentData = data;
        this.commentDataSource.data = this.commentData;
        this.commentDataSource.sort = this.sort;
        this.commentDataSource.paginator = this.paginator;
      }
    })
  }

  // For new user creations submit method
  commentCreationModal(CommentsModel) {
    if (this.editValues === true) {
      this.commentData.forEach(element => {
        if (element.id === CommentsModel.id) {
          element = CommentsModel
        }
      });
    }
    else {
      this.commentData.push(CommentsModel);
      const filtrvalue = this.commentData.filter((plan: any) => plan);
      this.commentData = filtrvalue;
      this.commentDataSource.data = this.commentData;
    }
    this.editValues = false;
    // this.userModel=new user

  }
  //  For Form closing
  closeForm(form: any) {
    this.CommentsModel = new Comments;
  }

  //  Create user button flags
  createPost() {
    this.editFlag = false;
    this.editValues = false;
    this.CommentsModel = new Comments;

  }
  // To view the selected user data
  viewData(row) {
    this.CommentsModel = new Comments;
    this.editFlag = true;
    this.editValues = false;
    const filtrvalue = this.commentData.filter((plan: any) => plan.id === row.id);
    this.CommentsModel = filtrvalue[0]
    this.commentDataSource.data = this.commentData;
  }
  // Edit the selected user details
  EditData(row) {
    this.CommentsModel = new Comments;
    this.editFlag = false;
    this.editValues = true;
    const filtrvalue = this.commentData.filter((plan: any) => plan.id === row.id);
    this.CommentsModel = filtrvalue[0]
    this.commentDataSource.data = this.commentData;
  }

  // Delete the selected user data and make API call with method DELETE 

  Delete(row: any) {


    let that = this
    this.confirmService.confirm('Are you sure?', function () {
      const obj = { id: row.id }
      const filtrvalue = that.commentData.filter((plan: any) => plan.id !== row.id);
      that.commentData = filtrvalue;
      that.commentDataSource.data = that.commentData;
      that.service.deleteComment(obj.id).subscribe(data => {
      })
    }, function () {
    });
  }

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter() {
    this.commentDataSource.filter = this.searchKey.trim().toLowerCase();
  }
}
