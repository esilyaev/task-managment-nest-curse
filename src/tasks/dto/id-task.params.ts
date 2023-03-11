import { IsUUID } from 'class-validator';

export class IdTaskParams {
  @IsUUID()
  id: string;
}
