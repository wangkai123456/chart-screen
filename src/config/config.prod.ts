import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export type DefaultConfig = PowerPartial<EggAppConfig>;

export default (appInfo: EggAppInfo) => {
  const config = {} as DefaultConfig;
  config.orm = {
    type: 'mysql',
    host: process.env.MYSQL_HOST || '175.24.206.201',
    port: parseInt(process.env.MYSQL_PORT || '3306'),
    username: process.env.USER_NAME || 'wangkai',
    password: process.env.SQL_PASSWORD || 'yntest',
    database: process.env.DATABASE || 'yn_test',
    // 自动建表 注意：线上部署的时候不要使用，有可能导致数据丢失
    synchronize: false,
    // 打印日志
    logging: false,
    // 字符集
    charset: 'utf8mb4',
    // 驱动
    driver: require('mysql2'),
    // 设置时区
    timezone: '+8:00',
  };

  config.logger = {
    coreLogger: {
      consoleLevel: 'ERROR',
    },
  };

  // cool配置
  config.cool = {
    // 是否初始化模块数据库
    initDB: false,
  };

  return config;
};
