import Vue from 'vue'
Vue.mixin({
  methods: {
    getPageMeta(data, url, pageType="") { 
      if (data.seo) {
        let description = "";let seoTitle = "";
        if(pageType !=""){
          seoTitle = data.seo.seo_title ? data.seo.seo_title + " - " + pageType + " | Supersites Inc.":''; 
          description = "A collection of our articles on "+ pageType;
        }else{
           seoTitle = data.seo.seo_title ? data.seo.seo_title + " | Supersites Inc.":'';
           description = data.seo.seo_description ? data.seo.seo_description : '';
        }
        return [
          {
            hid: 'title',
            name: 'title',
            content: seoTitle,
          },
          {
            hid: 'description',
            name: 'description',
            content: description,
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
            content: seoTitle,
          },
          {
            property: 'og:description',
            content: description,
          },
          {
            property: 'og:url',
            content: url,
          },
          {
            property: 'og:site_name',
            content: 'Supersites',
          },
          {
            property: 'og:image',
            content: data.seo.seo_image
              ? this.getAssetsUrl() + data.seo.seo_image
              : this.getAssetsUrl() +
              this.$config[0].global_settings.global_seo.seo_image,
          },
          {
            property: 'og:image:secure_url',
            content: data.seo.seo_image
              ? this.getAssetsUrl() + data.seo.seo_image
              : this.getAssetsUrl() +
                this.$config[0].global_settings.global_seo.seo_image,
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
            content: description,
          },
          {
            name: 'twitter:title',
            content: seoTitle,
          },
          {
            name: 'twitter:image',
            content: data.seo.seo_image
              ? this.getAssetsUrl() + data.seo.seo_image
              : this.getAssetsUrl() +
              this.$config[0].global_settings.global_seo.seo_image,
          },
          {
            name: 'author',
            content: 'Prateek Chandra',
          },
          {
            property: 'article:published_time',
            content: data.date_created,
          },
          {
            property: 'article:modified_time',
            content: data.date_updated,
          },
          {
            property: 'og:updated_time',
            content: data.date_updated,
          },
          {
            property: 'article:updated_time',
            content: data.date_updated,
          },
        ]
      }
      return [
        {
          hid: 'title',
          name: 'title',
          content: this.$config[0].global_settings.global_seo
            .seo_title + " | Supersites Inc.",
        },
        {
          hid: 'description',
          name: 'description',
          content: this.$config[0].global_settings.global_seo
            .seo_description,
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
          content: this.$config[0].global_settings.global_seo
            .seo_title + " | Supersites Inc.",
        },
        {
          property: 'og:description',
          content: this.$config[0].global_settings.global_seo
            .seo_description,
        },
        {
          property: 'og:url',
          content: url,
        },
        {
          property: 'og:site_name',
          content: 'Supersites',
        },
        {
          property: 'og:image',
          content:
            this.getAssetsUrl() +
            this.$config[0].global_settings.global_seo.seo_image,
        },
        {
          property: 'og:image:secure_url',
          content:
            this.getAssetsUrl() +
            this.$config[0].global_settings.global_seo.seo_image,
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
          content: this.$config[0].global_settings.global_seo
            .seo_description,
        },
        {
          name: 'twitter:title',
          content: this.$config[0].global_settings.global_seo
            .seo_title + " | Supersites Inc.",
        },
        {
          name: 'twitter:image',
          content:
            this.getAssetsUrl() +
            this.$config[0].global_settings.global_seo.seo_image,
        },
        {
          name: 'author',
          content: 'Prateek Chandra',
        },
        {
          property: 'article:published_time',
          content: data.date_created ? data.date_created:'2021-04-27T05:44:45Z',
        },
        {
          property: 'article:modified_time',
          content: data.date_updated ? data.date_updated : '2021-10-04T10:30:59Z',
        },
        {
          property: 'og:updated_time',
          content: data.date_updated ? data.date_updated : '2021-10-04T10:30:59Z',
        },
        {
          property: 'article:updated_time',
          content: data.date_updated ? data.date_updated : '2021-10-04T10:30:59Z',
        },
      ]
    },
  },
})
