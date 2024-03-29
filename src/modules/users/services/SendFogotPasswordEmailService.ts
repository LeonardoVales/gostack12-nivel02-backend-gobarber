import { injectable, inject } from 'tsyringe';
import path from 'path';

import AppError from '@shared/erros/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import IUserTokensRepository from '../repositories/IUserTokensRepository';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';



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

        const forgotPasswordTemplate = path.resolve(
            __dirname,
            '..',
            'views',
            'forgot_password.hbs'
        );

        await this.mailProvider.sendMail({
           to: {
               name: user.name,
               email: user.email
           },
           subject: '[GoBarber] Recuperação de Senha',
           templateData: {
               file: forgotPasswordTemplate,
               variables: {
                   name: user.name,
                   link: `${process.env.APP_WEB_URL}/reset_password?token=${token}`,
               },
           },
       });
    }

}

export default SendForgotPasswordEmailService;


/**
 * Passo a passo:
 *
 */
