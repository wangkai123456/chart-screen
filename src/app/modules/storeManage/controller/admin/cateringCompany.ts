import { Provide } from '@midwayjs/decorator';
import { CoolController, BaseController } from '@cool-midway/core';
import { CateringCompanyEntity } from '../../entity/cateringCompany';
import { CateringCompanyService } from '../../service/cateringCompany';

/**
 * 餐饮单位
 */
@Provide()
@CoolController({
  api: ['add', 'delete', 'update', 'info', 'list', 'page'],
  entity: CateringCompanyEntity,
  service: CateringCompanyService,
})
export class CateringCompanyController extends BaseController {}
