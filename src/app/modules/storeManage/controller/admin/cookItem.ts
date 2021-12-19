import { Provide } from '@midwayjs/decorator';
import { CoolController, BaseController } from '@cool-midway/core';
import { CookItemEntity } from '../../entity/cookItem';
import { CookItemService } from '../../service/cookItem';

/**
 * 主厨团队
 */
@Provide()
@CoolController({
  api: ['add', 'delete', 'update', 'info', 'list', 'page'],
  entity: CookItemEntity,
  service: CookItemService,
})
export class CookItemController extends BaseController {}
