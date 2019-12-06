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
    post._id = null;
    this.http.post('http://localhost:3000/api/posts',post).subscribe((data: any)=> {
      if(data) {
        post._id= data.id;
        this.posts.push(post);
        this._posts$.next(this.posts);
      }
    });

  }

  getPosts() {
      this.http.get('http://localhost:3000/api/posts').subscribe((data: any)=> {
      this.posts = data.posts;
        this._posts$.next(this.posts);
     });

  }

  deletePost(postId:string) {
    this.http.delete('http://localhost:3000/api/posts/'+postId).subscribe((data)=> {
      if(data) {
        var index = this.posts.findIndex((element: any) => {
          console.log('element..',element);
          return element._id=== postId;
        });
        console.log('index for deleting..',index);
        this.posts.splice(index,1);
        this._posts$.next(this.posts);
      }
    });
  }
}

