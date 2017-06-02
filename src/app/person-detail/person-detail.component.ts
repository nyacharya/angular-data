import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Person } from '../person'
import { Router, ActivatedRoute } from '@angular/router';
import { PeopleService } from '../people.service';


@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.component.html',
  styleUrls: ['./person-detail.component.scss']
})

export class PersonDetailsComponent implements OnInit, OnDestroy {

  constructor(private peopleService: PeopleService, private route: ActivatedRoute,
              private router: Router){}

  sub:any;
  // @Input() person :Person;
  person: Person;
  ngOnInit(){
    this.sub=this.route.params.subscribe(params=>{
      let id = Number.parseInt(params['id']);
      this.person = this.peopleService.get(id);
    });
  }

  gotoPeopleList(){
    let link=['/persons'];
    this.router.navigate(link);
  }
  ngOnDestroy(){
    this.sub.unsubscribe();
  }  

  savePersonDetails(){
    // alert(`saved!!! ${JSON.stringify(this.person)}`);
    this.peopleService.save(this.person);
  }

}
