import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-editannonce',
  templateUrl: './editannonce.component.html',
  styleUrls: ['./editannonce.component.scss']
})
export class EditannonceComponent implements OnInit {
  etatdefault="on";
  constructor() { }

  ngOnInit() {
  }
  onSubmit(form:NgForm){
    console.log(form.value);

  }

}
