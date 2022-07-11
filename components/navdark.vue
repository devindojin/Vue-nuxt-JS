<template>
  <nav class="navbar navbar-expand-lg navbar-custom sticky sticky-dark navbar-light" :class="{ 'fixed-top': sticky }">
     <Notice
      v-for="(notice,i) in $config[0].global.notices"
      :notice-text="notice.texts"
	  :visibility="notice.visibility"
	  :id="notice.id"
	  :notice_hide_settings="notice.hide_settings"
	  :days_months="notice.days_months"
	  v-bind:key="notice.id"
	  v-if="notice.visibility == 'everyone' &&  !$store.state.isAuthenticated"
    />
	<Notice
      v-for="(notice,i) in $config[0].global.notices"
      :notice-text="notice.texts"
	  :visibility="notice.visibility"
	  :id="notice.id"
	  :notice_hide_settings="notice.hide_settings"
	  :days_months="notice.days_months"
	  v-bind:key="notice.id"
	  v-if="notice.visibility == 'customers_only' &&  $store.state.isAuthenticated"
    />
	<Notice
      v-for="(notice,i) in $config[0].global.notices"
      :notice-text="notice.texts"
	  :visibility="notice.visibility"
	  :id="notice.id"
	  :notice_hide_settings="notice.hide_settings"
	  :days_months="notice.days_months"
	  v-bind:key="notice.id"
	  v-if="notice.visibility == 'specific_customer' &&  $store.state.isAuthenticated && checkCurrentUser(notice.customers)"
    />
    <div class="container">
      <!-- LOGO -->
      <nuxt-link class="navbar-brand logo text-uppercase" to="/">
        <img
          src="images/logo-light.png"
          class="logo-light"
          alt=""
          height="22"
        />
        <img src="images/logo-dark.png" class="logo-dark" alt="" height="22" />
      </nuxt-link>

      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarCollapse"
        aria-controls="navbarCollapse"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <i class="mdi mdi-menu"></i>
      </button>
      <div class="collapse navbar-collapse" id="navbarCollapse">
        <Navmenu />
      </div>
    </div>
    <slot></slot>
  </nav>
</template>

<script>
export default {
  props: {
    sticky: Boolean,
  },
  mounted() {
	let dismissObj = this.$store.state.noticeDismissedUntill;
	let noticeSession = sessionStorage.getItem('notices');
	console.log('mounted ', dismissObj,noticeSession)
	var that = this;
	setTimeout(function(){
		if(dismissObj.length>0){
			for(let i=0; i<dismissObj.length; i++ ){
				//console.log(dismissObj[i].id,dismissObj[i].timestamp)
				let currentTime = + new Date();
				console.log(currentTime)
				if(currentTime < dismissObj[i].timestamp){
					if(document.getElementById("notice-"+dismissObj[i].id)){
						console.log('hide '+ dismissObj[i].id );
						document.getElementById("notice-"+dismissObj[i].id).className += " hide";
					}
				}else{
					console.log('show '+ dismissObj[i].id );
					that.removeHideNotice(dismissObj[i].id);
				}
			}
		}
		if(noticeSession){
		    noticeSession = JSON.parse(noticeSession);
			for(let i=0; i<noticeSession.length; i++ ){
				console.log( 'hide '+ noticeSession[i].id );
				if(document.getElementById("notice-"+noticeSession[i].id)){
					document.getElementById( "notice-"+noticeSession[i].id ).className += " hide";
				}
			}
		}
	},400)
  },
  methods: {
    removeHideNotice(id){
		let dismissObj = this.$store.state.noticeDismissedUntill;
		if(dismissObj.length>0){
			let newObj = dismissObj.filter(function(d){
				console.log(d.id)
				return (d.id != id)?true:false
				//return true;
			});
			console.log(newObj);
			this.$store.commit('updateNotice', newObj )
		}
	},
	checkCurrentUser(data){
		if(data.length > 0){
			for(let i=0;i<data.length;i++){
				//console.log(data[i].directus_users_id)
				if( data[i].directus_users_id == this.$store.state.currentUser.id ){
					return true;
				}
			}
		}
		return false;
	},
	findWithAttr(array, attr, value) {
      for (var i = 0; i < array.length; i += 1) {
        if (array[i][attr] === value) {
          return i
        }
      }
      return -1
    },
  },
  computed: {
  },
}
</script>

<style lang="scss" scoped>
</style>