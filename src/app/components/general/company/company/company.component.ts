import {Component, Input, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Company} from '../../../../domain/Company';
import {CompanyService} from '../../../../services/company/company.service';
import {ReviewService} from "../../../../services/review/review.service";
import {Review} from "../../../../domain/Review";

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {
  company: Company;
  @Input() companyId: string;

  constructor(private route: ActivatedRoute,
              private companyService: CompanyService) { }

  ngOnInit() {
    if (this.companyId) {
      this.getCompany(this.companyId);
    } else {
      const id: string = this.route.snapshot.paramMap.get('id');
      this.getCompany(id);
    }
  }

  getCompany(id: string) {
    this.companyService.getCompany(id).subscribe((company) => this.company = company);
  }

}
