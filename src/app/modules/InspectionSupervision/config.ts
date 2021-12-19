import { Application } from 'egg';
import { ModuleConfig } from '@cool-midway/core';

/**
 * 模块的配置
 */
export default (app: Application) => {
  return {
    // 模块名称
    name: '餐饮模块',
    // 模块描述
    description: '餐饮公司信息、餐饮相关统计',
  } as ModuleConfig;
};
