import AppError from '@shared/erros/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import UpdateUserAvatarService from './UpdateUserAvatarService';

let fakeUsersRepository: FakeUsersRepository;
let fakeStorageProvider: FakeStorageProvider;
let updateUserAvatar: UpdateUserAvatarService;

describe('UpdateUserAvatar', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeStorageProvider = new FakeStorageProvider();

        updateUserAvatar = new UpdateUserAvatarService(
            fakeUsersRepository,
            fakeStorageProvider
        );
    });

    it('should be able to authenticate', async () => {

        const user = await fakeUsersRepository.create({
            name: 'Joyn Doe',
            email: 'johndoe@example.com',
            password: '123456'
        });

        await updateUserAvatar.execute({
            user_id: user.id,
            avatarFileName: 'avatar.png'
        });

        expect(user.avatar).toBe('avatar.png');


    });

    it('should not be able to update avatar from non existing user', async () => {

        await expect(
            updateUserAvatar.execute({
            user_id: 'non-existing-user',
            avatarFileName: 'avatar.png'
        }),
        ).rejects.toBeInstanceOf(AppError);


    });


    it('should delete old avatar when updating new one', async () => {

        const deleteFile = jest.spyOn(fakeStorageProvider, 'deletefile');

        const user = await fakeUsersRepository.create({
            name: 'Joyn Doe',
            email: 'johndoe@example.com',
            password: '123456'
        });

        await updateUserAvatar.execute({
            user_id: user.id,
            avatarFileName: 'avatar.png'
        });

        await updateUserAvatar.execute({
            user_id: user.id,
            avatarFileName: 'avatar2.png'
        });

        expect(deleteFile).toHaveBeenCalledWith('avatar.png');
        expect(user.avatar).toBe('avatar2.png');

    });

});
