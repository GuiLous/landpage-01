import { baseApi } from './baseApi'

export const storeApi = {
  async listStore(token: string, options?: RequestInit) {
    return await baseApi.list({ endpoint: '/store/', token, options })
  },
  async listProducts(token: string, options?: RequestInit) {
    return await baseApi.list({ endpoint: '/store/products/', token, options })
  },
  async buyProduct(token: string, payload: any, options?: RequestInit) {
    return await baseApi.create({
      endpoint: '/store/products/',
      token,
      payload,
      options,
    })
  },
  async buyItem(token: string, item_id: number, options?: RequestInit) {
    return await baseApi.create({
      endpoint: `/store/items/${item_id}`,
      token,
      options,
    })
  },
  async buyBox(token: string, box_id: number, options?: RequestInit) {
    return await baseApi.create({
      endpoint: `/store/boxes/${box_id}`,
      token,
      options,
    })
  },
  async buyCollection(
    token: string,
    collection_id: number,
    options?: RequestInit
  ) {
    return await baseApi.create({
      endpoint: `/store/collections/${collection_id}`,
      token,
      options,
    })
  },
  async listInventory(token: string, options?: RequestInit) {
    return await baseApi.list({ endpoint: '/store/inventory/', token, options })
  },
  async updateInUse(
    token: string,
    item_id: number,
    payload: any,
    options?: RequestInit
  ) {
    return await baseApi.update({
      endpoint: `/store/inventory/${item_id}`,
      token,
      payload,
      options,
    })
  },
}
