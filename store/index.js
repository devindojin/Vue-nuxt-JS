export default {
  strict: false,
  state() {
    return {
      noticeDismissed: false,
      isAuthenticated: false,
      isAuthenticatedFB: false,
      currentUser: [],
      currentUserFB: [],
      noticeDismissedUntill: [],
      hideOverflow: false,
      scrollPos: 0,
      themeInCart: null,
      activeProject: null,
      showLogin: false,
      showSignup: false,
    }
  },
  mutations: {
    hideOverflow(state, payload) {
      if (payload) state.scrollPos = window.scrollY
      state.hideOverflow = payload
    },
    setLastDismissTime(state, timestamp) {
      state.lastDismissed = timestamp
    },
    authenticateUser(state, user) {
      state.currentUser = user
      state.isAuthenticated = true
    },
	authenticateUserFB(state, user) {
      state.currentUserFB = user
      state.isAuthenticatedFB = true
    },
    logOutUser(state) {
      state.currentUser = ''
      state.isAuthenticated = false
    },
	logOutUserFB(state) {
      state.currentUserFB = ''
      state.isAuthenticatedFB = false
    },
    selectTheme(state, payload) {
      state.themeInCart = payload
    },
    dismissNotice(state, payload) {
      //state.noticeDismissed = true
      //console.log(payload)
      state.noticeDismissedUntill.push(payload)
    },
	updateNotice(state, payload) {
      state.noticeDismissedUntill= payload;
    },
    activatedProject(state, payload) {
      state.activeProject = payload
    },
    closeAuthPopup(state) {
      state.showLogin = false
      state.showSignup = false
    },
    showLoginPopup(state) {
      state.showLogin = true
    },
    showSignupPopup(state) {
      state.showSignup = true
    },
  },
  actions: {
    setCurrentUser({ commit }, user) {
      commit('authenticateUser', user)
    },
	setCurrentUserFB({ commit }, user) {
      commit('authenticateUserFB', user)
    },
  },
}
