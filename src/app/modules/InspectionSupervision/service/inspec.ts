import { Provide } from '@midwayjs/decorator';
import { BaseService, CoolCommException } from '@cool-midway/core';
import { InjectEntityModel } from '@midwayjs/orm';
import { Not, Repository, In } from 'typeorm';
import { InspectEntity } from '../entity/inspect';
import { BaseSysAddressAreaEntity } from './../../base/entity/sys/address_area';
import * as _ from 'lodash';
import {
  createQueryBuilder,
  where,
  pagination,
  orderBy,
  getManyAndCount,
  leftJoinAndSelect,
} from './../../../comm/util.orm';
import { composePipe } from './../../../comm/util.operation';
/**
 * 检查列表
 */
@Provide()
export class InspecService extends BaseService {
  @InjectEntityModel(InspectEntity)
  inspectEntity: Repository<InspectEntity>;

  @InjectEntityModel(BaseSysAddressAreaEntity)
  baseSysAddressAreaEntity: Repository<BaseSysAddressAreaEntity>;

  async page(query) {
    const res = await composePipe(
      createQueryBuilder<InspectEntity>('cateringCompany'),
      where('cateringCompany.delFlag is :delFlag', { delFlag: false }),
      where('cateringCompany.storeName LIKE :keyWord', {
        keyWord: query.keyWord ? `%${query.keyWord}%` : null,
      }),
      pagination(query.page, query.size),
      leftJoinAndSelect('cateringCompany.area', 'area'),
      orderBy(`cateringCompany.${query.order}`, query.sort?.toUpperCase()),
      getManyAndCount
    )(this.inspectEntity);

    return {
      list: res[0],
      pagination: {
        page: query.page,
        size: query.size,
        total: res[1],
      },
    };
  }

  public async add(params) {
    return await this.inspectEntity.save(params);
  }

  public async update(params) {
    return await this.inspectEntity.save(params);
  }

  async delete(ids) {
    await this.inspectEntity
      .createQueryBuilder()
      .update()
      .set({ delFlag: true })
      .where({ id: In(ids) })
      .execute();
  }
}
