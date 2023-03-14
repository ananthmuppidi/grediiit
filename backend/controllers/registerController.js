const User = require("../model/User")
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
    console.log(req.body)
    const email = req.body.email
    const password = req.body.password
    const username =  req.body.username
    if (!email || !password || !username) return res.status(400).json({ 'message': 'Username, email, password are required.' });
    const duplicate = await User.findOne({ email: email }).exec()
    if (duplicate) return res.sendStatus(409); //Conflict 
    try {
        const hashedPwd = await bcrypt.hash(password, 10);
        const result = await User.create({
            "firstname":  req.body.firstname,
            "lastname":  req.body.lastname, 
            "username": req.body.username,
            "email": email,
            "age": req.body.age,
            "contact": req.body.contact,
            "password": hashedPwd
        });

        console.log(result)
        res.status(201).json({ 'success': `New user ${email} created!`});

    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

module.exports = { handleNewUser };