class userController {
    
    async getUser(req, res) {

    async createAccount(req, res) {
        const {
            userName,
            email,
            password
        } = req.body;

        if (!userName) {
            return res.status(422).json({
                msg: "O nome é obrigatrio"
            });
        }
        if (!email) {
            return res.status(422).json({
                msg: "O Email é obrigatrio"
            });
        }
        if (!password) {
            return res.status(422).json({
                msg: "A senha é obrigatrio"
            });
        }

        const userExists = await User.findOne({
            email: email
        });

        if (userExists) {
            return res.status(422).json({
                msg: "Por favor, utilize outro e-mail"
            });
        }

        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(password, salt);

        const user = new User({
            userName,
            email,
            password: passwordHash,
        });

        try {
            await user.save();

            res.status(201).json({
                msg: "Usuário criado com sucesso!"
            });
        } catch (error) {
            res
                .status(500)
                .json({
                    msg: "Aconteceu um erro no servidor, tente mais tarde!"
                });
        }
    }
}

module.exports = new userController()