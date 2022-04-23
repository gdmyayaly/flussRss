import { Component, OnInit } from '@angular/core';
import { Rss } from '../model/rss';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public dataRss:Array<Rss>=[];
  public dataView:Array<Rss>=[];
  public lengthPaginationEnd=4;
  public lengthPaginationStart=0;

  constructor(private api:ApiService) { }

  ngOnInit(): void {
    this.api.getData().then(
      res=>{
        let temp=this.api.extractFeeds(res);
        for (let index = 0; index < temp.rss.channel.item.length; index++) {
          let data_temp={
            title:temp.rss.channel.item[index].title,
            description:temp.rss.channel.item[index].description,
            image:temp.rss.channel.item[index]["media:content"].url,
            link:temp.rss.channel.item[index].link
          };
          
         this.dataRss.push(data_temp);
        }
        this.loadData();
      },
      error=>{
        console.log(error);
      }
    )
  }
  loadData(){
    this.dataView=[];
    for (let index = this.lengthPaginationStart; index < this.lengthPaginationEnd; index++) {
      this.dataView.push(this.dataRss[index]);
    }
  }
  navigation(type:string){
    if (type=='next') {
      this.lengthPaginationStart=this.lengthPaginationStart+4;
      this.lengthPaginationEnd=this.lengthPaginationEnd+4;
      this.loadData();
      document.getElementById('back').classList.remove('btn_desabled');

    }
    else if(type=='back'){
      this.lengthPaginationStart=this.lengthPaginationStart-4;
      this.lengthPaginationEnd=this.lengthPaginationEnd-4;
      this.loadData();

    }
    if (this.lengthPaginationStart==0) {
      document.getElementById('back').classList.add('btn_desabled');
    }
    if (this.lengthPaginationEnd >= this.dataRss.length) {
      document.getElementById('next').classList.add('btn_desabled');
    }
    else{
      document.getElementById('next').classList.remove('btn_desabled');
    }
  }
  editTitle(data,index){
    // console.log(data);
    // console.log(index);
    console.log(
      document.getElementById(data+index).outerText
    );
    
  }
}
