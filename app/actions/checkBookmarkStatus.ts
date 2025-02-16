'use server'
import connectDB from "@/config/database"
import User from "@/models/User"
import { getSessionUser } from "@/utils/getSessionUser"
import { Types } from "mongoose"
import { revalidatePath } from "next/cache"

async function checkBookmarkStatus(propertyId: Types.ObjectId) {
  const sessionUser = await getSessionUser()

  if (!sessionUser || !sessionUser.userId) {
    throw new Error('User Id is required')
  }

  const { userId } = sessionUser

  const user = await User.findById(userId)

  if (!user) {
    throw new Error('unathorized')
  }

  let isBookmarked = user.bookmarks.includes(propertyId)

  return {isBookmarked}
}

export default checkBookmarkStatus