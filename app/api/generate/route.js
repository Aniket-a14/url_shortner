import clientPromise from '@/app/lib/mongodb';

export async function POST(req) {
    try {
        const client = await clientPromise;
        const { url, customUrl } = await req.json();
        const db = client.db('bitlinks');
        const collection = db.collection('urls');
        
        const existingUrl = await collection.findOne({ url });
        if (existingUrl) {
            return new Response(JSON.stringify({ message: "URL already exists" }), {
                status: 400,
                headers: { "Content-Type": "application/json" }
            });
        }

        const existingCustomUrl = await collection.findOne({ customUrl });
        if (existingCustomUrl) {
            return new Response(JSON.stringify({ message: "Custom URL already exists" }), {
                status: 400,
                headers: { "Content-Type": "application/json" }
            });
        }

        const result = await collection.insertOne({ url, customUrl });


        return new Response(JSON.stringify({ customUrl }), {
            status: 200,
            headers: { "Content-Type": "application/json" }
        });
    } catch (error) {
        return new Response(JSON.stringify({ message: "Internal Server Error", error: error.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
}
