'use server'

import { revalidatePath as nextRevalidatePath, revalidateTag } from 'next/cache'

type RevalidatePathType = {
  path: string
  type?: 'layout' | 'page'
}

export const revalidate = async (tag: string) => {
  revalidateTag(tag)
}

export const revalidatePath = async ({
  path,
  type = 'layout',
}: RevalidatePathType) => {
  nextRevalidatePath(path, type)
}
