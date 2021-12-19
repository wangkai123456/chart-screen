import { Inject, Provide } from '@midwayjs/decorator';
import { BaseService, ICoolCache, CoolCommException } from '@cool-midway/core';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository, In } from 'typeorm';
import { BaseSysUserEntity } from '../../entity/sys/user';
import { BaseSysPermsService } from './perms';
import * as _ from 'lodash';
import { BaseSysUserRoleEntity } from '../../entity/sys/user_role';
import * as md5 from 'md5';
import { BaseSysDepartmentEntity } from '../../entity/sys/department';
import {
  createQueryBuilder,
  where,
  pagination,
  orderBy,
  getManyAndCount,
} from './../../../../comm/util.orm';
import { composePipe } from './../../../../comm/util.operation';
/**
 * 系统用户
 */
@Provide()
export class BaseSysUserService extends BaseService {
  @InjectEntityModel(BaseSysUserEntity)
  baseSysUserEntity: Repository<BaseSysUserEntity>;

  @InjectEntityModel(BaseSysUserRoleEntity)
  baseSysUserRoleEntity: Repository<BaseSysUserRoleEntity>;

  @InjectEntityModel(BaseSysDepartmentEntity)
  baseSysDepartmentEntity: Repository<BaseSysDepartmentEntity>;

  @Inject('cool:cache')
  coolCache: ICoolCache;

  @Inject()
  baseSysPermsService: BaseSysPermsService;
  async page(query) {
    const res = await composePipe(
      createQueryBuilder('user'),
      where('user.userName != :userName', {
        userName: 'admin',
      }),
      where('user.delFlag is :delFlag', { delFlag: false }),
      where('user.name LIKE :keyWord', {
        keyWord: query.keyWord ? `%${query.keyWord}%` : null,
      }),
      pagination(query.page, query.size),
      orderBy(query.order, query.sort?.toUpperCase()),
      getManyAndCount
    )(this.baseSysUserEntity);

    return {
      list: res[0],
      pagination: {
        page: query.page,
        size: query.size,
        total: res[1],
      },
    };
  }

  /**
   * 获得个人信息
   */
  async person() {
    const info = await this.baseSysUserEntity.findOne({
      id: this.ctx.admin?.userId,
    });
    delete info?.password;
    return info;
  }

  /**
   * 更新用户角色关系
   * @param user
   */
  async updateUserRole(user) {
    if (user.username === 'admin') {
      throw new CoolCommException('非法操作~');
    }
    await this.baseSysUserRoleEntity.delete({ userId: user.id });
    if (user.roleIdList) {
      for (const roleId of user.roleIdList) {
        await this.baseSysUserRoleEntity.save({ userId: user.id, roleId });
      }
    }
    await this.baseSysPermsService.refreshPerms(user.id);
  }

  async info(id) {
    const info = await this.baseSysUserEntity.findOne({ id });
    delete info.password;
    return info;
  }

  /**
   * 新增
   * @param param
   */
  async add(param) {
    const exists = await this.baseSysUserEntity.findOne({
      username: param.username,
    });
    if (!_.isEmpty(exists)) {
      throw new CoolCommException('手机号已经存在~');
    }
    param.password = md5(param.password);
    await this.baseSysUserEntity.save(param);
    await this.updateUserRole(param);
    return param.id;
  }

  /**
   * 修改个人信息
   * @param param
   */
  public async personUpdate(param) {
    param.id = this.ctx.admin.userId;
    if (!_.isEmpty(param.password)) {
      param.password = md5(param.password);
      const userInfo = await this.baseSysUserEntity.findOne({ id: param.id });
      if (!userInfo) {
        throw new CoolCommException('用户不存在');
      }
      param.passwordV = userInfo.passwordV + 1;
      await this.coolCache.set(
        `admin:passwordVersion:${param.id}`,
        param.passwordV
      );
    } else {
      delete param.password;
    }
    await this.baseSysUserEntity.save(param);
  }

  /**
   * 修改
   * @param param 数据
   */
  async update(param) {
    if (param.id && param.username === 'admin') {
      throw new CoolCommException('非法操作~');
    }
    if (!_.isEmpty(param.password)) {
      param.password = md5(param.password);
      const userInfo = await this.baseSysUserEntity.findOne({ id: param.id });
      if (!userInfo) {
        throw new CoolCommException('用户不存在');
      }
      param.passwordV = userInfo.passwordV + 1;
      await this.coolCache.set(
        `admin:passwordVersion:${param.id}`,
        param.passwordV
      );
    } else {
      delete param.password;
    }
    if (param.status === 0) {
      await this.forbidden(param.id);
    }
    await this.baseSysUserEntity.save(param);
  }

  /**
   * 禁用用户
   * @param userId
   */
  async forbidden(userId) {
    await this.coolCache.del(`admin:token:${userId}`);
  }

  async delete(ids) {
    await this.baseSysUserEntity
      .createQueryBuilder()
      .update()
      .set({ delFlag: true })
      .where({ id: In(ids) })
      .execute();
  }
}
