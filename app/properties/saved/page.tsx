import PropertyCard from "@/components/PropertyCard";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import User from "@/models/User";
import { getSessionUser } from "@/utils/getSessionUser";

async function SavedPropertiesPage() {
  await connectDB()

  const sessionUser = await getSessionUser()

  if (!sessionUser || !sessionUser.userId) {
    throw new Error('User Id is required')
  }

  const { userId } = sessionUser

  const user = await User.findById(userId).populate('bookmarks')

  if (!user) {
    throw new Error('Unauthorized')
  }

  const bookmarks = user.bookmarks
  const properties = await Property.find({})
  const savedProperties = properties.filter(property => bookmarks.includes(property._id))

  return ( 
    <section className="px-4 py-6">
      <div className="container lg:container m-auto px-4 py-6">
        <h1 className="text-2xl mb-4">Saved Properties</h1>
        {bookmarks.length === 0 && <p>No saved properties</p>}
        {bookmarks.length !== 0 && 
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {savedProperties.map(property => 
            <PropertyCard key={`${property._id}`} property={property}/>
          )
          }
        </div>
        }
      </div>
    </section>
  );
}

export default SavedPropertiesPage;