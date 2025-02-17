import { redirect } from 'next/navigation';
import clientPromise from '@/app/lib/mongodb';

export default async function Page({ params }) {
    const { url } = params;  

    const client = await clientPromise;
    const db = client.db('bitlinks');
    const collection = db.collection('urls');
    const urlData = await collection.findOne({ customUrl: url });

    if (urlData) {
        redirect(urlData.url);
    } else {
        return <div>URL not found</div>;
    }
}
