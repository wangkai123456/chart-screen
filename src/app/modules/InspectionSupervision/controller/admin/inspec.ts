import { Provide } from '@midwayjs/decorator';
import { CoolController, BaseController } from '@cool-midway/core';
import { InspectEntity } from '../../entity/inspect';
import { InspecService } from '../../service/inspec';

/**
 * 农家宴
 */
@Provide()
@CoolController({
  api: ['add', 'delete', 'update', 'info', 'list', 'page'],
  entity: InspectEntity,
  service: InspecService,
})
export class InspecController extends BaseController {}
