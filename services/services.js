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
//Users
export function getProfile(username) {
    return client.get(`users/${username}`)
}

export function removeFriend(id, friendId) {
    return client.put(`users/friends/remove`, { id, friendId })
}

export function getAllUsers(search) {
    return client.get(!search ? `users` : `users?search=${search}`)
}

//Albums
export function getAlbums(search) {
    return client.get(!search ? 'albums' : `albums?search=${search}`)
}

export function getAlbumDetail(id) {
    return client.get(`albums/${parseInt(id, 10)}`)
}
export function createAlbum(data) {
    return client.post(`albums`, data)
}

//Locations
export function getLocs(search) {
    return client.get(!search ? 'locations' : `locations?search=${search}`)
}
export function postAddLocation(location) {
    return client.post('locations', location)
}

//Posts

export function postAddPost(post) {
    return client.post(`posts/`, post)
}
export function getLikes(id) {
    return client.get(`posts/${parseInt(id, 10)}/likes`)
}

export function likePost(userId, postId) {
    return client.put(`users/${userId}/like`, {
        postId,
    })
}

//Friend requests
export function getFriendRequests(type, userId) {
    return client.get(`requests/${type}/${userId}`)
}

export function getAllFriends(userId) {
    return client.get(`users/${userId}/friends`)
}

export function sendFriendRequest(fromId, toId) {
    return client.post(`requests/send`, { fromId, toId })
}
export function handleFriendRequest(requestId, status) {
    return client.post(`requests/handle`, { id: requestId, status })
}

// Tokens
export function postPushToken(token) {
    return client.post(`tokens/add`, { token })
}
