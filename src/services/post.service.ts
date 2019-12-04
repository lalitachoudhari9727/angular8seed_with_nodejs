import { Injectable } from '@angular/core';
import {Post} from "../app/models/post";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PostService {
  posts: Post[] = [];
private _posts$ = new BehaviorSubject<Post[]>([]);
 public posts$ = this._posts$.asObservable();
  constructor() { }

  onCreatePost(post: Post) {
    this.posts.push(post);
    this._posts$.next(this.posts);
  }
}

