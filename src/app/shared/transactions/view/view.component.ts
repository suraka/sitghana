import { Component, OnInit } from '@angular/core';
import { TransactionService } from './../../../core/services';
import { Transaction } from './../../../core/models';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  transactions: Transaction[];
  editState = false;
  transactionToEdit: Transaction;

  constructor(private transactionServices: TransactionService) { }

  ngOnInit() {
    this.transactionServices.getTransactions().subscribe(transactions => {
      this.transactions = transactions;
    });
  }

  deleteTransaction(event, record) {
    const response = confirm('are you sure you want to delete?');
    if (response ) {
      this.transactionServices.deleteTransaction(record);
    }
    return;
  }

  editTransaction(event, record) {
    this.editState = !this.editState;
    this.transactionServices = record;
  }

  updateTransaction(record) {
    this.transactionServices.updateTransaction(record);
    this.transactionToEdit = null;
    this.editState = false;
  }


}
