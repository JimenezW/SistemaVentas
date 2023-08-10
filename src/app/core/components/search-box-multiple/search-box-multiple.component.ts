import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IconModule } from '@visurel/iconify-angular';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { scaleInAnimation } from 'src/@vex/animations/scale-in.animation';
import { SearchOptions } from '../../interfaces/search-options.interfaces';
import { IconsService } from '@shared/services/icons.service';

@Component({
  selector: 'vex-search-box-multiple',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, IconModule, MatMenuModule, MatTooltipModule],
  templateUrl: './search-box-multiple.component.html',
  styleUrls: ['./search-box-multiple.component.scss'],
  animations: [scaleInAnimation]
})
export class SearchBoxMultipleComponent implements OnInit {

  @Input() searchOptions = [];
  @Input() currentValue: string = '';
  @Output() search = new EventEmitter<unknown>();

  labelSelection: SearchOptions = {
    label: "",
    value: 0,
    validation: "",
    validation_desc: "",
    icon: ''
  };

  form: FormGroup;


  constructor(
    private _fb: FormBuilder,
    public iconService: IconsService) {
    this.form = _fb.group({
      searchValue: [""],
      searchData: [""]
    });
  }

  ngOnInit(): void {
    this.changeSelection(this.searchOptions[0]);

    this.form.controls['searchData'].valueChanges.subscribe((e) => {
      if (e.trim() == '') {
        this.submit();
      }
    });
  }

  changeSelection(option: SearchOptions) {
    this.labelSelection = option;

    this.form.controls['searchValue'].setValue(option.value);
    this.labelSelection.validation_desc = option.validation_desc ? option.validation_desc : '';

    let mim_length = option.mim_leng ? option.mim_leng : 1;

    this.setSearchStringValidation(option.validation, mim_length);

  }

  setSearchStringValidation(validation: [], mimLength: number) {
    let searchData = this.form.get('searchData');
    let setValidation: [];

    searchData.setValidators(Validators.required);
    searchData.setValidators(Validators.minLength(mimLength));
    //setValidation.push(Validators.minLength(2));

    validation.forEach((e) => {
      searchData.setValidators(e);
    });


  }

  submit() {
    let data = this.form.getRawValue();

    this.search.emit(data);

  }

  reset() {
    this.form.controls['searchData'].setValue("");
    this.submit();
  }

}
