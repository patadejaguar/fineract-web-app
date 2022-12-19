/** Angular Imports */
import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

/** Dialog Components */
import { DeleteDialogComponent } from 'app/shared/delete-dialog/delete-dialog.component';
import { FormDialogComponent } from 'app/shared/form-dialog/form-dialog.component';

/** Custom Services */
import { DatepickerBase } from 'app/shared/form-dialog/formfield/model/datepicker-base';
import { FormfieldBase } from 'app/shared/form-dialog/formfield/model/formfield-base';
import { InputBase } from 'app/shared/form-dialog/formfield/model/input-base';
import { SettingsService } from 'app/settings/settings.service';
import { Dates } from 'app/core/utils/dates';

/**
 * Recurring Deposit Account Charges Step
 */
@Component({
  selector: 'mifosx-recurring-deposits-account-charges-step',
  templateUrl: './recurring-deposits-account-charges-step.component.html',
  styleUrls: ['./recurring-deposits-account-charges-step.component.scss']
})
export class RecurringDepositsAccountChargesStepComponent implements OnInit, OnChanges {

  @Input() recurringDepositsAccountTemplate: any;
  @Input() recurringDepositsAccountProductTemplate: any;
  @Input() currencyCode: FormControl;
  @Input() recurringDepositAccountFormValid: boolean;

  /** Charges Data */
  chargeData: any;
  /** Charges Data Source */
  chargesDataSource: {}[] = [];
  /** Charges table columns */
  displayedColumns: string[] = ['name', 'chargeCalculationType', 'amount', 'chargeTimeType', 'date', 'repaymentsEvery', 'action'];
  /** Component is pristine if there has been no changes by user interaction */
  pristine = true;
  /** For Edit Recurring Deposits Account Form */
  isChargesPatched = false;

  constructor(public dialog: MatDialog,
    private dateUtils: Dates,
    private settingsService: SettingsService, ) {
  }

  ngOnInit() {
    this.currencyCode.valueChanges.subscribe(() => {
      if (!this.isChargesPatched && this.recurringDepositsAccountTemplate.charges) {
        this.chargesDataSource = this.recurringDepositsAccountTemplate.charges.map((charge: any) => ({ ...charge, id: charge.chargeId })) || [];
        this.isChargesPatched = true;
      } else {
        this.chargesDataSource = [];
      }
    });
  }

  ngOnChanges() {
    if (this.recurringDepositsAccountProductTemplate) {
      this.chargeData = this.recurringDepositsAccountProductTemplate.chargeOptions;
    }
  }


  /**
   * Add a charge
   */
  addCharge(charge: any) {
    this.chargesDataSource = this.chargesDataSource.concat([charge.value]);
    charge.value = '';
    this.pristine = false;
  }

  /**
   * Edits the Charge Amount
   * @param {any} charge Charge
   */
  editChargeAmount(charge: any) {
    const formfields: FormfieldBase[] = [
      new InputBase({
        controlName: 'amount',
        label: 'modulo.labels.amount',
        value: charge.amount,
        type: 'number',
        required: false
      }),
    ];
    const data = {
      title: 'modulo.labels.editchargeamount',
      layout: { addButtonText: 'labels.butttons.Confirm' },
      formfields: formfields
    };
    const editNoteDialogRef = this.dialog.open(FormDialogComponent, { data });
    editNoteDialogRef.afterClosed().subscribe((response: any) => {
      if (response.data) {
        const newCharge = { ...charge, amount: response.data.value.amount };
        this.chargesDataSource.splice(this.chargesDataSource.indexOf(charge), 1, newCharge);
        this.chargesDataSource = this.chargesDataSource.concat([]);
      }
    });
    this.pristine = false;
  }

  /**
   * Edits the Charge Date
   * @param {any} charge Charge
   */
  editChargeDate(charge: any) {
    const formfields: FormfieldBase[] = [
      new DatepickerBase({
        controlName: 'date',
        label: 'modulo.labels.date',
        value: charge.dueDate || charge.feeOnMonthDay || '',
        type: 'datetime-local',
        required: false
      }),
    ];
    const data = {
      title: 'modulo.labels.editchargedate',
      layout: { addButtonText: 'labels.buttons.Confirm' },
      formfields: formfields
    };
    const editNoteDialogRef = this.dialog.open(FormDialogComponent, { data });
    editNoteDialogRef.afterClosed().subscribe((response: any) => {
      if (response.data) {
        let newCharge: any;
        const dateFormat = this.settingsService.dateFormat;
        const date = this.dateUtils.formatDate(response.data.value.date, dateFormat);
        switch (charge.chargeTimeType.value) {
          case 'Specified due date':
          case 'Weekly Fee':
            newCharge = { ...charge, dueDate: date };
            break;
          case 'Annual Fee':
            newCharge = { ...charge, feeOnMonthDay: date };
            break;
        }
        this.chargesDataSource.splice(this.chargesDataSource.indexOf(charge), 1, newCharge);
        this.chargesDataSource = this.chargesDataSource.concat([]);
      }
    });
    this.pristine = false;
  }

  /**
   * Edits the Charge Fee Interval
   * @param {any} charge Charge
   */
  editChargeFeeInterval(charge: any) {
    const formfields: FormfieldBase[] = [
      new InputBase({
        controlName: 'feeInterval',
        label: 'modulo.labels.feeinterval',
        value: charge.feeInterval,
        type: 'text',
        required: false
      }),
    ];
    const data = {
      title: 'modulo.labels.editchargefeeinterval',
      layout: { addButtonText: 'labels.buttons.Confirm' },
      formfields: formfields
    };
    const editNoteDialogRef = this.dialog.open(FormDialogComponent, { data });
    editNoteDialogRef.afterClosed().subscribe((response: any) => {
      if (response.data) {
        const newCharge = { ...charge, feeInterval: response.data.value.feeInterval };
        this.chargesDataSource.splice(this.chargesDataSource.indexOf(charge), 1, newCharge);
        this.chargesDataSource = this.chargesDataSource.concat([]);
      }
    });
    this.pristine = false;
  }

  /**
   * Delete a particular charge
   * @param charge Charge
   */
  deleteCharge(charge: any) {
    const deleteChargeDialogRef = this.dialog.open(DeleteDialogComponent, {
      data: { deleteContext: `charge ${charge.name}` }
    });
    deleteChargeDialogRef.afterClosed().subscribe((response: any) => {
      if (response.delete) {
        this.chargesDataSource.splice(this.chargesDataSource.indexOf(charge), 1);
        this.chargesDataSource = this.chargesDataSource.concat([]);
        this.pristine = false;
      }
    });
  }

  /**
   * Returns Recurring Deposits Account Charges Form
   */
  get recurringDepositAccountCharges() {
    return {
      charges: this.chargesDataSource
    };
  }

}
