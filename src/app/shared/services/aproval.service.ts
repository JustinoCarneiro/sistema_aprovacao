import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { IAproval } from '../models/aproval.model';

@Injectable({ providedIn: 'root' })
export class AprovalService {
  private mockData: IAproval[] = [
    { 
      CR_FILIAL: '01', CR_NUM: '000125', CR_FORNECE: 'TOTVS S.A', 
      CR_TOTAL: 1500.50, CR_EMISSAO: '2023-10-01', CR_STATUS: '02', 
      CR_TIPO: 'PC', CR_APROV: '001' 
    },
    { 
      CR_FILIAL: '01', CR_NUM: '000126', CR_FORNECE: 'Microsoft', 
      CR_TOTAL: 5000.00, CR_EMISSAO: '2023-10-02', CR_STATUS: '02', 
      CR_TIPO: 'PC', CR_APROV: '001' 
    }
  ];

  getAprovals(): Observable<IAproval[]> {
    return of(this.mockData).pipe(delay(500));
  }
}