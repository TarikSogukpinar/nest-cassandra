import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Client } from 'cassandra-driver';

@Injectable()
export class CassandraService implements OnModuleInit, OnModuleDestroy {
    private client: Client;

    constructor() {
        this.client = new Client({
            contactPoints: ['127.0.0.1'], // Cassandra'nın çalıştığı adres
            localDataCenter: 'datacenter1', // Cassandra için tanımlanan datacenter
            keyspace: 'example_keyspace',   // Cassandra'daki keyspace adı
        });
    }

    async onModuleInit() {
        try {
            await this.client.connect();
            console.log('Cassandra connected');
        } catch (err) {
            console.error('Failed to connect to Cassandra:', err);
        }
    }

    async onModuleDestroy() {
        await this.client.shutdown();
        console.log('Cassandra connection closed');
    }

    async execute(query: string, params: any[] = []): Promise<any> {
        try {
            const result = await this.client.execute(query, params, { prepare: true });
            return result.rows;
        } catch (err) {
            throw new Error(`Cassandra query failed: ${err.message}`);
        }
    }
}
