<template>
  <client-only>
    <div
      class="auth-popup"
      @click.prevent.stop="$store.commit('closeAuthPopup')"
    >
      <AuthPopup>
        <div class="signup-form">
          <h2>Sign up now</h2>
          <p>
            Already have an account?
            <a
              href="#"
              class="anchor"
              @click.prevent="
                $store.commit('closeAuthPopup'), $store.commit('showLoginPopup')
              "
            >
              Sign in
            </a>
          </p>
          <a
            href="#"
            @click.prevent="signInGoogleHandler"
            class="btn btn-social"
          >
            <svg
              id="google-icon"
              xmlns="http://www.w3.org/2000/svg"
              width="68"
              height="68"
              viewBox="0 0 68 68"
            >
              <circle
                id="Ellipse_10"
                data-name="Ellipse 10"
                cx="34"
                cy="34"
                r="34"
                fill="none"
              />
              <g id="search" transform="translate(22 22)">
                <path
                  id="Path_702"
                  data-name="Path 702"
                  d="M5.277,146.227l-.829,3.094-3.029.064a11.926,11.926,0,0,1-.088-11.117h0l2.7.494,1.181,2.681a7.1,7.1,0,0,0,.067,4.784Z"
                  transform="translate(0 -131.838)"
                  fill="#686E9A"
                />
                <path
                  id="Path_703"
                  data-name="Path 703"
                  d="M273.063,208.176a11.9,11.9,0,0,1-4.244,11.508h0l-3.4-.173-.481-3a7.1,7.1,0,0,0,3.053-3.623h-6.366v-4.71h11.435Z"
                  transform="translate(-249.461 -198.495)"
                  fill="#686E9A"
                />
                <path
                  id="Path_704"
                  data-name="Path 704"
                  d="M48.448,316.209h0a11.909,11.909,0,0,1-17.939-3.642l3.858-3.158a7.08,7.08,0,0,0,10.2,3.625Z"
                  transform="translate(-29.09 -295.02)"
                  fill="#686E9A"
                />
                <path
                  id="Path_705"
                  data-name="Path 705"
                  d="M46.8,2.741,42.94,5.9A7.079,7.079,0,0,0,32.5,9.605L28.625,6.43h0A11.907,11.907,0,0,1,46.8,2.741Z"
                  transform="translate(-27.293)"
                  fill="#686E9A"
                />
              </g>
            </svg>
            <span>Sign up with Google</span>
          </a>
          <a
            href="#"
            @click.prevent="signInFacebookHandler"
            class="btn btn-social"
          >
            <svg
              id="Facebook"
              xmlns="http://www.w3.org/2000/svg"
              width="68"
              height="68"
              viewBox="0 0 68 68"
            >
              <circle
                id="Ellipse_10"
                data-name="Ellipse 10"
                cx="34"
                cy="34"
                r="34"
                fill="none"
              />
              <path
                id="Facebook-2"
                data-name="Facebook"
                d="M15.188,36.678h5.951v-14.4h3.969l.527-4.962h-4.5l.005-2.485c0-1.294.124-1.987,1.98-1.987h2.482V7.877H21.636c-4.769,0-6.448,2.407-6.448,6.457v2.98H12.215v4.964h2.973v14.4Z"
                transform="translate(15.24 11.723)"
                fill="#686E9A"
              />
            </svg>
            <span>Sign up with Facebook</span>
          </a>
          <a
            href="#"
            @click.prevent="signInTwitterHandler"
            class="btn btn-social"
          >
            <svg
              id="Log_in_with_Twitter"
              data-name="Log in with Twitter"
              xmlns="http://www.w3.org/2000/svg"
              width="68"
              height="68"
              viewBox="0 0 68 68"
            >
              <circle
                id="Ellipse_12"
                data-name="Ellipse 12"
                cx="34"
                cy="34"
                r="34"
                fill="none"
              />
              <path
                id="Twitter"
                d="M25.557,9.275A6.015,6.015,0,0,0,21.5,15.328l.063,1.03-1.04-.126a16.9,16.9,0,0,1-9.894-4.875L9.26,9.989,8.907,11a6.075,6.075,0,0,0,1.288,6.221c.831.884.644,1.009-.79.483a2.448,2.448,0,0,0-.977-.231,7.563,7.563,0,0,0,.748,2.816,6.709,6.709,0,0,0,2.848,2.69l1.02.483-1.2.02c-1.164,0-1.2.02-1.081.464a6.294,6.294,0,0,0,3.886,3.448l1.288.44L14.81,28.5a11.648,11.648,0,0,1-5.57,1.555,6.135,6.135,0,0,0-1.706.168,15.862,15.862,0,0,0,4.012,1.849A17.542,17.542,0,0,0,25.182,30.52,18.288,18.288,0,0,0,32.1,22.366a21.69,21.69,0,0,0,1.414-6.3c0-.967.063-1.093,1.227-2.248A13.579,13.579,0,0,0,36.2,12.2c.209-.4.187-.4-.873-.042-1.767.63-2.017.547-1.144-.4A6.127,6.127,0,0,0,35.6,9.508c0-.063-.311.042-.666.231a11.462,11.462,0,0,1-1.828.714l-1.121.359-1.02-.695a8.462,8.462,0,0,0-1.767-.924,7.087,7.087,0,0,0-3.636.083Z"
                transform="translate(12.081 13.236)"
                fill="#686E9A"
              />
            </svg>
            <span>Sign up with Twitter</span>
          </a>
        </div>
      </AuthPopup>
    </div>
  </client-only>
</template>

<script>
export default {}
</script>
