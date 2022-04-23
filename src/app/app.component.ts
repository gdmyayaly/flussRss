import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(){

  }
  ngOnInit(): void {
    var toggle = document.getElementById('menu_arrow');
    var sidebar = document.getElementById('sidebar');
    const state = localStorage.getItem('state')
    toggle.addEventListener('click',()=>{
        sidebar.style.transition="all 250ms";
        sidebar.classList.toggle('sidein');
        toggle.classList.toggle('rotate');
        if(sidebar.classList.contains('sidein')){
            localStorage.setItem('state', 'in');
        }
        else{
            localStorage.setItem('state', 'out');
        }
    })
    
    if (state){
        console.log(state)
        if(state == 'out'){
            sidebar.classList.remove('sidein');
        }
        else{
            sidebar.style.transition="none";
            sidebar.classList.add('sidein');
            toggle.classList.add('rotate');
        }
    }
    
  }
}
