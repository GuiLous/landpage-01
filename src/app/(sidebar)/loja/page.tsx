import { twMerge } from 'tailwind-merge'

import { dynamicBlurDataUrl } from '@/utils'

import { StoreItem, getStore, getUserInventory } from '@/functions'

import {
  StoreListItems,
  StoreOpenBuyModalCheck,
  StoreRotationTimer,
} from '@/components/pages'

import { Carousel } from '@/components/shared'

export default async function page() {
  const inventory = await getUserInventory()
  const store = await getStore()

  const nextRotation = new Date(store.next_rotation).getTime()

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

  const placeholdersCarousel = await Promise.all(
    featured.map((item) => dynamicBlurDataUrl(item.featured_image))
  )

  const placeholdersProducts = await Promise.all(
    products.map((item) => dynamicBlurDataUrl(item.cover_image))
  )

  return (
    <main className="flex-col gap-20">
      <StoreOpenBuyModalCheck featured={featured} products={products} />

      <Carousel
        featured={featured}
        placeholdersCarousel={placeholdersCarousel}
      />

      <section
        className={twMerge(
          'flex-col gap-10 px-[7.5rem] pb-20',
          '3xl:px-[5.75rem]'
        )}
      >
        <StoreRotationTimer nextRotation={nextRotation} />

        <StoreListItems
          products={products}
          placeholdersProducts={placeholdersProducts}
        />
      </section>
    </main>
  )
}
