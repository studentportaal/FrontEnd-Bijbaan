import {Component, OnInit, ViewChild} from '@angular/core';
import {JobOffer} from '../../../domain/JobOffer';
import {Company} from '../../../domain/Company';
import {Router} from '@angular/router';
import {JobofferService} from '../../../services/joboffer/joboffer.service';
import {MatDialog, PageEvent, MatSort} from '@angular/material';
import {AuthenticationService} from '../../../services/authentication/authentication.service';
import {CompanyService} from '../../../services/company/company.service';
import {MatTableDataSource} from '@angular/material';
import {SkillService} from "../../../services/skill/skill.service";
import {Skill} from "../../../domain/Skill";

@Component({
  selector: 'app-jobofferlist',
  templateUrl: './jobofferlist.component.html',
  styleUrls: ['./jobofferlist.component.scss']
})
export class JobofferlistComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;

  jobOffers: JobOffer[] = [];
  companies: Company[] = [];
  skills: Skill[] = [];
  length: number;
  pageSize: number;
  pageIndex: number;
  pageEvent: PageEvent;
  dataSource = new MatTableDataSource(this.jobOffers);
  isOwnJobOffers = false;
  accordianStates: boolean[] = [false, false, false];

  searchCompanies: string[] = [];
  searchSkills: string[] = [];
  searchQuery = '';
  getDataTimeout: any;

  constructor(private jobOfferService: JobofferService,
              private dialog: MatDialog,
              private authenticationService: AuthenticationService,
              private companyService: CompanyService,
              private skillService: SkillService,
              private router: Router) {
  }

  ngOnInit() {
    this.pageSize = 25;
    this.getServerData(null);
    this.getCompanies();
    this.getSkills();
  }

  public getCompanies() {
    this.companyService.getAllCompanies().subscribe((response) => {
      // @ts-ignore
      this.companies = response;
    });
  }

  public getServerData(event?: PageEvent) {
    this.jobOfferService.getJobOfferCount(this.searchCompanies, true, this.searchSkills, this.searchQuery).subscribe((response) => {
      this.length = +response;
      if (event) {
        this.pageSize = event.pageSize;
        this.pageIndex = event.pageIndex;
      }
      this.jobOfferService.getAllJobOffers((Math.imul(this.pageSize, this.pageIndex)), this.pageSize, this.searchCompanies, true, this.searchSkills, this.searchQuery).subscribe(
        reply => {
          this.jobOffers = reply;
          this.dataSource = new MatTableDataSource(this.jobOffers);
          this.dataSource.sort = this.sort;
        }
      );
    });
    return event;
  }

  public getJobOffer(joboffer: string) {
    const url: string = '/joboffers/details/' + joboffer;
    this.router.navigateByUrl(url);
  }

  getCompanyName(id: any) {
    for (const comp of this.companies) {
      if (comp.uuid === id) {
        return comp.name;
      }
    }
  }

  isWithinOneDay(topofday) {
    const date = new Date(topofday).getTime();
    const OneDay = new Date().getTime() - (1 * 24 * 60 * 60 * 1000);
    if (date > OneDay) {
      return true;
    }
    return false;
  }

  getSkills() {
    this.skillService.get().subscribe((skills) => {
      this.skills = skills;
    });
  }

  skillChange(event: any) {
    clearTimeout(this.getDataTimeout);

    if (event.source.checked) {
      this.searchSkills.push(event.source.value);
    } else {
      this.searchSkills.splice(this.searchSkills.indexOf(event.source.value), 1);
    }

    this.getDataTimeout = setTimeout(() => {
      this.getServerData(undefined);
    }, 1500);
  }

  companyChange(event: any) {
    clearTimeout(this.getDataTimeout);

    if (event.source.checked) {
      this.searchCompanies.push(event.source.value);
    } else {
      this.searchCompanies.splice(this.searchCompanies.indexOf(event.source.value), 1);
    }

    this.getDataTimeout = setTimeout(() => {
      this.getServerData(undefined);
    }, 1500);
  }

  setAccordian(index: number) {
    this.accordianStates[index] = !this.accordianStates[index];
  }

  findCompanyInList(id: string): Company {
    return this.companies.find( x => x.uuid === id);
  }

  getJobOfferDetails(id: string) {
    const url = `/joboffers/details/${id}`;
    this.router.navigateByUrl(url);
  }
}
