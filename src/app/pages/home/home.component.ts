import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'app/services/api/api.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    config: NgbModalConfig,
    private modalService: NgbModal,
    private router: Router,
    private api: ApiService,
    private spinner: NgxSpinnerService
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  async ngOnInit() {
    this.spinner.show();
    setTimeout(() => {
      /** spinner ends after 1 seconds */
      this.spinner.hide();
    }, 900);
  }

  createPage() {
    this.router.navigate([`/create`]);
  }

  open(content: any) {
    this.modalService.open(content, { centered: true, size: 'sm' });
  }
}
