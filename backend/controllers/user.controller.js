const User = require('../model/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const secretOrkey = config.get('secretOrkey');

exports.register = async (req, res) => {
    const { name, email, password, phoneNumber } = req.body;

    try {
        const searchRes = await User.findOne({ email })
        if (searchRes) return res.status(401).json({ msg: `Utilisateur existant , utiliser un autre E-mail` })

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
        if (!user) return res.status(404).json({ msg: `Votre email ou mot de passe est faux ` });
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) return res.status(401).json({ msg: `Votre email ou mot de passe est faux` });

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
};

exports.updateUser = async (req, res) => {
    try {
        const { name, email, phoneNumber } = req.body;

        await User.findByIdAndUpdate({ _id: req.params.id },
            { name, email, phoneNumber }
        );

        res.status(201).json({ msg: "L'utilisateur a été modifié avec succès" });
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
}