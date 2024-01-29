import { twMerge } from 'tailwind-merge'

import { StoreItem } from '@/functions'

import { ModalBuyItemInfosBuyButton } from './ModalBuyItemInfosBuyButton'
import { ModalBuyItemInfosDescription } from './ModalBuyItemInfosDescription'
import { ModalBuyItemInfosDiscount } from './ModalBuyItemInfosDiscount'
import { ModalBuyItemInfosInsufficientFound } from './ModalBuyItemInfosInsufficientFound'
import { ModalBuyItemInfosItemType } from './ModalBuyItemInfosItemType'
import { ModalBuyItemInfosName } from './ModalBuyItemInfosName'
import { ModalBuyItemInfosPrice } from './ModalBuyItemInfosPrice'

interface ModalBuyItemInfosProps {
  itemObject: StoreItem
  item: StoreItem
  handleCloseModal: () => void
  handleOpenModalConfirmation: (item: StoreItem) => void
}

export function ModalBuyItemInfos({
  itemObject,
  item,
  handleCloseModal,
  handleOpenModalConfirmation,
}: ModalBuyItemInfosProps) {
  const isBox = itemObject.object === 'box'
  const isCollection = itemObject.object === 'collection'

  return (
    <aside className="w-[374px] flex-col justify-between">
      <div className={twMerge('flex-initial flex-col gap-12', '3xl:gap-8')}>
        <ModalBuyItemInfosName
          isBox={isBox}
          isCollection={isCollection}
          name={itemObject?.name}
        />

        <div className={twMerge('flex-col gap-8', '3xl:gap-6')}>
          <div className={twMerge('flex-col gap-4', '3xl:gap-3.5')}>
            <ModalBuyItemInfosItemType
              item_type={item?.item_type}
              subtype={item?.subtype}
            />

            <p
              className={twMerge(
                'font-semibold text-white text-xl',
                '3xl:text-lg 3xl:leading-none',
                'leading-none'
              )}
            >
              {item?.name}
            </p>

            <ModalBuyItemInfosDiscount discount={itemObject.discount} />
          </div>

          <ModalBuyItemInfosDescription
            isBox={isBox}
            description={item?.description}
            release_date={item?.release_date}
            item_type={item.item_type}
            subtype={item.subtype}
          />
        </div>

        <ModalBuyItemInfosPrice
          discount={itemObject.discount}
          price={itemObject.price}
        />
      </div>

      <div className={twMerge('flex-col flex-initial gap-3', '3xl:gap-2.5')}>
        {!itemObject.is_purchased && (
          <ModalBuyItemInfosInsufficientFound price={itemObject.price} />
        )}

        <ModalBuyItemInfosBuyButton
          price={itemObject.price}
          purchased={itemObject.is_purchased}
          itemObject={itemObject}
          handleCloseModal={handleCloseModal}
          handleOpenModalConfirmation={handleOpenModalConfirmation}
        />
      </div>
    </aside>
  )
}
