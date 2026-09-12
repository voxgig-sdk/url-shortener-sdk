import { UrlShortenerEntityBase } from '../UrlShortenerEntityBase';
import type { UrlShortenerSDK } from '../UrlShortenerSDK';
import type { Control } from '../types';
import type { Index, IndexLoadMatch } from '../UrlShortenerTypes';
declare class IndexEntity extends UrlShortenerEntityBase<Index> {
    constructor(client: UrlShortenerSDK, entopts: any);
    make(this: IndexEntity): IndexEntity;
    load(this: any, reqmatch?: IndexLoadMatch, ctrl?: Control): Promise<IndexEntity>;
}
export { IndexEntity };
