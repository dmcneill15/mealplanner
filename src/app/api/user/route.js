import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/dbConnect.js'
import User from '@/models/user'

//POST to register/add a user
export async function POST(req) {
    await connectToDatabase();

    try {
        const body = await req.json();
        const { username, email, password } = body;

        // Check if the user already exists
        const existingUser = await User.findOne({ email_id: email });
        if (existingUser) {
            return NextResponse.json({ result: 409, message: 'User already exists' }, { status: 409 });
        }

        // Create a new user
        const newUser = new User({
            username,
            email_id: email,
            password,
        });
        console.log(`New user created: ${newUser}`);

        const savedUser = await newUser.save();
        return NextResponse.json({ result: 200, data: savedUser }, { status: 200 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ result: 500, error: err.message }, { status: 500 });
    }
}