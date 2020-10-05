import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  Validators
  } from '@angular/forms';
import { ApiService } from 'app/services/api/api.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-create-segment',
  templateUrl: './create-segment.component.html',
  styleUrls: ['./create-segment.component.css'],
})
export class CreateSegmentComponent implements OnInit {
  segmentGroup: FormGroup;
  name: any;
  content = [{ key: '' }, { key: '' }];

  status: any;
  arrStatus = [];

  gender: any;
  arrGender = [];

  provinces: any;
  arrProvince = [];
  dropdownSettingsProvince = {};

  brands: any;
  arrBrand = [];
  dropdownSettingsBrand = {};

  custGroups: any;
  arrCustgroup = [];
  dropdownSettingsCustgroup = {};

  active = 1;

  constructor(private api: ApiService, private fb: FormBuilder, private spinner: NgxSpinnerService) {
    this.segmentGroup = this.fb.group({
      segmentCode: ['', Validators.required],
      segmentName: ['', Validators.required],
      genders: [this.arrGender],
      status: [this.arrStatus],
      ageBegin: [''],
      ageEnd: [''],
      provinces: [this.arrProvince],
      buyDay: [''],
      buyBegin: [''],
      buyEnd: [''],
      brands: [this.arrBrand],
      custGroups: [this.arrCustgroup],
      shipToes: this.fb.array([]),
      vip: [''],
      members: this.fb.array([]),
    });
  }

  async ngOnInit() {
    this.spinner.show();
    const getGender = await this.getGender();
    const getStatus = await this.getStatus();
    const getProvince = await this.getProvince();
    const getBrand = await this.getBrand();
    const getCustgroup = await this.getCustgroup();

    this.gender = getGender;
    this.status = getStatus;
    this.provinces = getProvince.map((item: any, index: any) => {
      return {
        id: index + 1,
        province_id: item.province_id,
        province_name: item.province_id + ' : ' + item.province,
      };
    });

    this.brands = getBrand.map((item: any, index: any) => {
      return {
        id: index + 1,
        brand: item.bus_code + item.dept_code + item.product_code + item.spd_code,
        brand_name: item.bus_code + item.dept_code + item.product_code + item.spd_code + ' : ' + item.spd_name,
      };
    });

    this.custGroups = getCustgroup.map((item: any, index: any) => {
      return {
        id: index + 1,
        cust_group_code: item.cust_group_code,
        cust_group_name: item.cust_group_code + ' : ' + item.cust_group_name,
      };
    });

    console.log('get custgroup ==> ', this.custGroups);

    this.dropdownSettingsProvince = {
      singleSelection: false,
      idField: 'province_id',
      textField: 'province_name',
      enableCheckAll: false,
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 20,
      allowSearchFilter: true,
    };

    this.dropdownSettingsBrand = {
      singleSelection: false,
      idField: 'brand',
      textField: 'brand_name',
      enableCheckAll: false,
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 20,
      allowSearchFilter: true,
    };

    this.dropdownSettingsCustgroup = {
      singleSelection: false,
      idField: 'cust_group_code',
      textField: 'cust_group_name',
      enableCheckAll: false,
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 20,
      allowSearchFilter: true,
    };

    setTimeout(() => {
      /** spinner ends after 1 seconds */
      this.spinner.hide();
    }, 1000);
  }

  onItemSelectProvince(item: any) {
    // console.log('select =>', item);
    this.arrProvince.push(item);
    // console.log('select province', this.arrProvince);
  }
  onDeSelectProvince(item: any) {
    // console.log('De select =>', item);
    this.arrProvince = this.arrProvince.filter((ele) => ele.province_id !== item.province_id);
    // console.log('De select Province', this.arrProvince);
    this.segmentGroup.value.provinces = this.arrProvince;
  }

  onItemSelectBrand(item: any) {
    this.arrBrand.push(item);
    // console.log('select brand', this.arrBrand);
  }
  onDeSelectBrand(item: any) {
    // console.log('De select =>', item);
    this.arrBrand = this.arrBrand.filter((ele) => ele.brand !== item.brand);
    // console.log('De select brand', this.arrBrand);
    this.segmentGroup.value.brands = this.arrBrand;
  }

  onItemSelectCustgroup(item: any) {
    // console.log('select =>', item);
    this.arrCustgroup.push(item);
    // console.log('select Custgroup', this.arrCustgroup);
  }
  onDeSelectCustgroup(item: any) {
    // console.log('De select =>', item);
    this.arrCustgroup = this.arrCustgroup.filter((ele) => ele.cust_group_code !== item.cust_group_code);
    // console.log('De select Custgroup', this.arrCustgroup);
    this.segmentGroup.value.custGroups = this.arrCustgroup;
  }

  async getGender() {
    let call: any;
    call = await this.api.getGender();
    if (!call) {
      return [];
    } else {
      // console.log('Call API Gender ==>', call.data.gender);
      return call.data.gender;
    }
  }
  async getStatus() {
    let call: any;
    call = await this.api.getStatus();
    if (!call) {
      return [];
    } else {
      // console.log('Call API Status ==>', call.data.status);
      return call.data.status;
    }
  }
  async getProvince() {
    let call: any;
    call = await this.api.getProvince();
    if (!call) {
      return [];
    }
    // console.log('Call API Province =>', call.data);

    return call.data;
  }

  async getBrand() {
    let call: any;
    call = await this.api.getAllBrands();
    if (!call) {
      return [];
    }
    // console.log('Call API Brand ==>', call.data);

    return call.data;
  }

  async getCustgroup() {
    let call: any;
    call = await this.api.getCusGroups();
    if (!call) {
      return [];
    }
    return call.data;
  }

  chkBoxGender(event: any, value: any) {
    console.log(event, value);
    if (event == true) {
      this.arrGender.push({
        gender: value,
      });
    } else {
      this.arrGender = this.arrGender.filter((ele) => ele.gender !== value);
    }
    this.segmentGroup.value.genders = this.arrGender;
    // console.log(this.arrGender);
  }
  chkBoxStatus(event: any, value: any) {
    if (event == true) {
      this.arrStatus.push({
        status: value,
      });
    } else {
      this.arrStatus = this.arrStatus.filter((ele) => ele.status !== value);
    }
    this.segmentGroup.value.status = this.arrStatus;
  }

  onSubmit() {
    console.log('test', this.segmentGroup.value);

    if (this.segmentGroup.valid) {
      console.log('Form Submitted!');
    }
  }
}
