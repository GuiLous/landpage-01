import { StoreItem, getStore, getUserInventory } from '@/functions'

import { StoreListItems, StoreRotationTimer } from '@/components/pages'

import { Carousel } from '@/components/shared'

export default async function page() {
  const inventory = await getUserInventory()
  const store = await getStore()

  const nextRotation = new Date(store.next_rotation).getTime()

  // const getModalBuyItems = (item: StoreItem) => {
  //   const isBox = item?.object === 'box'
  //   const isCollection = item?.object === 'collection'

  //   let modalBuyItems: StoreItem[] = []

  //   modalBuyItems =
  //     (isBox || isCollection) && item?.items ? [...item.items] : []

  //   if (!isBox && !isCollection) {
  //     modalBuyItems = [item]
  //   }

  //   return modalBuyItems
  // }

  const updateItemsWithPurchaseFlag = ({
    isProducts = true,
    products = [],
    featured = [],
  }: {
    isProducts?: boolean
    products?: StoreItem[]
    featured?: StoreItem[]
  }) => {
    if (!inventory) {
      if (isProducts) return products
      return featured
    }

    const purchasedItemIds = inventory.items.map((item) => item.item_id)

    const purchasedBoxIds = inventory.boxes.map((item) => item.id)

    const idsToUpdate = {
      item: purchasedItemIds,
      box: purchasedBoxIds,
    }

    const updateItems = (items: StoreItem[]) =>
      items.map((item) => {
        if (item.object === 'collection') {
          const allItemsPurchased = item.items?.every((item) =>
            purchasedItemIds.includes(item.id)
          )
          return { ...item, is_purchased: allItemsPurchased }
        }
        return {
          ...item,
          is_purchased: idsToUpdate[item.object]?.includes(item.id),
        }
      })

    if (isProducts) return updateItems(products)

    return updateItems(featured)
  }

  const products = updateItemsWithPurchaseFlag({ products: store.products })

  const featured = updateItemsWithPurchaseFlag({
    featured: store.featured,
    isProducts: false,
  })

  return (
    <main className="flex-col gap-[7.5rem]">
      <Carousel featured={featured} />

      <section className="flex-col gap-10 px-[7.5rem] pb-20">
        <StoreRotationTimer nextRotation={nextRotation} />

        <StoreListItems products={products} />
      </section>
    </main>
  )
}
