import {Component, Inject, OnInit} from '@angular/core';
import {CompanyService} from "../../../services/company/company.service";
import {Company} from '../../../domain/Company';
import {MAT_DIALOG_DATA} from '@angular/material';
import {DialogData} from '../../../domain/DialogData';

@Component({
  selector: 'app-companyfilterdialog',
  templateUrl: './companyfilterdialog.component.html',
  styleUrls: ['./companyfilterdialog.component.scss']
})
export class CompanyFilterDialogComponent implements OnInit {

  companyList: Company[];
  private companyFilter: string[] = [];

  constructor(private companyService: CompanyService, @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit() {
    this.companyService.getAllCompanies().subscribe((response) => {
      // @ts-ignore
      this.companyList = response;
    });
  }

  public onChangeEvent(companyName: string) {
    this.companyFilter.push(companyName);
    this.data.companies = this.companyFilter;
  }

}
