import {SHA256} from './cryptico/hash.js';

export function sha256 (data){
    return SHA256(JSON.stringify(data));
}
