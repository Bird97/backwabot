export interface IServiceAndProdutsFilteredResponseDto {
  id: string;
  created_at: Date;
  updated_at: Date | null;
  deleted_at: Date | null;
  number_payments: number;
  request_status: string;
  last_modified_by_id: string;
  start_date: Date;
  end_date: Date;
  user: {
    id: string;
    name: string;
    national_id: string;
  } | null;
  service: {
    id: string;
    name: string;
    price: number;
  } | null;
}
