export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337'

export const MAGIC_PUBLIC_KEY = process.env.NEXT_PUBLIC_MAGIC_PUBLIC_KEY || 'pk_test_95E715AECE6340B4'

export const STRIPE_PK = process.env.NEXT_PUBLIC_STRIPE_PK || 'pk_test_51HXxcCDVQW7hTTllUoGcMmcZrtk9RpxA6LQ6tSXgJxYYNIftULXSM2MLst2u7wpZYaka9FmXAb0W9YKr7Hc5EPMH0004P5mQnu'

/**
 * Given an image return the Url
 * Works for local and deployed strapis
 * @param {any} image
 */
export const fromImageToUrl = (image) => {
    if(!image) {
        return "/vercal.svg"
    }

    if(image.url.indexOf("/") === 0) {
        return `${API_URL}${image.url}`
    }

    return image.url
}