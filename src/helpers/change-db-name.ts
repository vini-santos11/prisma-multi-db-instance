import { env } from "../env";

export function changeDBName(tenantName: string): string {
    const [protocol, , authHostPort, dbPathWithParams] = env.DATABASE_URL.split('/');
    const [params] = dbPathWithParams.split('?');

    const newDbPath = params ? `${tenantName}?${params}` : tenantName;

    return `${protocol}//${authHostPort}/${newDbPath}`;
}
