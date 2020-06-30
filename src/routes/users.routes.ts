import { Router } from 'express';
import CreateUserService from '../services/CreateUserService';


const usersRouter = Router();

usersRouter.post('/', async (request, response) => {

    try {

        const { name, email, password } = request.body;

        const createUser = new CreateUserService();

        const user = await createUser.execute({
            name,
            email,
            password,
        });

        delete user.password;

        return response.json(user);
    } catch(err) {
        return response.status(400).json({ error: err.message });
    }

});

export default usersRouter;


// Separa o que é regra de negócio do que é transformação de dados
// Tudo que é transformação de dados, isto é: recebo a informação de uma forma e
// quero transformar ela em outra, isso fica na rota.
// O que é regra de negócio fica dentro do Service
