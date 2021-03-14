import { ViewChild } from '@angular/core';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UserServiceService } from '../service/user-service.service';
import { Post } from './postModel'
import { ViewEncapsulation } from '@angular/core';
import { ConfirmServiceService } from '../shared/confirm-service.service';



@Component({
  selector: 'app-posts-component',
  templateUrl: './posts-component.component.html',
  styleUrls: ['./posts-component.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class PostsComponentComponent implements OnInit {
  displayedColumns: string[] = ['userId', 'id', 'title', 'Actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;

  PostDataSource: any = [];
  PostModel: Post;
  editFlag: boolean = false;
  editValues: boolean = false;
  PostData: any[];
  constructor(private service: UserServiceService,
    private confirmService:ConfirmServiceService) { }

  ngOnInit(): void {
    this.PostModel = new Post;
    this.PostDataSource = new MatTableDataSource();
    this.PostDataSource.sort = this.sort;
    this.PostDataSource.paginator = this.paginator;
    this.getPostDetails();
  }


  // User API call
  getPostDetails() {
    this.service.getPostDetails().subscribe(data => {
      if (data) {
        this.PostData = data;
        this.PostDataSource.data = this.PostData;
        this.PostDataSource.sort = this.sort;
        this.PostDataSource.paginator = this.paginator;
      }
    })
  }

  // For new user creations submit method
  postCreationModal(PostModel) {
    if (this.editValues === true) {
      this.PostData.forEach(element => {
        if (element.id === PostModel.id) {
          element = PostModel
        }
      });
    }
    else {
      this.PostData.push(PostModel);
      const filtrvalue = this.PostData.filter((plan: any) => plan);
      this.PostData = filtrvalue;
      this.PostDataSource.data = this.PostData;
    }
    this.editValues = false;
   

  }
  //  For Form closing
  closeForm(form: any) {
    this.PostModel = new Post;
  }

  //  Create user button flags
  createPost() {
    this.editFlag = false;
    this.editValues = false;
    this.PostModel = new Post;

  }
  // To view the selected user data
  viewData(row) {
    this.PostModel = new Post;
    this.editFlag = true;
    this.editValues = false;
    const filtrvalue = this.PostData.filter((plan: any) => plan.id === row.id);
    this.PostModel = filtrvalue[0];
    this.PostDataSource.data = this.PostData;
  }
  // Edit the selected user details
  EditData(row) {
    this.PostModel = new Post;
    this.editFlag = false;
    this.editValues = true;
    const filtrvalue = this.PostData.filter((plan: any) => plan.id === row.id);
    this.PostModel = filtrvalue[0];
    this.PostDataSource.data = this.PostData;
  }

  // Delete the selected user data and make API call with method DELETE 

  Delete(row: any) {
  let that =this
    this.confirmService.confirm('Are you sure?',  function () {
      const obj = { id: row.id }
      const filtrvalue = that.PostData.filter((plan: any) => plan.id !== row.id);
      that.PostData = filtrvalue;
      that.PostDataSource.data = that.PostData;
      that.service.deletePost(obj.id).subscribe(data => {
      })
     }, function () {
  }); 
  }

   // Quik search
  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter() {
    this.PostDataSource.filter = this.searchKey.trim().toLowerCase();
  }
}

