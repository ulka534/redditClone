import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  link: any;
  articles: any;

  data:any  = [];
  postName : any;
  postSubreddit: any;
  postAuthor: any;
  postNum_comments: any;

  spinner : any; 

  constructor() { }

  ngOnInit(): void {
    this.spinner = document.getElementById("spinner");
    this.spinner.removeAttribute('hidden');

    this.link = sessionStorage.getItem('articleLink');
    console.log(this.link)
    var url = "http://www.reddit.com/" + this.link + ".json";
    console.log(url)

    var ref = this;
    const request = new Request(url);
    console.log(request)
    fetch(request)
      .then(response => response.json())
      .then((success) => {
        ref.articles = success;
        for(var i in ref.articles){
          for(var j in ref.articles[i]["data"]["children"]) {
            ref.data.push(ref.articles[i]["data"]["children"][j]["data"]
            )
          }
        }
        console.log(ref.data)
        ref.postName = this.data[0]["title"]
        ref.postSubreddit = this.data[0]["subreddit"]
        ref.postAuthor = this.data[0]["author"]
        ref.postNum_comments = this.data.length;
        ref.spinner.setAttribute('hidden', '');
      })
      .catch(error => {
        console.log(error)
      });
  }

}
