import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export default class AddUserIdToAppointments1600695616789 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.addColumn('appointments', new TableColumn({
            name: 'user_id',
            type: 'uuid',
            isNullable: true
        }) );

        await queryRunner.createForeignKey('appointments', new TableForeignKey({
            name: 'AppoitmentsUser',
            columnNames: ['user_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
        }) )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('appointments', 'AppoitmentsUser');
        await queryRunner.dropColumn('appointments', 'user_id');

    }

}
