export interface ServerActionStatus<ErrorBody = any> {
  success?: boolean;
  errors?: {
    networkMessage?: string;
    fieldMessage?: ErrorBody;
  };
  statusCode?: number;
}
