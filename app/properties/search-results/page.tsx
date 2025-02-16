import PropertyCard from "@/components/PropertyCard";
import PropertySearchForm from "@/components/PropertySearchForm";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import Link from "next/link";
import { FaArrowAltCircleLeft } from "react-icons/fa";

type Props = {
  searchParams: Params
}

type Params = {
  location: string,
  propertyType: string,
}

async function SearchResultsPage({ searchParams: {location, propertyType}}: Props) {
  await connectDB()

  const locationPattern = new RegExp(location, 'i')

  let query = {
    $or: [
      {name: locationPattern},
      {description: locationPattern},
      {'location.street': locationPattern},
      {'location.city': locationPattern},
      {'location.state': locationPattern},
      {'location.zipcode': locationPattern},
    ]
  } as any

  if (propertyType && propertyType !== 'All') {
    const typePattern = new RegExp(propertyType, 'i')
    query.type = typePattern
  }

  const properties = await Property.find(query)
  const isProperties = properties.length !== 0 
  
  return ( 
    <>
      <section className="bg-blue-700 py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-start sm:px-6 lg:px-8">
          <PropertySearchForm />
        </div>
      </section>
      <section className="px-4 py-6">
        <div className="container-xl lg:container m-auto px-4 py-6">
          <Link 
            href='/properties'
            className="flex items-center text-blue-500 hover:underline mb-3"  
          >
            <FaArrowAltCircleLeft className="mr-2 mb-1"/> Back to properties
          </Link>
          <h1 className="text-2xl mb-4">Search results</h1>
          {!isProperties && <p>No search results</p> }
          {isProperties && 
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {properties.map(property =>
              <PropertyCard key={`${property._id}`} property={property}/>
            )}
          </div>
          }
        </div>
      </section>
    </>
  );
}

export default SearchResultsPage;