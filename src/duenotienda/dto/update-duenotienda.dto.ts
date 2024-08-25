import { PartialType } from '@nestjs/mapped-types';
import { CreateDuenoTiendaDto } from './create-duenotienda.dto';

export class UpdateDuenoTiendaDto extends PartialType(CreateDuenoTiendaDto) {}
