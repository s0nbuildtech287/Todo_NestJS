import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddAgeToUser1678901234567 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'user',
      new TableColumn({
        name: 'age',
        type: 'int',
        isNullable: true, // hoặc false nếu bạn không muốn cho phép null
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('user', 'age');
  }
}
