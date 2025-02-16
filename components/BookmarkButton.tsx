'use client'
import bookmarkProperty from "@/app/actions/bookmarkProperty";
import checkBookmarkStatus from "@/app/actions/checkBookmarkStatus";
import { IProperty } from "@/models/Property";
import { error } from "console";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { FaBookmark } from "react-icons/fa";
import { toast } from "react-toastify";


type Props = {
  property: IProperty
}

function BookmarkButton({property}: Props) {
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const {data: session} = useSession()
  const userId = session?.user.id

  useEffect(() => {
    if (!userId) {
      setIsLoading(false)
      return
    }

    checkBookmarkStatus(property._id)
      .then(res => {
        setIsBookmarked(res.isBookmarked)
      })
      .catch(error => toast.error(error))
      .finally(() => setIsLoading(false))
  }, [property._id, userId, checkBookmarkStatus])

  async function handleClick() {
    if (!userId) {
      toast.error('You need to be signed in to bookmark a listing')
      return
    }

    bookmarkProperty(property._id)
      .then(res => {
        toast.success(res.message)
        setIsBookmarked(true)
      })
      .catch(error => toast.error(error))
  }

  if(isLoading) {
    return <p className="text-center">Loading...</p>
  }

  return ( 
    <>
    {!isBookmarked && 
    <button
      className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
        onClick={handleClick}
      >
      <FaBookmark className="mr-2" /> Bookmark Property
    </button>}
    {isBookmarked && 
    <button
      className="bg-red-500 hover:bg-red-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
        onClick={handleClick}
      >
      <FaBookmark className="mr-2" /> Remove Bookmark
    </button>}
    </>
  );
}

export default BookmarkButton;