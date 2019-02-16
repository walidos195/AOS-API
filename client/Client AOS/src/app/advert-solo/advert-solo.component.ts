import { Component, OnInit } from '@angular/core';
import { AdvertService } from '../services/advert.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, interval } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { PostService } from '../services/post.service';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-advert-solo',
  templateUrl: './advert-solo.component.html',
  styleUrls: ['./advert-solo.component.scss']
})
export class AdvertSoloComponent implements OnInit {
  adverts:any[];
  advertSub:Subscription;
  postsub:Subscription;
  isAuth:boolean;
  isPost:boolean=false;
  public isCollapsed = false;
  constructor(private userService:UserService, private postService:PostService,private advertService:AdvertService,private authService:AuthService,private http:HttpClient, private route: ActivatedRoute,private router: Router) { }
  
  ngOnInit() {
    this.authService.authSubject.subscribe((r)=>{this.isAuth=r;});
    this.authService.emitAuthSubject();
    const od=this.route.snapshot.params['id'];
    const ad=this.advertService.getAdverts().find(b=>b.id===+od);
      
        if(ad!==undefined){
          this.adverts=[ad];
        }
        else{
          this.router.navigate(['/annonces']);
        }
      
    if(this.isAuth){
      this.postService.isPost(this.userService.getUsername(),od).subscribe((r)=>{
        this.isPost=r[1];
   
       });
    
    this.advertService.emitAnnonceSubject();
    const counter = interval(1000);
    this.postsub= counter.subscribe(  
      () => {
        this.postService.isPost(this.userService.getUsername(),od).subscribe((r)=>{
          this.isPost=r[1];
     
         });
    }
  );}




  }
  postuler(){
    if(this.isAuth){

    const od=this.route.snapshot.params['id'];
      this.postService.Post(this.userService.getUsername(),od).subscribe();
    }


  }

ngOnDestroy(): void {
  //Called once, before the instance is destroyed.
  //Add 'implements OnDestroy' to the class.
  if(this.postsub)
  this.postsub.unsubscribe();
}
 /* ngOnInit() {
    const id=this.route.snapshot.params['id'];
    this.advertService.getAdvert(3);
    console.log(this.advertService.get());
    /*
    this.name=this.advertService.getAdvert(+id).title;
    this.description=this.advertService.getAdvert(+id).description;
    this.status=this.advertService.getAdvert(+id).etat;
}*/

}
