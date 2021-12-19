import { EntityModel } from '@midwayjs/orm';
import { BaseEntity } from '@cool-midway/core';
import { Column, ManyToOne, OneToMany } from 'typeorm';
import { OnOffEnum, LvEnum } from './../../../comm/enum';
import { BaseSysAddressAreaEntity } from './../../base/entity/sys/address_area';
import { InspectEntity } from './../../InspectionSupervision/entity/inspect';

/**
 * 餐饮单位
 */
@EntityModel('catering_company')
export class CateringCompanyEntity extends BaseEntity {
  // 地区
  @ManyToOne(
    () => BaseSysAddressAreaEntity,
    baseSysAddressAreaEntity => baseSysAddressAreaEntity.cateringCompanys,
    { eager: true }
  )
  area: BaseSysAddressAreaEntity;

  areaId: string;

  // 检查记录
  @OneToMany(() => InspectEntity, inspectEntity => inspectEntity.company)
  inspects: InspectEntity[];

  @Column({ comment: '经营类型', nullable: true })
  businessType: string;

  @Column({ comment: '门店名称', nullable: true })
  storeName: string;

  @Column({ comment: '单位名称', nullable: true })
  companyName: string;

  @Column({ comment: '许可证号', nullable: true })
  licenceNum: string;

  @Column({ comment: '许可证开始日期', nullable: true })
  validStartTime: string;

  @Column({ comment: '许可证结束', nullable: true })
  validEndTime: string;

  @Column({ comment: '统一社会信用代码', nullable: true })
  socialCreditCode: string;

  @Column({ comment: '门店地址', nullable: true })
  storeAddress: string;

  @Column({
    type: 'enum',
    enum: OnOffEnum,
    comment: '营业状态',
    nullable: true,
  })
  businessStatus: OnOffEnum;

  @Column({ comment: '法人', nullable: true })
  legalPerson: string;

  @Column({ comment: '联系电话', nullable: true })
  tel: string;

  @Column({ comment: '门头照片', nullable: true })
  sotreImage: string;

  @Column({
    type: 'enum',
    enum: LvEnum,
    comment: '量化等级',
    nullable: true,
  })
  quantizationLv: LvEnum;

  @Column({
    type: 'enum',
    enum: LvEnum,
    comment: '风险等级',
    nullable: true,
  })
  riskLv: LvEnum;

  @Column({ comment: '从业人员数量', nullable: true })
  personnelNum: number;

  @Column({ comment: '网络餐饮', nullable: true })
  isOnLine: boolean;

  @Column({ comment: '是否是阳光厨房', nullable: true })
  isSunshine: boolean;

  @Column({ comment: '删除', default: false })
  delFlag: boolean;
}
