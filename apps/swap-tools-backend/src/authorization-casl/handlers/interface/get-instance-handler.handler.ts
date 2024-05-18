

export interface IGetInstanceHandler<T = any> {
  entity: T
  by: keyof T
}
