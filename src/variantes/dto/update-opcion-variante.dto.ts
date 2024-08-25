import { PartialType } from '@nestjs/mapped-types';
import { CreateOpcionVarianteDto } from './create-opcion-variante.dto';

export class UpdateOpcionVarianteDto extends PartialType(CreateOpcionVarianteDto) {}
