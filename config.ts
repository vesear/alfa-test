import 'dotenv/config';

export interface User {
    username: string;
    password: string;
}

export const user: User = {
    username: process.env.CLIENT_LOGIN ?? '',
    password: process.env.CLIENT_PASSWORD ?? '',
};

export const APP_URL = 'https://enotes.pointschool.ru/';
