import clientPromise from '@/app/lib/mongodb';

export async function GET(req) {
    try {
        const client = await clientPromise;
        const db = client.db('bitlinks');
        const collection = db.collection('urls');

        const storedLinks = await collection.find({}).toArray();

        
        if (storedLinks.length === 0) {
            return new Response(JSON.stringify({ message: "No links found" }), {
                status: 404,
                headers: { "Content-Type": "application/json" }
            });
        }
        return new Response(JSON.stringify(storedLinks), {
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
