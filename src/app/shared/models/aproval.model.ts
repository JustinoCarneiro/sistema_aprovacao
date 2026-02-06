export interface IAproval {
    CR_RECNO?: string;    // Registro único no banco
    CR_FILIAL: string;   // Código da Filial
    CR_NUM: string;      // Número do Documento
    CR_TIPO: string;     // Tipo (PC, IP, SC, etc)
    CR_APROV: string;    // Código do Aprovador
    CR_TOTAL: number;    // Valor Total
    CR_EMISSAO: string;  // Data de Emissão
    CR_FORNECE?: string; // Nome/Código do Fornecedor
    CR_STATUS: string;   // Status (02=Pendente, 03=Aprovado)
    CR_OBS?: string;     // Observações
}