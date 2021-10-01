import { Model, model, Document, Schema } from 'mongoose'
import { Password } from '../libs/password'

interface UserAttrs {
  email: string
  password: string
}

interface UserModel extends Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc
}

interface UserDoc extends Document {
  email: string
  password: string
}

const UserSchema: Schema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
})

UserSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const hashed = await Password.toHash(this.get('password'))
    this.set('password', hashed)
  }
  done()
})

UserSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs)
}

const User = model<UserDoc, UserModel>('User', UserSchema)

export { User }
