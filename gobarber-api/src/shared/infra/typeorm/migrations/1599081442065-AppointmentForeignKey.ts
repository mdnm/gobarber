import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export default class AppointmentForeignKey1599081442065 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey('appointments', new TableForeignKey({
      name: 'fk_user',
      columnNames: ['provider_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'users',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('appointments', 'fk_user');
  }
}
