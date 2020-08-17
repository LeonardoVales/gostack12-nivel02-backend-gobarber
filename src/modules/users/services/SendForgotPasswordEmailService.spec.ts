import AppError from '@shared/erros/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import SendForgotPasswordEmailService from './SendFogotPasswordEmailService';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';

describe('SendForgotPasswordEmailService', () => {

    it('should be able to recover the password using the email', async () => {

        const fakeUsersRepository = new FakeUsersRepository();
        const fakeMailProvider = new FakeMailProvider();

        const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

        const sendForgotPasswordEmailService = new SendForgotPasswordEmailService(
            fakeUsersRepository,
            fakeMailProvider,
        );

        await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
        });

        await sendForgotPasswordEmailService.execute({
            email: 'johndoe@example.com',
        });

        expect(sendMail).toHaveBeenCalled();

    });

    it('should not be able to recouver a non-existing user password', async () => {

        const fakeUsersRepository = new FakeUsersRepository();
        const fakeMailProvider = new FakeMailProvider();

        const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

        const sendForgotPasswordEmailService = new SendForgotPasswordEmailService(
            fakeUsersRepository,
            fakeMailProvider,
        );

        await expect(
            sendForgotPasswordEmailService.execute({
                email: 'johndoe@example.com',
            }),
        ).rejects.toBeInstanceOf(AppError);

    });



});
