import PropertyCard from '@/components/PropertyCard';
import connectDB from '@/config/database';
import Property, { IProperty } from '@/models/Property';

async function PropertiesPage() {
  await connectDB()
  const properties = await Property.find({})

  return ( 
    <section className='px-4 py-6'>
      <div className="container-xl lg:container m-auto px-4 py-6">
        {!properties && <p>No properties found</p>}
        {properties && 
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          {properties.map(property => 
            <PropertyCard key={property.createdAt} property={property}/>
          )}
        </div>
        }
      </div>
    </section>
  );
}

export default PropertiesPage;