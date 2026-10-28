import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserSessions1793212044259 implements MigrationInterface {

public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "user_sessions" (
        "sid" varchar PRIMARY KEY,
        "sess" json NOT NULL,
        "expire" timestamp(6) NOT NULL
      )
    `);

    await queryRunner.query(`
      CREATE INDEX "IDX_user_sessions_expire"
      ON "user_sessions" ("expire")
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE "user_sessions"
    `);
  }
}


