const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const Register = async (req, res) => {
    const { name, email, phone, password } = req.body;

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: 'kickart11@gmail.com',
            pass: 'iccj tbvg xzlg xckt'
        }
    });

    const mailOptions = {
        from: 'kickart11@gmail.com',
        // to: `${user.email}`,
        to: `findnickresearch@gmail.com`,
        subject: 'Registration',
        text: `Thank you for being the part of LinkedIn Account we will reach you shortly`
    };




    console.log(req.body);
    try {
        const data = { name, email, phone, password }
        let user = await User.findOne({ email: email })
        if (user) {
            return res.status(400).json({ msg: 'User with this email already exists' })
        }
        user = new User({ name, email, phone, password })
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt)
        await user.save();

        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(payload, process.env.JWTSECRET || 'myscretkey', { expiresIn: 3600000 }, (err, token) => {
            if (err) throw err.message;
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    //   res.send('Mail Error: ', error);
                    console.log("Error: ", error);
                } else {
                    glob_email = email;
                }
            }
            );
            return res.json({ token }); console.log(token);
        })
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error')
    }

}

const Login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(200).json({ msg: 'User with this email doesnot exists' })
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(200).json({ msg: 'Password Incorrect' })
        }
        const payload = {
            user: {
                id: user.id,
            }
        }
        jwt.sign(payload, process.env.JWTSECRET, { expiresIn: 360000 }, async (err, token) => {
            if (err) throw err.message;
            return res.json({ token })
        })
    } catch (error) {

    }
}

const AllUserData = async (req, res) => {
    try {
        const user = await User.find()
        return res.status(200).json(user)
    } catch (error) {
        return res.status(400).json(error)
    }
}






module.exports = { Register, Login, AllUserData }


