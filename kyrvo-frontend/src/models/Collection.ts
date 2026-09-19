export interface Collection {
  Id: string;
  Name: string;
  Description?: string | null;
  AddToMenu?: number;
  JsonSchema: string;
  UiSchema?: string | null;
  Data?: string | null;
  CreatedOn?: number;
  UpdatedOn?: number;
}
