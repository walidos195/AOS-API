import { Component, OnInit } from '@angular/core';
import { ApplicationService } from '../../services/application.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css']
})
export class ApplicationComponent implements OnInit {
  c: number = 1;
  co: number = 3;
  cmax;
  applications: any[];
  empty: boolean;
  applicationSub: any;
  id: any;

  constructor(private route: ActivatedRoute,private appservice: ApplicationService,private router:Router) { }
  ngOnInit() {
    this.sub();
  }


  private sub() {
    this.id=this.route.snapshot.params['id'];
    this.applicationSub = this.appservice.getApplications(this.id).subscribe((response: any[]) => {
      this.applications = response;
      this.cmax = response.length;
      if (this.applications.length == 0) {
        this.empty = true;
      }
    });
  }
  goUser(username){ const dist='/component/user/'+username;
  this.router.navigate([dist]);}
}
