import { EntityModel } from '@midwayjs/orm';
import { BaseEntity } from '@cool-midway/core';
import { Column, OneToOne } from 'typeorm';
import { InspectEntity } from './inspect';

/**
 * 台账管理
 */
@EntityModel('inspect_Standing_book')
export class InspectStandingBookEntity extends BaseEntity {
  @Column({ comment: '人员晨检', nullable: true })
  personCheck: boolean;

  @Column({ comment: '进货检查', nullable: true })
  purchaseCheck: boolean;

  @Column({ comment: '清洁消毒', nullable: true })
  cleanCheck: boolean;

  @Column({ comment: '厨余垃圾', nullable: true })
  garbageCheck: boolean;

  @Column({ comment: '留样登记', nullable: true })
  sampleCheck: boolean;

  @Column({ comment: '农药残留', nullable: true })
  pesticidesCheck: boolean;

  @Column({ comment: '除虫灭害', nullable: true })
  pestControlCheck: boolean;

  @Column({ comment: '员工培训', nullable: true })
  trainCheck: boolean;

  @Column({ comment: '紫外线消毒', nullable: true })
  ultravioletRaysDisinfectCheck: boolean;

  @Column({ comment: '供货商监管', nullable: true })
  supplierCheck: boolean;

  @Column({ comment: '添加剂台账', nullable: true })
  additiveCheck: boolean;

  @OneToOne(() => InspectEntity, inspect => inspect.inspectStandingBook)
  inspect: InspectEntity;

  @Column({ comment: '删除', default: false })
  delFlag: boolean;
}
