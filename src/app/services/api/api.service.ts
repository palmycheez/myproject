import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from './config';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  baseUrl: string;

  constructor(private http: HttpClient, public config: ConfigService) {
    this.baseUrl = this.config.mode == 'PRODUCTION' ? 'https://webapi.icc.co.th' : 'https://webapidev.icc.co.th';

    console.log('Mode =>', this.baseUrl);
  }

  login(username, password) {
    // http://webapi.icc.co.th:7011/authen/token
    const url = `https://webapi.icc.co.th:7014/authen/token`;
    const body = {
      username: username,
      password: password,
    };

    return this.http.post(url, body).toPromise();
  }

  verifyToken(token) {
    //http: webapi.icc.co.th:7011/authen/verify
    const url = 'https://webapi.icc.co.th:7014/authen/verify';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    });

    const option = {
      headers,
    };
    return this.http.post(url, {}, option).toPromise();
  }

  checkAutorization(emp_id) {
    const url = `${this.baseUrl}:7009/hisher/segment/check-authorization/${emp_id}`;
    return this.http.get(url).toPromise();
  }

  updateStatus(body) {
    const url = `${this.baseUrl}:7009/hisher/segment/update-status`;
    const header = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.post(url, body, header).toPromise();
  }

  viewAllMember(segmentCode) {
    const url = `${this.baseUrl}:7009/hisher/segment/get/member-detail/${segmentCode}`;
    return this.http.get(url).toPromise();
  }

  viewLineMember(segmentCode) {
    const url = `${this.baseUrl}:7009/hisher/segment/get/member-line-detail/${segmentCode}`;
    return this.http.get(url).toPromise();
  }

  viewAppMember(segmentCode) {
    const url = `${this.baseUrl}:7009/hisher/segment/get/member-app-detail/${segmentCode}`;
    return this.http.get(url).toPromise();
  }

  searchMember(param) {
    const url = `${this.baseUrl}:7005/hisher/hisherapp2/admin/member/search?member_id=${param.member_id}`;
    return this.http.get(url).toPromise();
  }

  runDataSegment(body) {
    const url = `${this.baseUrl}:7009/hisher/segment/run/data-segment`;
    const header = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.post(url, body, header).toPromise();
  }

  updateDetail(body) {
    const url = `${this.baseUrl}:7009/hisher/segment/update/segment-detail`;
    const header = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.put(url, body, header).toPromise();
  }

  getDetail(segmentCode) {
    const url = `${this.baseUrl}:7009/hisher/segment/get/segment-detail/${segmentCode}`;
    return this.http.get(url).toPromise();
  }

  deleteGroup(body) {
    const url = `${this.baseUrl}:7009/hisher/segment/delete`;
    const header = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.post(url, body, header);
  }

  getShipTo() {
    const url = `${this.baseUrl}:7009/hisher/segment/get/ship-to`;
    return this.http.get(url).toPromise();
  }

  getCusGroups() {
    // CUST GROUP is Store
    const url = `${this.baseUrl}:7009/hisher/segment/get/all-cust-group`;
    return this.http.get(url).toPromise();
  }

  getAllBrands() {
    const url = `${this.baseUrl}:7009/hisher/segment/get/all-brands`;
    return this.http.get(url).toPromise();
  }

  getAllGroup() {
    const url = `${this.baseUrl}:7009/hisher/segment/get/all-group`;
    return this.http.get(url).toPromise();
  }

  getGender() {
    const url = `${this.baseUrl}:7009/hisher/segment/get/gender`;
    return this.http.get(url).toPromise();
  }

  getStatus() {
    const url = `${this.baseUrl}:7009/hisher/segment/get/status`;
    return this.http.get(url).toPromise();
  }

  insertAge(body) {
    const url = `${this.baseUrl}:7009/hisher/segment/age`;
    const header = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.post(url, body, header).toPromise();
  }

  getProvince() {
    const url = `${this.baseUrl}:7009/hisher/segment/get/province`;

    return this.http.get(url).toPromise();
  }

  insertSegment(body) {
    const url = `${this.baseUrl}:7009/hisher/segment/`;
    const header = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.post(url, body, header).toPromise();
  }

  checkSegmentGroup(param) {
    const url = `${this.baseUrl}:7009/hisher/segment/check-segmentCode?segmentCode=${param.segmentCode}`;
    return this.http.get(url).toPromise();
  }
}
