import { Entity,
         Column,
         PrimaryGeneratedColumn,
         CreateDateColumn,
         UpdateDateColumn } from 'typeorm';

import { Exclude, Expose } from 'class-transformer';

@Entity('users')
class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    @Exclude()
    password: string;

    @Column()
    avatar: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @Expose({ name: 'avatar_url '})
    getAvatarUrl(): string {
        return `${process.env.APP_API_URL}/files/${this.avatar}`;
    }
    // constructor({ provider, date}: Omit<Appointment, 'id'>) {
    //     this.id = uuid(),
    //     this.provider = provider;
    //     this.date = date;
    // }
}

export default User;

