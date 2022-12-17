import AsyncStorage from '@react-native-async-storage/async-storage';

export default class User {
  constructor(username, password) {
    this.username = username;
    this.password = password;
    this.token = null;
    this.userExists = false;
  }

  // cURL to fetch: https://kigiri.github.io/fetch/

  async CheckUserExistence() {
    const response = await fetch(
      'https://parse.trackmy.skin/parse/users?where={"username":"' +
        this.username +
        '"}',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Parse-Application-Id': 'tms',
        },
      }
    );

    if (!response.ok) {
      alert('An error has occured:' + response.status);
    } else {
      const users = await response.json();
      if (users['results'].length > 0) {
        this.setUserExists(true);
      }
      // alert(JSON.stringify(users['results'].length));
    }
  }

  async getValueFor(key) {
    return await AsyncStorage.getItem(key);
  }

  async Login() {
    const response = await fetch('https://parse.trackmy.skin/parse/login', {
      method: 'POST',
      body: JSON.stringify({
        username: this.username,
        password: this.password,
      }),
      headers: {
        'Content-Type': 'application/json',
        'X-Parse-Application-Id': 'tms',
        'X-Parse-Revocable-Session': '1',
      },
    });

    if (!response.ok) {
      alert('An error has occured:' + response.status);
      return false;
    } else {
      const loggedInUser = await response.json();
      this.token = loggedInUser['results'].sessionToken;
      saveToken();
      this.objectId = loggedInUser['results'].objectId;
      return true;
    }
  }

  async Register() {
    const response = await fetch('https://parse.trackmy.skin/parse/users', {
      method: 'POST',
      body: JSON.stringify({
        username: this.username,
        password: this.password,
      }),
      headers: {
        'Content-Type': 'application/json',
        'X-Parse-Application-Id': 'tms',
      },
    });

    if (!response.ok) {
      alert('An error has occured:' + response.status);
      return false;
    } else {
      const signedUp = await response.json();
      alert(JSON.stringify(signedUp));
      return true;
    }
  }

  async saveToken() {
    await AsyncStorage.setItem('userToken', this.token);
  }

  setUserExists(exists) {
    this.userExists = exists;
  }

  setUsername(username) {
    this.username = username;
  }

  setPassword(password) {
    this.password = password;
  }

  async setToken(token) {
    this.token = token;
  }

  async validateToken() {
    const response = await fetch('https://parse.trackmy.skin/parse/users/me', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Parse-Application-Id': 'tms',
        'X-Parse-Session-Token': this.token,
      },
    });

    if (!response.ok) {
      alert('An error has occured:' + response.status);
    } else {
      const user = await response.json();
      this.username = user['results'].username;
      this.objectId = user['results'].objectId;
      this.userExists = true;
    }
  }
}
