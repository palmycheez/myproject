import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'app/services/api/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(config: NgbModalConfig, private modalService: NgbModal, private router: Router, private api: ApiService) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  async ngOnInit() {}

  createPage() {
    this.router.navigate([`/create`]);
  }

  open(content: any) {
    this.modalService.open(content, { centered: true, size: 'sm' });
  }
}
