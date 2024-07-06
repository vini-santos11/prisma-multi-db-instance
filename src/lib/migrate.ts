import { execSync } from "child_process";
import { changeDBName } from "../helpers/change-db-name";

const tenants = [
    { name: "host", db: "db_host" },
    { name: "second", db: "db_second" },
];

async function migrate() {
    tenants.forEach(async (tenant) => {
        var db = changeDBName(tenant.db);
        process.env.DATABASE_URL = db;
        
        try {
            execSync("npx prisma migrate dev --name init --preview-feature", { stdio: "inherit" });
            console.log(`Migrated in ${tenant.name}`);
        }
        catch (e) {
            console.error(`Failed to migrate ${tenant.name}`);
            console.error(e);
        }
    });
}

migrate();