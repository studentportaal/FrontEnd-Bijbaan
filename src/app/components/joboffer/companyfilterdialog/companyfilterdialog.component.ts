import {Component, Inject, OnInit} from '@angular/core';
import {CompanyService} from "../../../services/company/company.service";
import {Company} from '../../../domain/Company';
import {MAT_DIALOG_DATA} from '@angular/material';
import {FormArray, FormGroup} from '@angular/forms';
import {DialogData} from '../../../domain/DialogData';

@Component({
  selector: 'app-companyfilterdialog',
  templateUrl: './companyfilterdialog.component.html',
  styleUrls: ['./companyfilterdialog.component.scss']
})
export class CompanyfilterdialogComponent implements OnInit {

  private companyList: Company[];
  private companyFilter: string[] = new Array();

  form = new FormGroup({
    companies: new FormArray([])
  });

  constructor(private companyService: CompanyService, @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit() {
    this.companyService.getAllCompanies().subscribe((response) => {
      this.companyList = response;
    });
  }

  public onChangeEvent(companyName: string) {
    this.companyFilter.push(companyName);
    this.data.companies = this.companyFilter;
  }

}
