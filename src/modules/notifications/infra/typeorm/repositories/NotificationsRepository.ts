import { getMongoRepository, MongoRepository } from 'typeorm';

import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import Notification from '../schemas/Notifications';
import ICreateNotificationDTO from '@modules/notifications/dtos/ICreateNotificationDTO';


class NotificatonsRepository implements INotificationsRepository {

    private ormRepository: MongoRepository<Notification>

    constructor() {
        this.ormRepository = getMongoRepository(Notification, 'mongo');
    }

    public async create({ content, recipient_id }: ICreateNotificationDTO): Promise<Notification> {
        const notification = this.ormRepository.create({ content, recipient_id });

        await this.ormRepository.save(notification);

        return notification;
    }

}

export default NotificatonsRepository;
