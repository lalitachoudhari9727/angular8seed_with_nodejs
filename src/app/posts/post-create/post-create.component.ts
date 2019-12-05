import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {PostService} from "../../../services/post.service";

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent implements OnInit {

  constructor(private postService:PostService) { }

  ngOnInit() {
  }
  onAddPost(form: NgForm) {
   if(form.invalid) {
     return;
    } else {
    this.postService.onCreatePost(form.value);
    form.resetForm();
   }
  }
}
