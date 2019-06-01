import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import * as dropin from 'braintree-web-drop-in';
import {PaymentService} from "../../../../services/payment/payment.service";
import {Transaction} from "../../../../domain/Transaction";
import {JobofferService} from "../../../../services/joboffer/joboffer.service";
import {JobOffer} from "../../../../domain/JobOffer";
import {MatSnackBar} from "@angular/material";

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  constructor(public paymentService: PaymentService, public jobOfferService: JobofferService, public snackbar: MatSnackBar) { }

  @Input() jobOffer: JobOffer;
  @Output() paymentBoolean = new EventEmitter<boolean>();

  showDropinUI = true;
  dropinInstance: any;
  braintreeKey: any
  transaction: Transaction = new Transaction();

  ngOnInit() {
    this.paymentService.createToken().subscribe((response) => {
      this.braintreeKey = response;
      this.openPaymentWindow();
    });
  }

  public pay() {
    this.dropinInstance.requestPaymentMethod((err, payload) => {
      if (err) {
        return;
      }
      this.transaction.extractInfo(this.jobOffer);
      this.transaction.PaymentMethodNonce = payload.nonce;
      this.paymentService.pay(this.transaction).subscribe( response => {
        const snackbarRef = this.snackbar.open('Payment succeeded', 'dismiss', {
          duration: 1500
        });
      },
        (error: any) => {
        const snackbarRef = this.snackbar.open('Payment failed', 'dismiss', {duration: 1500});
        });
    });
  }

  public openPaymentWindow() {
    dropin.create({
      authorization: this.braintreeKey,
      container: '#dropin-container',
      paypal: {
        flow: 'checkout',
        amount: 10.00,
        currency: 'EUR'
      }
    }, (err, dropinInstance) => {
      if (err) {
        // do something with error
        return;
      }
      this.dropinInstance = dropinInstance;
    });
  }
  cancel() {
    this.paymentBoolean.emit(false);
  }
}
