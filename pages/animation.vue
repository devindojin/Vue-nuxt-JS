<template>
  <div>
    <Header theme="light" :sticky="true" />
    <section class="animation my-5 py-5" :class="{ isReady }">
      <div class="container text-center mt-5 pt-5">
        <h1 class="mb-4">No more DIY Websites<br />Go Pro for Free</h1>
        <a href="#" class="btn btn-primary btn-round">Browse themes</a>
      </div>
      <div class="hero-cards" :class="{ isReady }">
        <div class="hero-card-item" v-for="card in 5">
          <div class="wrapper">
            <div class="img">
              <img :src="`animation/${card}.png`" alt="" />
            </div>
          </div>
        </div>
      </div>
    </section>
    <Footer bg="bg-white" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      isReady: false,
    }
  },
  mounted() {
    console.log('mounted')
    let fetch = setInterval(() => {
      if (document.readyState == 'complete') {
        this.isReady = true
        clearInterval(fetch)
      }
    }, 300)
  },

  head() {
    if (this.$config[0].global.homePage) {
      return {
        meta: [
          {
            hid: 'title',
            name: 'title',
            content: this.$config[0].global.homePage.seo_title,
          },
          {
            hid: 'description',
            name: 'description',
            content: this.$config[0].global.homePage.seo_description,
          },
          {
            property: 'og:locale',
            content: 'en_US',
          },
          {
            property: 'og:type',
            content: 'article',
          },
          {
            property: 'og:title',
            content: this.$config[0].global.homePage.seo_title,
          },
          {
            property: 'og:description',
            content: this.$config[0].global.homePage.seo_description,
          },
          {
            property: 'og:url',
            content: 'https://supersites.io/',
          },
          {
            property: 'og:site_name',
            content: 'Supersites',
          },
          {
            property: 'og:image',
            content:
              this.getAssetsUrl() + this.$config[0].global.homePage.seo_image,
          },
          {
            property: 'og:image:secure_url',
            content:
              this.getAssetsUrl() + this.$config[0].global.homePage.seo_image,
          },
          {
            property: 'og:image:width',
            content: '1200',
          },
          {
            property: 'og:image:height',
            content: '630',
          },
          {
            name: 'twitter:card',
            content: 'summary_large_image',
          },
          {
            name: 'twitter:description',
            content: this.$config[0].global.homePage.seo_description,
          },
          {
            name: 'twitter:title',
            content: this.$config[0].global.homePage.seo_title,
          },
          {
            name: 'twitter:image',
            content:
              this.getAssetsUrl() + this.$config[0].global.homePage.seo_image,
          },
          {
            name: 'author',
            content: 'Prateek Chandra',
          },
          {
            property: 'article:published_time',
            content: this.$config[0].global.homePage.date_created,
          },
          {
            property: 'article:modified_time',
            content: this.$config[0].global.homePage.date_updated,
          },
          {
            property: 'og:updated_time',
            content: this.$config[0].global.homePage.date_updated,
          },
          {
            property: 'article:updated_time',
            content: this.$config[0].global.homePage.date_updated,
          },
        ],
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.animation {
  h1 {
    opacity: 0;
    transition: 0.5s all 0.5s;
  }
  .btn-primary {
    opacity: 0;
    transition: 0.5s all 0.8s;
  }
  &.isReady {
    h1,
    .btn-primary {
      opacity: 1;
    }
  }
}
.hero-cards {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 0 15px;
  margin-top: 120px;
  .hero-card-item {
    position: relative;
    flex: 0 0 20%;
    padding: 0 15px;
    &:nth-child(1),
    &:nth-child(5) {
      //   top: -40px;
    }
    &:nth-child(2),
    &:nth-child(4) {
      //   top: 40px;
    }
    .wrapper {
      position: relative;
      img {
        width: 100%;
      }
      .img {
        width: 100%;
        // clip-path: polygon(0 100%, 100% 100%, 100% 100%, 0% 100%);
        transform: translate(0, 30px) scale(0.9);
        transition: 1s all 0.5s;
        opacity: 0;
      }
    }
    &:nth-child(1) {
      .wrapper {
        animation: 10s bounceimg 2s forwards infinite ease;

        .img {
          transition-delay: 1.3s;
        }
      }
    }
    &:nth-child(2) {
      .wrapper {
        animation: 10s bounceimg 7s forwards infinite ease;

        .img {
          transition-delay: 1.1s;
        }
      }
    }
    &:nth-child(3) {
      .wrapper {
        animation: 10s bounceimg 2s forwards infinite ease;

        .img {
          transition-delay: 1.7s;
        }
      }
    }
    &:nth-child(4) {
      .wrapper {
        animation: 10s bounceimg 7s forwards infinite ease;

        .img {
          transition-delay: 1.5s;
        }
      }
    }
    &:nth-child(5) {
      .wrapper {
        animation: 10s bounceimg 2s forwards infinite ease;

        .img {
          transition-delay: 1.8s;
        }
      }
    }
  }
  &.isReady {
    .hero-card-item {
      .wrapper {
        .img {
          transform: translate(0, 0) scale(1);
          opacity: 1;
          //   clip-path: polygon(0 0%, 100% 0%, 100% 100%, 0% 100%);
        }
      }
    }
  }
}
@keyframes bounceimg {
  0% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(0, -40px);
  }
  100% {
    transform: translate(0, 0);
  }
}
</style>