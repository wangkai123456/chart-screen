import { EntityModel } from '@midwayjs/orm';
import { BaseEntity } from '@cool-midway/core';
import { Column } from 'typeorm';

/**
 * 系统用户
 */
@EntityModel('base_sys_user')
export class BaseSysUserEntity extends BaseEntity {
  @Column({ comment: '姓名', nullable: true })
  name: string;

  // @Index({ unique: true })
  @Column({ comment: '手机号', length: 11 })
  username: string;

  @Column({ comment: '密码', select: false })
  password: string;

  @Column({
    comment: '密码版本, 作用是改完密码，让原来的token失效',
    default: 1,
  })
  passwordV: number;

  @Column({ comment: '备注', nullable: true })
  remark: string;

  @Column({ comment: '状态 0:禁用 1：启用', default: 1, type: 'tinyint' })
  status: number;

  @Column({ comment: '删除', default: false })
  delFlag: boolean;
}
