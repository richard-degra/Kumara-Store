const User = require('../models/User')

const { hash } = require('bcryptjs')
const crypto = require('crypto')
const mailer = require('../../lib/mailer') 
module.exports = {
    loginForm(req, res) {
        return res.render('session/login')
    },

    login(req, res) {
        req.session.userId = req.user.id

        return res.redirect('/users')
    },

    logout(req, res) {
        req.session.destroy()
        return res.redirect('/')
    },

    forgotForm(req, res) {
        return res.render('session/forgot-password')
    },

    async forgot(req, res) {

        const user = req.user

        try {
        // Criar um token
        
        const token = crypto.randomBytes(20).toString('hex')

        // Criar uma validade pro token

        let now = new Date()
        now = now.setHours(now.getHours() + 1)

        await User.update(user.id, {
            reset_token: token,
            reset_token_expires: now
        })

        // Enviar um email com um link para recuperar a senha

        await mailer.sendMail({
            to: user.email,
            from: 'no-reply@kumarastore.com.br',
            subject: 'Recuperação de senha',
            html:`<h2>Perdeu sua chave?</h2>
            <p>Clique no link abaixo para recuperar sua senha</p>
            <p>
                <a href='http://localhost:3000/users/password-reset?token=${token}' target='_blank'>
                    Recuperar sua senha
                </a>
            </p>
            `,
        })

        // Avisar ao usuário que foi enviado o email

        return res.render('session/forgot-password', {
            success:'Email enviado para a recuperação'
        }) 

        }catch(err) {
            console.error(err)
            return res.render('session/forgot-password', {
                error:'Erro inesperado, tente novamente'
            }) 
        }
    },

    resetForm(req, res){
        return res.render('session/password-reset', { token: req.query.token })
    },

    async reset(req, res) {
        const user  = req.user

        const { password } = req.body

        try {

            // Criar um novo hash de senha //

            const newPassword = await hash(password, 8)

            // Atualiza as infos do usuário //

            await User.update(user.id, {
                password: newPassword,
                reset_token:'',
                reset_token_expires:''
            })

            // Avisar o usuário que a nova senha foi cadastrada //

            return res.render('session/login', {
                user: req.body,
                success: 'Senha atualizada! Realize seu login'
            })
            
        }catch(err) {
            console.error(err)
            return res.render('session/password-reset', {
                user: req.body,
                error: 'Erro inesperado, tente novamente'
            })
        }

    }
}