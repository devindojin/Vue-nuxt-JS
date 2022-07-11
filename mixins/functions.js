const backend_url = 'xxx.xxx.io'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import { Directus } from '@directus/sdk'

const firebaseConfig = {
  apiKey: 'AIzaSyC2Ut1Wz-UrRnO_LclThRzfFTyLypiDtC4',
  authDomain: 'project-1449345253876470579.firebaseapp.com',
  databaseURL: 'https://project-xxxxxxxxxxx.firebaseio.com',
  projectId: 'project-1449345253876470579',
  storageBucket: 'project-1449345253876470579.appspot.com',
  messagingSenderId: 'xxxxxx',
  appId: '1:xxxx:web:xxxxxxxxxx',
}

if (typeof window !== 'undefined') {
  if (!firebase.apps.length) {
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig)
  }
}
const directus = new Directus(backend_url)

import axios from 'axios'
import { Notyf } from 'notyf'
import 'notyf/notyf.min.css'

export default {

  data() {
    return {
      notyf: null,
      dummyProjects: [
        {
          cms_integration: 'pending',
          content_management: 'pending',
          date_created: '2021-07-02T12:24:28Z',
          design_customization: 'pending',
          id: 2,
          order_id: 35,
          project_name: 'My First project.',
          selected_plan: 1,
          selected_theme: 110,
          testing: 'pending',
          user: '457da05f-e566-4712-b9e1-a154b056a3c9',
          website_brief: 'in-progress',
          website_live: 'pending',
        },
        {
          cms_integration: 'completed',
          content_management: 'completed',
          date_created: '2021-07-01T12:24:28Z',
          design_customization: 'completed',
          id: 3,
          order_id: 38,
          project_name: 'My Second project',
          selected_plan: 1,
          selected_theme: 110,
          testing: 'completed',
          user: '457da05f-e566-4712-b9e1-a154b056a3c9',
          website_brief: 'completed',
          website_live: 'in-progress',
        },
        {
          cms_integration: 'completed',
          content_management: 'in-progress',
          date_created: '2021-07-01T12:24:28Z',
          design_customization: 'completed',
          id: 4,
          order_id: 50,
          project_name: 'My Third project',
          selected_plan: 1,
          selected_theme: 110,
          testing: 'pending',
          user: '457da05f-e566-4712-b9e1-a154b056a3c9',
          website_brief: 'completed',
          website_live: 'pending',
        },
      ],
    }
  },
  methods: {
    async getPostComments(id) {
      try {
        // Get directus token
        let token = await this.getToken();// get directus raw comments 
        const directusComments = await axios.get(backend_url + `items/blog_comments/?filter[blog][_eq]=${id}&filter[status][_eq]=approved&sort=-id&access_token=` + token) // invoke data
        let postComments = directusComments.data.data   // Build comments and replies tree
        postComments.map((c, i) => {        // Loop throuth all comments
          if (c.parent_comment_id) {   // If comment is a reply (comment id is not equal zero)
            const parent = postComments.findIndex((comment) => comment.id == c.parent_comment_id) // Find reply parent comment using id
            if (parent) { // if parent comment exists
              if (postComments[parent].replies) {  // Pushing replies to existing replies object
                postComments[parent].replies.push(c)
              } else {  // Creating replies object for the very first time
                postComments[parent] = { ...postComments[parent], replies: [c] }
              }
              postComments = postComments.filter(cm => cm.id != c.id) // Remove replies from original comments object and keep only parent comments
            }
          }
        })
        return [postComments, directusComments.data.data.length] // Return comments object + total comments count
      } catch (error) {
        console.log(error);
      }
    },
    async submit(down_price_id, monthly_price_id, theme_id, selectedPlan) {
      console.log('submit ' + down_price_id + ' - ' + monthly_price_id)
      var stripe = Stripe('pk_test_Q0o6I4Bcqt8DK7tkI6wIitsq')
      await axios({
        method: 'post',
        timeout: 5000,
        url: 'https://0707.io/stripe/api.php',
        data: {
          down_price_id: down_price_id,
          monthly_price_id: monthly_price_id,
          theme_id: theme_id,
          plan: selectedPlan,
        },
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => {
          console.log(res.data.id)
          return stripe.redirectToCheckout({ sessionId: res.data.id })
        })
        .catch((err) => console.error(err))
    },
    showNotification(text, type) {
      this.notyf.open({
        type: type,
        message: text,
      })
    },
    getAssetsUrl() {
      // To be replaced with imagekit url
      return backend_url + 'assets/'
    },
    async postItem(collection, payload) {
      let token = await this.getToken();
      return await axios({
        method: 'POST',
        timeout: 5000,
        url: backend_url + 'items/' + collection,
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
        data: payload,
      })
        .then((res) => {
          //console.log(res.data.data)
          return res.data.data
        })
        .catch((err) => console.error(err.message))
    },
    async getItem(collection, id, payload) {
      let token = await this.getToken();
      return await axios({
        method: 'GET',
        timeout: 5000,
        url: backend_url + 'items/' + collection + '/' + id,
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      })
        .then((res) => {
          //console.log(res.data.data)
          return res.data.data
        })
        .catch((err) => console.error(err.message))
    },
    async updateItem(collection, id, payload) {
      let token = await this.getToken()
      return await axios({
        method: 'PATCH',
        timeout: 5000,
        url: backend_url + 'items/' + collection + '/' + id,
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
        data: payload,
      })
        .then((res) => {
          //console.log(res.data.data)
          return res.data.data
        })
        .catch((err) => console.error(err.message))
    },
    async updateUser(id, payload) {
      let token = await this.getToken()
      return await axios({
        method: 'PATCH',
        timeout: 5000,
        url: backend_url + 'users/' + id,
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
        data: payload,
      })
        .then((res) => {
          //console.log(res.data.data)
          return res.data.data
        })
        .catch((err) => console.error(err.message))
    },
    async uploadFiles(formData) {
      let token = await this.getToken()
      return await axios({
        method: 'POST',
        timeout: 5000,
        url: backend_url + 'files',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
        data: formData,
      })
        .then((res) => {
          //console.log(res.data.data)
          return res.data.data
        })
        .catch((err) => console.error(err.message))
    },
    async deleteDirectusFile(id) {
      let token = await this.getToken()
      return await axios({
        method: 'DELETE',
        timeout: 5000,
        url: backend_url + 'files/' + id,
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      })
        .then((res) => {
          //console.log(res.data.data)
          return res.data.data
        })
        .catch((err) => console.error(err.message))
    },
    async hashGenerate(string) {
      let token = await this.getToken()
      return await axios({
        method: 'POST',
        timeout: 5000,
        url: backend_url + 'utils/hash/generate',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
        data: { string: string },
      })
        .then((res) => {
          //console.log(res.data.data)
          return res.data.data
        })
        .catch((err) => console.error(err.message))
    },
    async hashVerify(string, hash) {
      let token = await this.getToken()
      return await axios({
        method: 'POST',
        timeout: 5000,
        url: backend_url + 'utils/hash/verify',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
        data: { string: string, hash: hash },
      })
        .then((res) => {
          //console.log(res.data.data)
          return res.data.data
        })
        .catch((err) => console.error(err.message))
    },
    async getCurrentUserInfo() {
      let token = await this.getToken();
      return await axios({
        method: 'GET',
        timeout: 5000,
        url: backend_url + 'users/me',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      })
        .then((res) => {
          //console.log(res.data.data)
          return res.data.data
        })
        .catch((err) => console.error(err.message))
    },
    async requestPasswordReset(email) {
      let token = await this.getToken()
      return await axios({
        method: 'POST',
        timeout: 5000,
        url: backend_url + 'auth/password/request',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
        data: {
          email: email,
          reset_url: 'https://dev.supersites.io/reset-password/'
        },
      })
        .then((res) => {
          //console.log(res.data.data)
          return res.data.data
        })
        .catch((err) => console.error(err.message))
    },
    async doPasswordReset(token, password) {
      let _token = await this.getToken()
      return await axios({
        method: 'POST',
        timeout: 5000,
        url: backend_url + 'auth/password/reset',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + _token,
        },
        data: {
          token: token,
          password: password,
        },
      })
        .then((res) => {
          //console.log(res.data.data)
          return res.data.data
        })
        .catch((err) => console.error(err.message))
    },
    async getToken() {
      return this.$config[0].token
    },
    getShareUrl(media) {
      if (typeof window !== 'undefined') {
        switch (media) {
          case 'facebook':
            return (
              'https://www.facebook.com/sharer/sharer.php?u=' +
              window.location.href
            )
          case 'twitter':
            return (
              'https://twitter.com/intent/tweet?url=' + window.location.href
            )
          case 'linkedin':
            return (
              'https://www.linkedin.com/shareArticle?mini=true&url=' +
              window.location.href
            )
          default:
            return ''
        }
      }
    },
    async signInGoogleHandler() {
      let response = await this.signInGoogle()
      if (response.user) {
        console.log(response.user)
        this.$store.dispatch('setCurrentUserFB', response.user)
        this.$store.commit('closeAuthPopup')
        this.showNotification('You have successfully logged in!', 'success')
        console.log('You have successfully logged in!')
      }
    },
    async signInFacebookHandler() {
      let response = await this.signInFacebook()
      if (response.user) {
        console.log(response.user)
        this.$store.dispatch('setCurrentUserFB', response.user)
        this.$store.commit('closeAuthPopup')
        this.showNotification('You have successfully logged in!', 'success')
      }
    },
    async signInTwitterHandler() {
      let response = await this.signInTwitter()
      if (response.user) {
        console.log(response.user)
        this.$store.dispatch('setCurrentUserFB', response.user)
        this.$store.commit('closeAuthPopup')
        this.showNotification('You have successfully logged in!', 'success')
      }
    },
    async signInGoogle() {
      console.log('signInGoogle')
      try {
        if (!firebase) return
        var provider = new firebase.auth.GoogleAuthProvider()
        return await firebase.auth().signInWithPopup(provider)
      } catch (error) {
        //console.log(error);
        // Handle Errors here.
        var errorCode = error.code
        var errorMessage = error.message
        this.showNotification(errorMessage, 'error')
        // The email of the user's account used.
        var email = error.email
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential
        return error
      }
    },
    async signInFacebook() {
      console.log('signInFacebook')
      try {
        var provider = new firebase.auth.FacebookAuthProvider()
        if (!firebase) return
        return await firebase.auth().signInWithPopup(provider)
      } catch (error) {
        // Handle Errors here.
        var errorCode = error.code
        var errorMessage = error.message
        this.showNotification(errorMessage, 'error')
        // The email of the user's account used.
        var email = error.email
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential
        return error
      }
    },
    async signInTwitter() {
      console.log('signInTwitter')

      try {
        var provider = new firebase.auth.TwitterAuthProvider()
        if (!firebase) return
        return await firebase.auth().signInWithPopup(provider)
      } catch (error) {
        // Handle Errors here.
        var errorCode = error.code
        var errorMessage = error.message
        this.showNotification(errorMessage, 'error')
        // The email of the user's account used.
        var email = error.email
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential
        return error
      }
    },
    async logoutFB() {
      console.log('logout')
      this.$store.commit('logOutUserFB')
      return firebase
        .auth()
        .signOut()
        .then(function () {
          this.$store.commit('logOutUserFB')
        })
        .catch(function (error) {
          // An error happened.
        })
    },
    checkAuthentication() {
      if (!this.$store.state.isAuthenticatedFB) {
        this.$store.commit('showLoginPopup', true)
      }
    },
    async sendComments(post_id, comment_text, parent_comment_id, status) {
      console.log('sendComments')
      try {
        if (this.comment_text != '') {
          var currentUser = this.$store.state.currentUserFB
          var email = ''
          if (!currentUser.email) {
            email = currentUser.providerData[0].email // for twitter login
          } else {
            email = currentUser.email
          }
          let payload = {
            blog: post_id,
            comments: comment_text,
            parent_comment_id: parent_comment_id,
            status: status,
            user_email: email,
            user_name: currentUser.displayName,
            user_pic: currentUser.photoURL,
            likes: 0,
            //flag: 0,
          }
          let response = this.postItem('blog_comments', payload).catch((e) => {
            this.showNotification(e, 'error')
          })
          return response
        }
      } catch (error) {
        console.log(error)
        this.showNotification(error, 'error')
      }
    },
  },
  mounted() {
    const notyfConfig = new Notyf({
      types: [
        {
          className: 'success',
          type: 'success',
          icon: {
            className: 'notyf__icon--success',
            tagName: 'i',
          },
        },
        {
          className: 'info',
          type: 'info',
          background: '#3ec6dc',
          icon: {
            className: 'notyf__icon--info',
            tagName: 'i',
          },
        },
        {
          className: 'warning',
          type: 'warning',
          background: 'orange',
          icon: {
            className: 'notyf__icon--warning',
            tagName: 'i',
          },
        },
        {
          className: 'error',
          type: 'error',
          icon: {
            className: 'notyf__icon--error',
            tagName: 'i',
          },
        },
      ],
      position: {
        x: 'right',
        y: 'top',
      },
      duration: 3000,
      dismissible: false,
    })
    this.notyf = notyfConfig
  },
}
