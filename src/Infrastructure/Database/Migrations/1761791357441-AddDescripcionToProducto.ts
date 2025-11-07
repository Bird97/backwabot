import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddDescripcionToProducto1761791357441 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn("producto", new TableColumn({
            name: "descripcion",
            type: "text",
            isNullable: true,
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("producto", "descripcion");
    }

}
