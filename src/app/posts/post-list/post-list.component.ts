import { Component, OnInit } from '@angular/core';
import {PostService} from "../../../services/post.service";
import {Post} from "../../models/post";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
posts: Post[];
  constructor(private postService:PostService) { }

  ngOnInit() {
    this.postService.posts$.subscribe((posts:Post[]) => {
      this.posts = posts;
      console.log(posts);
    })
  }

}