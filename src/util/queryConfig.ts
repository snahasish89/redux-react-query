import {QueryClientConfig} from 'react-query'

const ONE_SEC = 1000;
const FIVE_MINUTE = ONE_SEC * 60 * 5;

export const queryConfig: QueryClientConfig = {
    defaultOptions: {
        queries: {
            staleTime: FIVE_MINUTE,
            retry: 2,
            cacheTime: FIVE_MINUTE,
            refetchInterval: FIVE_MINUTE,
            refetchOnWindowFocus: false,
            retryDelay: ONE_SEC,
        }
    }
}

export const bg = (image: string) => (
    {
      backgroundImage: `url(${image})`, 
      backgroundSize: 'contain', 
      backgroundRepeat: 'no-repeat', 
      backgroundPosition: 'center'
    }
)