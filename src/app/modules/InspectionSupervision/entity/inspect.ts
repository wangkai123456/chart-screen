import { EntityModel } from '@midwayjs/orm';
import { BaseEntity } from '@cool-midway/core';
import { Column, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { LvEnum } from './../../../comm/enum';
import { CateringCompanyEntity } from './../../storeManage/entity/cateringCompany';
import { InspectStandingBookEntity } from './inspectStandingBook';
/**
 * 检查监督
 */
@EntityModel('inspect')
export class InspectEntity extends BaseEntity {
  // 单位名称
  @ManyToOne(
    () => CateringCompanyEntity,
    cateringCompanyEntity => cateringCompanyEntity.companyName,
    { eager: true }
  )
  company: CateringCompanyEntity;

  @Column({ type: 'enum', enum: LvEnum, comment: '检查结果', nullable: true })
  inspectResult: LvEnum;

  @Column({ comment: '检查时间', nullable: true })
  inspectTime: string;

  @Column({ comment: '删除', default: false })
  delFlag: boolean;

  @OneToOne(
    () => InspectStandingBookEntity,
    inspectStandingBook => inspectStandingBook.inspect
  )
  @JoinColumn()
  inspectStandingBook: InspectStandingBookEntity;
}
