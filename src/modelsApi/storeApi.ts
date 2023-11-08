import { baseApi } from './baseApi'

export const storeApi = {
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
