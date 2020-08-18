import { Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    Generated } from 'typeorm';

@Entity('user_tokens')
class UserToken {
@PrimaryGeneratedColumn('uuid')
id: string;

@Column()
@Generated('uuid')
token: string;

@Column()
user_id: string;

@CreateDateColumn()
created_at: Date;

@UpdateDateColumn()
updated_at: Date;
// constructor({ provider, date}: Omit<Appointment, 'id'>) {
//     this.id = uuid(),
//     this.provider = provider;
//     this.date = date;
// }
}

export default UserToken;

