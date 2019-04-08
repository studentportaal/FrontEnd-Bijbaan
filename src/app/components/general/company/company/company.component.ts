import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import {Company} from '../../../../models/Company';
import {CompanyService} from '../../../../services/company/company.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {
  private company: Company;

  constructor(private route: ActivatedRoute, private companyService: CompanyService) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.getCompany(id);
  }

  getCompany(id: string) {
    this.companyService.getCompany(id).subscribe((company) => this.company = company);
  }

}
