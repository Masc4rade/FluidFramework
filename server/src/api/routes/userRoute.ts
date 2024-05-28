import { Router, Response } from 'express';
import IUserController from "../../controllers/IControllers/IUserController";
import { Container } from 'typedi';
import { celebrate, Joi } from 'celebrate';
import middlewares from '../middlewares';

const router = Router();

const connectedClients = new Set<Response>();

function sendSSEEvent(data: any){
    connectedClients.forEach((client) =>{
        client.write(`data: ${JSON.stringify(data)}\n\n`)
    })
}

export default (app: Router) =>{
    app.use('/users', router);

    const ctrl = Container.get("UserController") as IUserController;

    router.post('/login',
        celebrate({
            body: Joi.object({
                name: Joi.string().optional(),
                email: Joi.string().required(),
                password: Joi.string().required()
            })
        }),
        (req, res, next) => {
            ctrl.login(req, res, next);
        }
    );
    router.post('',
        celebrate({
            body: Joi.object({
                name: Joi.string().required(),
                email: Joi.string().required(),
                password: Joi.string().required()
            })
        }),
        (req, res, next) => {
            ctrl.createUser(req, res, next);
        }
    );

    router.get('/sse-users', (req, res) => {
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');
    
        connectedClients.add(res);
    
        res.on('close', () => {
          connectedClients.delete(res);
        });
    });
}