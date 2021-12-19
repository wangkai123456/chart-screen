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
 * 主厨团队
 */
@Provide()
export class CookItemService extends BaseService {
  @InjectEntityModel(CateringCompanyEntity)
  cateringCompanyEntity: Repository<CateringCompanyEntity>;

  @InjectEntityModel(BaseSysAddressAreaEntity)
  baseSysAddressAreaEntity: Repository<BaseSysAddressAreaEntity>;

  async page(query) {
    const res = await composePipe(
      createQueryBuilder<CateringCompanyEntity>('cateringCompany'),
      where('cateringCompany.delFlag is :delFlag', { delFlag: false }),
      where('cateringCompany.storeName LIKE :keyWord', {
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
    const exists = await this.cateringCompanyEntity.findOne({
      companyName: params.companyName,
    });
    if (!_.isEmpty(exists)) {
      throw new CoolCommException('单位已存在~');
    }

    const area = await this.baseSysAddressAreaEntity.findOne({
      id: params.area,
    });

    area.cateringCompanys
      ? area.cateringCompanys.push(params)
      : (area.cateringCompanys = [params]);

    return await this.cateringCompanyEntity.save(params);
  }

  public async update(params) {
    const exists = await this.cateringCompanyEntity.find({
      id: Not(params.id),
      companyName: params.companyName,
    });

    if (!_.isEmpty(exists)) {
      throw new CoolCommException('单位名称重复~');
    }

    await this.cateringCompanyEntity.save(params);

    await this.baseSysAddressAreaEntity.findOneOrFail({ id: params.areaId });
  }

  async delete(ids) {
    await this.cateringCompanyEntity
      .createQueryBuilder()
      .update()
      .set({ delFlag: true })
      .where({ id: In(ids) })
      .execute();
  }
}
