

import User from '../infra/typeorm/entities/User';
import AppError from '@shared/erros/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import IUserTokensRepository from '../repositories/IUserTokensRepository';
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

        @inject('UserTokensRepository')
        private userTokensRepository: IUserTokensRepository,

    ) {}

    public async execute({ email }: IReqeust): Promise<void> {

        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new AppError('Users does not exists');
        }

        const { token } = await this.userTokensRepository.generate(user.id);

       await this.mailProvider.sendMail(
           email,
           `Pedido de recuperação de senha recebido: ${token}`
        );
    }

}

export default SendForgotPasswordEmailService;


/**
 * Passo a passo:
 *
 */
