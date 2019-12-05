import { Injectable } from '@angular/core';
import {Post} from "../app/models/post";
import {BehaviorSubject} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PostService {
  posts: Post[] = [];
  private _posts$ = new BehaviorSubject<Post[]>([]);
  public posts$ = this._posts$.asObservable();
  constructor(private http:HttpClient) { }

  onCreatePost(post: Post) {
    console.log('post from frontend',post);

     this.http.post('http://localhost:3000/posts',post).subscribe((data)=> {
      if(data) {
        this.posts.push(post);
        this._posts$.next(this.posts);
      }
    });

  }

  getPosts() {
      this.http.get('http://localhost:3000/posts').subscribe((data: any)=> {
      this.posts = data.posts;
        this._posts$.next(this.posts);
     });

  }
}

