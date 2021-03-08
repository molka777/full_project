const User = require('../model/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const secretOrkey = config.get('secretOrkey');

exports.register = async (req, res) => {
    const { name, email, password, phoneNumber } = req.body;

    try {
        const searchRes = await User.findOne({ email })
        if (searchRes) return res.status(401).json({ msg: `User already exists , Use a different email` })

        const newUser = new User({
            name,
            email,
            password,
            phoneNumber
        });

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        newUser.password = hash;

        await newUser.save();
        res.status(201).json(newUser)
    } catch (error) {
        console.log(error)
        res.status(500).json({ errors: error });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ msg: `bad credentiels ! ` });
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) return res.status(401).json({ msg: `bad credentiel !` });

        const payload = {
            id: user._id,
            name: user.name,
            email: user.email,
            phoneNumber: user.phoneNumber
        }

        const token = await jwt.sign(payload, secretOrkey);
        return res.status(200).json({ token: `Bearer ${token}` });

    } catch (error) {
        console.log(Error)
        res.status(500).json({ errors: error });

    }
}