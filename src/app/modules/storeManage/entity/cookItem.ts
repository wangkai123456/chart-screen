import { EntityModel } from '@midwayjs/orm';
import { BaseEntity } from '@cool-midway/core';
import { Column, ManyToOne } from 'typeorm';
import { BaseSysAddressAreaEntity } from './../../base/entity/sys/address_area';

/**
 * 主厨团队
 */
@EntityModel('cook_item')
export class CookItemEntity extends BaseEntity {
  // 所属辖区
  @ManyToOne(
    () => BaseSysAddressAreaEntity,
    baseSysAddressAreaEntity => baseSysAddressAreaEntity.cookItems,
    { eager: true }
  )
  area: BaseSysAddressAreaEntity;

  @Column({ comment: '厨师姓名', nullable: true })
  cookName: string;

  @Column({ comment: '证件照', nullable: true })
  idPhoto: string;

  @Column({ comment: '身份证号', nullable: true })
  idCard: string;

  @Column({ comment: '是否办理家宴服务范围的营业执照', nullable: true })
  isPartyServiceRangeBusiness: boolean;

  @Column({ comment: '是否办理营业执照', nullable: true })
  isBusiness: boolean;

  // 0 未定级
  @Column({ comment: '技能等级', nullable: true })
  skillLv: number;

  @Column({ comment: '证书编号', nullable: true })
  certificateId: string;

  @Column({ comment: '健康证信息开始时间', nullable: true })
  healthyStartTime: string;

  @Column({ comment: '健康证信息结束时间', nullable: true })
  healthyEndTime: string;

  @Column({ comment: '是否接种新冠疫苗', nullable: true })
  isVaccines: boolean;

  @Column({ comment: '删除', default: false })
  delFlag: boolean;
}
