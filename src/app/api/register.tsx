import bcrypt from 'bcrypt'
import User from "@models/User";

export default async function handler(req, res) {
  const body = req.body;
  const user = await User.findOne({ email: body.email })
  if (user) {
    res.status(200).json({ message: 'El email ya se encuentra registrado' })
    return;
  }
  const salt = await bcrypt.genSalt(10);
  const hashPass = await bcrypt.hash(body.password, salt)
  const newUser = new User({ email: body.email, password: hashPass })
  await newUser.save()
  res.status(200).json({ message: 'success' })
}
