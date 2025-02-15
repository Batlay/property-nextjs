import Image from "next/image";

type Props = {
  image: string
}

function PropertyHeaderImage({image} : Props) {
  return ( 
    <section>
      <div className="container-xl m-auto">
        <div className="grid grid-cols-1">
          <Image
            src={image}
            alt="property image"
            className="object-cover h-[400px] w-full"
            width={0}
            height={0}
            sizes='100'
          />
        </div>
      </div>
    </section>
  );
}

export default PropertyHeaderImage;