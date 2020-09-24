import Hapi from '@hapi/hapi'
import Boom from '@hapi/boom';

export async function failAction(request: Hapi.Request, h: Hapi.ResponseToolkit, err: any) {
    if (process.env.NODE_ENV === 'production') {
        console.error('ValidationError:', err.message);
        throw Boom.badRequest(`Invalid request payload input`);
    } else {
        console.error(err);
        throw err;
    }
}

export function addAll(...args: number[]) {
    return args.reduce((c, p) => c + p, 0)
}