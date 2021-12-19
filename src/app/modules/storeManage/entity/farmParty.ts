import { EntityModel } from '@midwayjs/orm';
import { BaseEntity } from '@cool-midway/core';
import { Column, ManyToOne } from 'typeorm';
import { LvEnum } from './../../../comm/enum';
import { BaseSysAddressAreaEntity } from './../../base/entity/sys/address_area';

/**
 * 农家宴
 */
@EntityModel('farm_party')
export class FarmPartyEntity extends BaseEntity {
  // 所属辖区
  @ManyToOne(
    () => BaseSysAddressAreaEntity,
    baseSysAddressAreaEntity => baseSysAddressAreaEntity.farmPartys,
    { eager: true }
  )
  area: BaseSysAddressAreaEntity;

  @Column({ comment: '名称', nullable: true })
  farmPartyName: string;

  @Column({ comment: '地址', nullable: true })
  address: string;

  @Column({ comment: '联系人', nullable: true })
  contacts: string;

  @Column({ comment: '联系电话', nullable: true })
  tel: number;

  @Column({ comment: '门头照片', nullable: true })
  sotreImage: string;

  // A 阳光厨房 B 放心厨房 C其他厨房
  @Column({
    type: 'enum',
    enum: LvEnum,
    comment: '类型',
    nullable: true,
  })
  kitchenType: LvEnum;

  @Column({
    type: 'enum',
    enum: LvEnum,
    comment: '放心厨房等级',
    nullable: true,
  })
  kitchen: LvEnum;

  @Column({ comment: '删除', default: false })
  delFlag: boolean;
}
