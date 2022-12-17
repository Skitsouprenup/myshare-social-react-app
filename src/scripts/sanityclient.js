import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const sanityclient = sanityClient({
    projectId: process.env.APP_SANITY_PROJECT_ID,
    token: process.env.APP_SANITY_USER_EDITOR_TOKEN,
    ignoreBrowserTokenWarning: true,
    dataset: 'production',
    apiVersion: '2022-11-14',
    useCdn: true,
})

const builder = imageUrlBuilder(sanityclient);
export const urlFor = (source) => builder.image(source);