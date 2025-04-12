import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);
const dbName = "omgblackguygenerator";

export async function GET() {
    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection("contador");

        const contador = await collection.findOne({ _id: "imagens" as any });

        return new Response(JSON.stringify({ total: contador?.total || 0 }), {
            status: 200,
        });
    } catch (err) {
        return new Response("Erro ao buscar contador: " + err, { status: 500 });
    }
}

export async function POST() {
    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection("contador");

        const result = await collection.findOneAndUpdate(
            { _id: "imagens" as any }, 
            { $inc: { total: 1 } }, 
            { returnDocument: "after", upsert: true }
        );
        return new Response(JSON.stringify({ status: "incrementado"}), {
            status: 200,
        });
    } catch (err) {
        console.error("Erro ao incrementar", err);
        return new Response(
            JSON.stringify({ 
                error: "Erro ao incrementar", 
                errcode: err
            }),
            { status: 500 }
        );
    }
}