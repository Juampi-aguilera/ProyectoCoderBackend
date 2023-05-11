import { Router } from 'express';
import userModel from '../models/user.model.js';
import passport from 'passport';

const router = Router();

router.get("/github", passport.authenticate('github', {scope: ['user:email']}), async (req, res) => {});

router.get("/githubcallback", passport.authenticate('github', {failureRedirect: '/api/sessions/error'}), async (req, res) => {
    const user = req.user;
    req.session.user= {
        name : `${user.first_name} ${user.last_name}`,
        email: user.email,
        age: user.age
    };
    req.session.admin = true;
    res.redirect("/api/products");
});

/*
router.post("/register", async (req, res)=>{
    const { first_name, last_name, email, age, password,role} = req.body;
    console.log("Registrando usuario:");
    console.log(req.body);

    const exists = await userModel.findOne({email});
    if (exists){
        return res.status(400).send({status: "error", message: "Usuario ya existe."});
    }
    const user = {
        first_name,
        last_name,
        email,
        age,
        password, //se encriptara despues...
        role
    };
    const result = await userModel.create(user);
    res.status(201).send({status: "success", message: "Usuario creado con extito con ID: " + result.id});
    
}); 
*/

router.post("/register", passport.authenticate('register', { failureRedirect: '/api/sessions/fail-register' }),
    async (req, res) => {
        console.log("Registrando nuevo usuario.");
        res.status(201).send({ status: "success", message: "Usuario creado con extito." });
    }
);

/*
router.post("/login", async (req, res)=>{
    const {email, password} = req.body;
    const user = await userModel.findOne({email,password}); //Ya que el password no está hasheado, podemos buscarlo directamente
    if(!user) return res.status(401).send({status:"error",error:"Incorrect credentials"});
    req.session.user= {
        name : `${user.first_name} ${user.last_name}`,
        email: user.email,
        age: user.age
    }
    res.send({status:"success", payload:req.session.user, message:"¡Primer logueo realizado! :)" });
});
*/

router.post("/login", passport.authenticate('login', { failureRedirect: '/api/sessions/fail-login' }), async (req, res) => {
    console.log("User found to login:");
    const user = req.user;
    console.log(user);
    if (!user) return res.status(401).send({ status: "error", error: "El usuario y la contraseña no coinciden!" });
    req.session.user = {
        name: `${user.first_name} ${user.last_name}`,
        email: user.email,
        age: user.age
    }
    res.send({ status: "success", payload: req.session.user, message: "¡Primer logueo realizado! :)" });
});

router.get("/fail-register", (req, res) => {
    res.status(401).send({ error: "Failed to process register!" });
});

router.get("/fail-login", (req, res) => {
    res.status(401).send({ error: "Failed to process login!" });
});

router.get('/error', (req, res )=>{
    res.render("error", {error: "No se pudo autenticar usando GitHub!"});
})


export default router;