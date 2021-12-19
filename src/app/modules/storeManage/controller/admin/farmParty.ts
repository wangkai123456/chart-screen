import { Provide } from '@midwayjs/decorator';
import { CoolController, BaseController } from '@cool-midway/core';
import { FarmPartyEntity } from '../../entity/farmParty';
import { FarmPartyService } from '../../service/farmParty';

/**
 * 农家宴
 */
@Provide()
@CoolController({
  api: ['add', 'delete', 'update', 'info', 'list', 'page'],
  entity: FarmPartyEntity,
  service: FarmPartyService,
})
export class FarmPartyController extends BaseController {}
