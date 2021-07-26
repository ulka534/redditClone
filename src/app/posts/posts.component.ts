import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  posts: any;
  allPosts: any;

  constructor() { }

  ngOnInit(): void {
    var ref = this;
    const request = new Request('http://www.reddit.com/.json');
    console.log(request)
    fetch(request)
      .then(response => response.json())
      .then((success) => {
        ref.posts = success.data.children;
        console.log(ref.posts)
      })
      .catch(error => {
        console.log(error)
      });
  }

}
