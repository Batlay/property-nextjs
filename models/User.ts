import { ObjectId, Schema, Types, model, models } from 'mongoose'

export interface IUser {
  email: string,
  username: string,
  image: string,
  bookmarks: Types.Array<Types.ObjectId>,
}

const UserSchema = new Schema<IUser>({
  email: {
    type: String,
    unique: [true, 'Email already exists'],
    required: [true, 'Email is required']
  },
  username: {
    type: String,
    required: [true, 'Username is required']
  },
  image: {
    type: String,
  },
  bookmarks: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Property'
    }
  ]
}, {
  timestamps: true,
})

const User = model<IUser>('User', UserSchema)
export default User