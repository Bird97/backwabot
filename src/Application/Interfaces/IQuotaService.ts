export interface IQuotaService {
  calcularCuota(document_number: number): Promise<any>;
}
