import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {

    const username = request.nextUrl.searchParams.get('username');

    if (!username) 
        return Response.json({ error: "Inavlid username" })

    try {

        if (username.length < 4 || username.length > 18)
            return Response.json({ error: "Inavlid username" })

        const excluded = excludedUsernames.filter(u => u === String(username).toLowerCase()).length > 0;
        const includesHate = exludeContaining.filter(u => String(username).includes(u)).length > 0;
        const ensClash = username.endsWith(".eth");
        const hasSpecialChar = /[`~!@#$%^&*()|+\-=?;:'",.<>\{\}\[\]\\\/]/gi.test(username);

        if (excluded || ensClash || hasSpecialChar || includesHate)
            return Response.json({ exists: true });

        //const exists = await checkUsername(username);

        return Response.json({ exists: false });

    } catch(err: any) {
        return Response.json({ error: err.message });
    }

}

const excludedUsernames = [
    'account',
    'settings',
    'gaming',
    'wager',
    'logout',
    'login',
    'wallet',
    'games',
    'game',
    'finder',
    'search',
    'stake',
    'mint',
    '404',
    'error',
    'admin',
    'users',
    'user'
];

const exludeContaining = [
    'nazi',
    'nazii',
    'nazzi',
    'nigger',
    'nigg3r',
    'nigg4h',
    'nigga',
    'niggah',
    'niggas',
    'niggaz',
    'retard',
    'cunt',
    'kkk',
    'homo'
]