import { Provide } from '@midwayjs/decorator';
import { BaseService, CoolCommException } from '@cool-midway/core';
import { InjectEntityModel } from '@midwayjs/orm';
import { Not, Repository, In } from 'typeorm';
import { CateringCompanyEntity } from '../entity/cateringCompany';
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
 * 餐饮单位
 */
@Provide()
export class CateringCompanyService extends BaseService {
  @InjectEntityModel(CateringCompanyEntity)
  cateringCompanyEntity: Repository<CateringCompanyEntity>;

  @InjectEntityModel(BaseSysAddressAreaEntity)
  baseSysAddressAreaEntity: Repository<BaseSysAddressAreaEntity>;

  async page(query) {
    const res = await composePipe(
      createQueryBuilder<CateringCompanyEntity>('cateringCompany'),
      where('cateringCompany.delFlag is :delFlag', { delFlag: false }),
      where('cateringCompany.companyName LIKE :keyWord', {
        keyWord: query.keyWord ? `%${query.keyWord}%` : null,
      }),
      pagination(query.page, query.size),
      leftJoinAndSelect('cateringCompany.area', 'area'),
      orderBy(`cateringCompany.${query.order}`, query.sort?.toUpperCase()),
      getManyAndCount
    )(this.cateringCompanyEntity);

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
    await this.existsName(params);
    return await this.cateringCompanyEntity.save(params);
  }

  public async update(params) {
    await this.existsName(params);
    await this.cateringCompanyEntity.save(params);
  }

  public async delete(ids) {
    await this.cateringCompanyEntity
      .createQueryBuilder()
      .update()
      .set({ delFlag: true })
      .where({ id: In(ids) })
      .execute();
  }

  private async existsName(params) {
    const exists = await this.cateringCompanyEntity.findOne({
      companyName: params.companyName,
      delFlag: false,
      id: Not(params.id),
    });
    if (!_.isEmpty(exists)) {
      throw new CoolCommException('单位已存在~');
    }
  }
}
