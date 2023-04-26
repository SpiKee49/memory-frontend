import { client } from './axiosClient'

export function register({ username, email, password, profileName }) {
    return client.post(
        'auth/register',
        { username, email, password, profileName },
        { authorization: false }
    )
}

export function login({ username, password }) {
    return client.post(
        'auth/login',
        { username, password },
        { authorization: false }
    )
}

export function getProfile(username) {
    return client.get(`users/${username}`)
}
//Albums
export function getAlbums(search) {
    return client.get(!search ? 'albums' : `'albums?search=${search}`)
}

export function getAlbumDetail(id) {
    return client.get(`albums/${parseInt(id, 10)}`)
}
export function createAlbum(data) {
    return client.post(`albums`, data)
}

//Locations
export function getLocs(search) {
    return client.get(!search ? 'locations' : `'locations?search=${search}`)
}

//Posts
export function getLikes(id) {
    return client.get(`posts/${parseInt(id, 10)}/likes`)
}

export function likePost(userId, postId) {
    return client.put(
        `users/${userId}/like`,
        {
            postId,
        },
        { authorization: true }
    )
}
