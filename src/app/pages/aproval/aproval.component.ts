import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { 
  PoPageModule, 
  PoTableModule, 
  PoTableColumn, 
  PoTableAction,
  PoNotificationService,
  PoFieldModule,
  PoModalModule,
  PoModalComponent,
  PoModalAction,
  PoInfoModule
} from '@po-ui/ng-components';
import { AprovalService } from '../../shared/services/aproval.service';
import { IAproval } from '../../shared/models/aproval.model';

@Component({
  selector: 'app-aproval',
  standalone: true,
  imports: [
    CommonModule, 
    PoPageModule, 
    PoTableModule, 
    PoFieldModule, 
    PoModalModule, 
    PoInfoModule
  ],
  providers: [CurrencyPipe],
  templateUrl: './aproval.component.html'
})
export class AprovalComponent implements OnInit {
  
  @ViewChild('confirmModal', { static: true }) poModal!: PoModalComponent;

  // Variáveis de Estado usando a nomenclatura Protheus
  items: IAproval[] = [];          
  filteredItems: IAproval[] = [];  
  loading: boolean = true;         
  selectedRow?: IAproval;          

  // Ações do Modal
  readonly confirmAction: PoModalAction = {
    label: 'Confirmar Aprovação',
    action: () => this.processApproval(),
    danger: false
  };

  readonly closeAction: PoModalAction = {
    label: 'Cancelar',
    action: () => this.poModal.close()
  };

  // Ações da Tabela (Baseado em aproval-list.component.ts)
  readonly actions: Array<PoTableAction> = [
    { 
      label: 'Aprovar', 
      action: this.approve.bind(this), 
      icon: 'po-icon-ok',
      type: 'success' 
    },
    { 
      label: 'Rejeitar', 
      action: this.reject.bind(this), 
      icon: 'po-icon-close',
      type: 'danger' 
    }
  ];

  // Colunas da Tabela com campos técnicos CR_
  readonly columns: Array<PoTableColumn> = [
    { property: 'CR_NUM', label: 'Documento', width: '15%' },
    { property: 'CR_FORNECE', label: 'Fornecedor', width: '30%' },
    { property: 'CR_EMISSAO', label: 'Emissão', type: 'date', width: '15%' },
    { property: 'CR_TOTAL', label: 'Valor', type: 'currency', format: 'BRL', width: '20%' },
    { 
      property: 'CR_STATUS', 
      label: 'Status', 
      type: 'label', 
      width: '20%',
      labels: [
        { value: '02', color: 'color-08', label: 'Pendente' }, // Aguardando Liberação
        { value: '03', color: 'color-10', label: 'Aprovado' },  // Liberado
        { value: '06', color: 'color-07', label: 'Rejeitado' }  // Rejeitado
      ]
    }
  ];

  constructor(
    private aprovalService: AprovalService,
    private poNotification: PoNotificationService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.loading = true;
    this.aprovalService.getAprovals().subscribe({
      next: (data) => {
        this.items = data;
        this.filteredItems = [...data];
        this.loading = false;
      },
      error: () => {
        this.poNotification.error('Erro ao carregar aprovações.');
        this.loading = false;
      }
    });
  }

  filterAction(filter: string | null) {
    const search = filter || ''; 
    if (!search) {
      this.filteredItems = [...this.items];
    } else {
      const lowerFilter = search.toLowerCase();
      this.filteredItems = this.items.filter(item => 
        item.CR_FORNECE?.toLowerCase().includes(lowerFilter) ||
        item.CR_NUM.toLowerCase().includes(lowerFilter)
      );
    }
  }

  private approve(row: IAproval) {
    this.selectedRow = row;
    this.poModal.open();
  }

  private processApproval() {
    if (this.selectedRow) {
      // Sincronização de remoção usando CR_NUM como chave
      const numDoc = this.selectedRow.CR_NUM;
      
      this.poNotification.success(`Documento ${numDoc} aprovado com sucesso!`);
      
      this.items = this.items.filter(item => item.CR_NUM !== numDoc);
      this.filteredItems = this.filteredItems.filter(item => item.CR_NUM !== numDoc);
      
      this.poModal.close();
    }
  }

  private reject(row: IAproval) {
    this.poNotification.warning(`Documento ${row.CR_NUM} foi rejeitado.`);
    this.items = this.items.filter(item => item.CR_NUM !== row.CR_NUM);
    this.filteredItems = this.filteredItems.filter(item => item.CR_NUM !== row.CR_NUM);
  }
}