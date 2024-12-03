'use client'

import { FacebookProvider, CustomChat } from 'react-facebook';

const FacebookMsg = () => {
    return (
        <FacebookProvider appId="1113537720301865" chatSupport>
            <CustomChat pageId="301611846983362"  />
        </FacebookProvider>
    )
}

export default FacebookMsg
