import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BillModel} from '../models/bill.model';
import {map} from 'rxjs/operators';
import {BaseApi} from '../../../shared/core/base.api';

@Injectable()
export class BillService extends BaseApi {


  constructor(public http: HttpClient) {
    super(http);
  }

  // getBill(): Observable<BillModel> {
  //   return this.http.get('http://localhost:8085/api/bills').pipe(
  //     map((response: BillModel) => {
  //       console.log(response['_embedded']['bills']);
  //       return response['_embedded']['bills'];
  //     })
  //   );
  // }

  getBill(): Observable<BillModel> {
    return this.get('bills/1');
  }

  updateBill(bill: BillModel): Observable<BillModel> {
    return this.put('bills/1', bill);
  }

  getCurrency(): Observable<any> {
    return this.http.get('https://www.cbr-xml-daily.ru/daily_json.js').pipe(
      map((response: Response) => {
        return response;
      })
    );
  }

}
