import PropertyEditForm from "@/components/PropertyEditForm";
import connectDB from "@/config/database";
import Property from "@/models/Property";


type Props = {
  params: Params
}

type Params = {
  id: string
}

async function PropertyEditPage({params}: Props) {
  await connectDB()

  const property = await Property.findById(params.id)

  if (!property) {
    return (
      <h1 className="text-center text-2xl font-bold mt-10">
        Property not found
      </h1>
    )
  }


  return ( 
    <section className="bg-blue-50">
      <div className="container m-auto max-w-2xl py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <PropertyEditForm property={property}/>
        </div>
      </div>
    </section>
  );
}

export default PropertyEditPage;