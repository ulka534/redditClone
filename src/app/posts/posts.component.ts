import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  posts: any;
  allPosts: any;
  spinner: any;

  constructor(public router: Router) { }

  ngOnInit(): void {
    this.spinner = document.getElementById("spinner");
    this.spinner.removeAttribute('hidden');

    var ref = this;
    const request = new Request('http://www.reddit.com/.json');
    console.log(request)
    fetch(request)
      .then(response => response.json())
      .then((success) => {
        ref.posts = success.data.children;
        console.log(ref.posts)
        ref.spinner.setAttribute('hidden', '');
      })
      .catch(error => {
        console.log(error)
      });
  }

  viewArticle(data: any) {
    console.log(data)
    sessionStorage.setItem('articleLink', data.permalink);
    this.router.navigate(['article'])
  }

}
