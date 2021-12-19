import { Column, OneToMany } from 'typeorm';
import { EntityModel } from '@midwayjs/orm';
import { BaseEntity } from '@cool-midway/core';
import { CateringCompanyEntity } from './../../../storeManage/entity/cateringCompany';
import { FarmPartyEntity } from './../../../storeManage/entity/farmParty';
import { CookItemEntity } from './../../../storeManage/entity/cookItem';

/**
 * 辖区
 */
@EntityModel('base_address_area')
export class BaseSysAddressAreaEntity extends BaseEntity {
  @Column({ comment: '地区名' })
  name: string;

  @OneToMany(
    () => CateringCompanyEntity,
    cateringCompanyEntity => cateringCompanyEntity.area
  )
  cateringCompanys: CateringCompanyEntity[];

  @OneToMany(() => FarmPartyEntity, farmPartyEntity => farmPartyEntity.area)
  farmPartys: FarmPartyEntity[];

  @OneToMany(() => CookItemEntity, cookItemEntity => cookItemEntity.area)
  cookItems: CookItemEntity[];
}
