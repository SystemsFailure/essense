import nodemailer from 'nodemailer'


export default defineEventHandler(async (event) => {
    const body: { email: string } = await readBody(event);
    // nodemailer
    return { email: body.email };
})