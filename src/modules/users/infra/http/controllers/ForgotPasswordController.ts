import { Request, Response } from 'express';
import { container } from 'tsyringe';

import SendForgotPasswordEmailService from '@modules/users/services/SendFogotPasswordEmailService';

export default class ForgoPasswordController {
    public async create(request: Request, response: Response): Promise<Response> {
        const { email } = request.body;

        const sendForgotPasswordEmail = container.resolve(SendForgotPasswordEmailService);

        await sendForgotPasswordEmail.execute({
            email
        });

        return response.status(240).json();
    }
}
