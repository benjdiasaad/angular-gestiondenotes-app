import { Component, ViewChild } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  constructor(private observer: BreakpointObserver) {}

  ngAfterViewInit() {
      this.observer
      // observe when the max-width is equal 800 than hide the menu
      .observe(['(max-width: 800px)'])
      .pipe(delay(1))
      .subscribe((res) => {
        if (res.matches) {
          //hide the menu 'over' = hide
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          //show the menu 'side' = show
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });
  }


  

}