'use server'

import cloudinary from "@/config/cloudinary";
import connectDB from "@/config/database";
import Property, { IProperty } from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";
import { HydratedDocument } from "mongoose";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";


async function addProperty(formData: FormData) {
  await connectDB()

  const sessionUser = await getSessionUser()

  if (!sessionUser || !sessionUser.userId) {
    throw new Error('User Id is required')
  }

  const { userId } = sessionUser

  const amenities = formData.getAll('amenities')
  const images = (formData
    .getAll('images') as File[])
    .filter((image) => image.name !== '')

  console.log(formData.getAll('images'));


  const imageUrls = []

  for (const imageFile of images) {
    const imageBuffer = await imageFile.arrayBuffer()
    const imageArray = Array.from(new Uint8Array(imageBuffer))
    const imageData = Buffer.from(imageArray)

    // convert to base64
    const imageBase64 = imageData.toString('base64')

    // make request to cloudinary
    const result = await cloudinary.uploader.upload(`data:image/png;base64,${imageBase64}`, {
      folder: 'property-nextjs'
    })

    imageUrls.push(result.secure_url)
  }

    const propertyData = {
    owner: userId,
    type: formData.get('type'),
    name: formData.get('name'),
    description: formData.get('description'),
    location: {
      street: formData.get('location.street'),
      city: formData.get('location.city'),
      state: formData.get('location.state'),
      zipcode: formData.get('location.zipcode'),
    },
    beds: formData.get('beds'),
    baths: formData.get('name'),
    square_feet: formData.get('name'),
    amenities,
    rates: {
      weekly: formData.get('rates.weekly'),
      monthly: formData.get('rates.monthly'),
      nightly: formData.get('rates.weekly')
    },
    seller_info: {
      name: formData.get('seller_info.name'),
      email: formData.get('seller_info.email'),
      phone: formData.get('seller_info.phone'),
    },
    images: imageUrls,
  }

  const newProperty: HydratedDocument<IProperty> = new Property(propertyData)
  await newProperty.save()

  revalidatePath('/', 'layout')

  redirect(`/properties/${newProperty._id}`)
}

export default addProperty