import {
  Brackets,
  ObjectLiteral,
  SelectQueryBuilder,
  Repository,
} from 'typeorm';
import { isVal } from './util.operation';
export const createQueryBuilder =
  <T>(alias: string) =>
  (orm: Repository<T>) =>
    orm.createQueryBuilder(alias);

export const where =
  <T>(
    where: Brackets | string | ObjectLiteral | ObjectLiteral[],
    parameters?: ObjectLiteral
  ) =>
  (queryBuilder: SelectQueryBuilder<T>) => {
    if (isVal(Object.values(parameters)[0])) {
      return queryBuilder.andWhere(where, parameters);
    }
    return queryBuilder;
  };

export const pagination =
  <T>(page: number, size: number) =>
  (queryBuilder: SelectQueryBuilder<T>) => {
    return queryBuilder.skip((page - 1) * size).take(size);
  };

export const orderBy =
  (order: string, sort?: 'ASC' | 'DESC') =>
  <T>(queryBuilder: SelectQueryBuilder<T>) => {
    if (!order) {
      return queryBuilder;
    }
    return queryBuilder.orderBy(order, sort);
  };

export const leftJoinAndSelect =
  (subQueryFactory: string, alias: string, condition?: string) =>
  <T>(queryBuilder: SelectQueryBuilder<T>) => {
    if (condition) {
      return queryBuilder.leftJoinAndSelect(subQueryFactory, alias, condition);
    }
    return queryBuilder.leftJoinAndSelect(subQueryFactory, alias);
  };

export const getManyAndCount = <T>(queryBuilder: SelectQueryBuilder<T>) =>
  queryBuilder.getManyAndCount();

export const getSql = <T>(queryBuilder: SelectQueryBuilder<T>) =>
  queryBuilder.getSql();
