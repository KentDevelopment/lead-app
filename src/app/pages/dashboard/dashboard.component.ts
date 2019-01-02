import { Location } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
// import { Observable } from 'rxjs';
// import { map, filter, take } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  // message: Observable<any>;

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    private location: Location
  ) {
    // console.log('ACTIVATEDROUTE', activatedRoute)
    // console.log('THIS.ROUTER.ROUTERSTATE', this.router.routerState)
    // this.message = this.activatedRoute.data.pipe(map(d => {
    //   console.log('D', d)
    //   return d.title
    // }))
    //     this.message = this.router.events.pipe(
    //   filter(event => event instanceof ActivationEnd),
    //   take(1)
    // )
    // activatedRoute.url.subscribe(() => {
    //   this.messageTest = activatedRoute.snapshot.data.title // any time url changes, this callback is fired
    // });
  }

  ngOnInit() {
    // this.message = this.activatedRoute.data.pipe(map(d => {
    //   console.log('D', d)
    //   return d.title
    // }))
    // this.title = this.activatedRoute.data.pipe(map(d => d.title))
    // this.paramsSub = this.activatedRoute.params.subscribe(params => this.id = parseInt(params['id'], 10));
  }

  goBack() {
    this.location.back()
  }
}
