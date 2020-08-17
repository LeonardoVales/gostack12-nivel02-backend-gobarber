

import User from '../infra/typeorm/entities/User';
import AppError from '@shared/erros/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import { injectable, inject } from 'tsyringe';


interface IReqeust {
    email: string;
}

@injectable()
class SendForgotPasswordEmailService {

    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('MailProvider')
        private mailProvider: IMailProvider,

    ) {}

    public async execute({ email }: IReqeust): Promise<void> {

        const checkUserExists = await this.usersRepository.findByEmail(email);

        if (!checkUserExists) {
            throw new AppError('Users does not exists');
        }

        this.mailProvider.sendMail(email, 'Pedido de recuperação de senha recebido')
    }

}

export default SendForgotPasswordEmailService;


/**
 * Passo a passo:
 *
 */
