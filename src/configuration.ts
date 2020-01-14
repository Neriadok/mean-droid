export const session = {
    secret: 'fake-secret',
    expiresIn: '7d'
};

export enum status {
    ok = 200,
    empty = 204,
    ko = 400,
    unauthorized = 401,
    needPay = 402,
    forbidden = 403,
    notFound = 404,
    conflict = 409,
    unsupportedMedia = 415,
    teaPot = 418,
    serverError = 500
}

export enum perms {
    banned = 0,
    user = 1,
    moderator = 2,
    admin = 3
}
