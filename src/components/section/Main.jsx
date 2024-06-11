import React from 'react'

import { HelmetProvider, Helmet } from 'react-helmet-async'

const Main = (props) => {
    return (
        <HelmetProvider>
            <Helmet
                titleTemplate="%s | Travel Rank"
                defaultTitle="Travel Rank"
                defer={false}
            >
                {props.title && <title>{props.title}</title>}
                <meta name="description" content={props.description} />
            </Helmet>

            <main id='main' role='main'>
                {props.children}
            </main>
        </HelmetProvider>
    )
}

export default Main
