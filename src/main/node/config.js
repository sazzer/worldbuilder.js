import {build as comfy} from 'comfy';

export const config = comfy((c) => {
    c.optional('port', 5000);
});
