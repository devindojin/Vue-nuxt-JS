<template>
  <section v-if="!loading">
    <div
      class="container mt-lg-4 pt-lg-3"
      v-if="activeSection == 0 && !editMode"
    >
      <div class="row">
        <div class="col-lg-6">
          <h1 class="h2">{{ $config[0].questionnaire[0].title }}</h1>
        </div>
      </div>
      <div class="row">
        <div
          class="col-lg-8 text-muted body3 mt-4 pt-1"
          v-html="$config[0].questionnaire[0].description"
        ></div>
      </div>
    </div>
    <div class="container" v-if="editMode">
      <div class="row">
        <div class="col-lg-9">
          <h1 class="h2">
            Website Brief - {{ $props.project.project_name }} (ID
            {{ $props.project.id }} )
          </h1>
        </div>
      </div>
    </div>
    <div
      class="container"
      :class="editMode ? 'pt-1 pt-lg-5 mt-1' : 'pt-lg-5 mt-5'"
    >
      <div
        class="custom-form"
        v-if="showForm"
        :class="editMode ? '' : 'py-5 mb-5'"
      >
        <form
          class="form-questionnaire"
          id="myform"
          action="#"
          method="POST"
          @submit.prevent="submit"
        >
          <!--- Personal section End--->

          <div
            class="breif-section mt-4 pt-2 mt-lg-5 pt-lg-4"
            :id="'section-' + i"
            :class="{ active: activeSection == i, showAll: editMode }"
            v-for="(section, i) in $config[0].questionnaire[0].section"
          >
            <div v-if="section.title == 'Personal Info'">
              <div class="row">
                <div class="col-lg-6">
                  <p class="text-muted f-14" v-if="!editMode">
                    {{ activeSection + 1 }} of
                    {{ $config[0].questionnaire[0].section.length }} steps
                  </p>
                  <p class="text-muted f-14" v-if="editMode">
                    {{ i + 1 }} of
                    {{ $config[0].questionnaire[0].section.length }} steps
                  </p>
                  <div
                    class="
                      d-flex
                      justify-content-between
                      align-items-start
                      mb-1 mb-md-3
                    "
                  >
                    <h2 class="h3">{{ section.title }}</h2>
                    <button
                      type="button"
                      :disabled="submitStatus === 'PENDING'"
                      :id="'edit-' + i"
                      class="ss-btn ss-btn-gray toggleBtn active"
                      @click.prevent="editAction(i)"
                      v-if="editMode"
                    >
                      {{ saveMessage }}
                    </button>
                    <button
                      type="button"
                      :id="'save-' + i"
                      class="ss-btn ss-btn-gray toggleBtn"
                      @click.prevent="saveAction(i)"
                      v-if="editMode"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-lg-6">
                  <div class="form-group mt-3">
                    <input
                      name="company_name"
                      class="form-control"
                      type="text"
                      v-model.trim="$v.company_name.$model"
                      :class="{ warning: $v.company_name.$error }"
                      :disabled="saveMode"
                    />
                    <label class="contact-lable static">Company Name</label>

                    <span
                      class="form-warning"
                      v-if="!$v.company_name.required && $v.company_name.$error"
                      >Company Name is required</span
                    >
                    <span class="form-warning" v-if="!$v.company_name.minLength"
                      >Company Name must have at least
                      {{ $v.company_name.$params.minLength.min }}
                      letters.</span
                    >
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-lg-6">
                  <div class="form-group mt-3">
                    <input
                      name="project_name"
                      class="form-control"
                      type="text"
                      v-model.trim="$v.project_name.$model"
                      :class="{ warning: $v.project_name.$error }"
                      :disabled="saveMode"
                    />
                    <label class="contact-lable static">Project Name</label>

                    <span
                      class="form-warning"
                      v-if="!$v.project_name.required && $v.project_name.$error"
                      >Project Name is required</span
                    >
                    <span class="form-warning" v-if="!$v.project_name.minLength"
                      >Project Name must have at least
                      {{ $v.project_name.$params.minLength.min }}
                      letters.</span
                    >
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-lg-6">
                  <div class="form-group mt-3">
                    <input
                      name="website_url"
                      class="form-control"
                      type="text"
                      v-model.trim="website_url"
                      :disabled="saveMode"
                    />
                    <label class="contact-lable static">Website Url</label>
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-lg-6">
                  <div class="form-group mt-3">
                    <input
                      name="first_name"
                      class="form-control"
                      type="text"
                      v-model.trim="$v.first_name.$model"
                      :class="{ warning: $v.first_name.$error }"
                      :disabled="saveMode"
                    />
                    <label class="contact-lable static">First Name</label>
                    <span
                      class="form-warning"
                      v-if="!$v.first_name.required && $v.first_name.$error"
                      >First Name is required</span
                    >
                    <span class="form-warning" v-if="!$v.first_name.minLength"
                      >First Name must have at least
                      {{ $v.first_name.$params.minLength.min }}
                      letters.</span
                    >
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-lg-6">
                  <div class="form-group mt-3">
                    <input
                      name="last_name"
                      class="form-control"
                      type="text"
                      v-model.trim="$v.last_name.$model"
                      :class="{ warning: $v.last_name.$error }"
                      :disabled="saveMode"
                    />
                    <label class="contact-lable static">Last Name</label>
                    <span
                      class="form-warning"
                      v-if="!$v.last_name.required && $v.last_name.$error"
                      >Last Name is required</span
                    >
                    <span class="form-warning" v-if="!$v.last_name.minLength"
                      >Last Name must have at least
                      {{ $v.last_name.$params.minLength.min }}
                      letters.</span
                    >
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-lg-6">
                  <div class="form-group mt-3">
                    <input
                      name="email"
                      class="form-control"
                      type="text"
                      v-model.trim="$v.email.$model"
                      :class="{ warning: $v.email.$error }"
                      :disabled="saveMode"
                    />
                    <label class="contact-lable static">Email</label>
                    <span
                      class="form-warning"
                      v-if="!$v.email.required && $v.email.$error"
                      >Email is required</span
                    >
                    <span class="form-warning" v-if="!$v.email.email"
                      >Invalid email</span
                    >
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-lg-6">
                  <div class="form-group mt-3">
                    <input
                      name="phone"
                      class="form-control"
                      type="text"
                      v-mask="'(###) ### ####'"
                      v-model.trim="$v.phone.$model"
                      :class="{ warning: $v.phone.$error }"
                      :disabled="saveMode"
                    />
                    <label class="contact-lable static">Phone</label>
                    <span
                      class="form-warning"
                      v-if="!$v.phone.required && $v.phone.$error"
                      >Phone is required</span
                    >
                    <span class="form-warning" v-if="!$v.phone.phoneFormat"
                      >10 digits. No special characters. No Country Code.</span
                    >
                  </div>
                </div>
              </div>
            </div>
            <div v-if="section.title != 'Personal Info'">
              <div class="row">
                <div class="col-lg-6">
                  <p class="text-muted f-14" v-if="!editMode">
                    {{ activeSection + 1 }} of
                    {{ $config[0].questionnaire[0].section.length }} steps
                  </p>
                  <p class="text-muted f-14" v-if="editMode">
                    {{ i + 1 }} of
                    {{ $config[0].questionnaire[0].section.length }} steps
                  </p>
                  <div
                    class="
                      d-flex
                      justify-content-between
                      align-items-start
                      mb-1 mb-md-3
                    "
                  >
                    <h2 class="h3">{{ section.title }}</h2>
                    <button
                      type="button"
                      :disabled="submitStatus === 'PENDING'"
                      :id="'edit-' + i"
                      class="ss-btn ss-btn-gray toggleBtn active"
                      @click.prevent="editAction(i)"
                      v-if="editMode"
                    >
                      {{ saveMessage }}
                    </button>
                    <button
                      type="button"
                      :id="'save-' + i"
                      class="ss-btn ss-btn-gray toggleBtn"
                      @click.prevent="saveAction(i)"
                      v-if="editMode"
                    >
                      Save
                    </button>
                  </div>
                  <div v-for="(questions, j) in section.questions">
                    <div class="form-group mt-3">
                      <label class="body2 mb-3 mt-4"
                        ><strong>{{ questions.question }}</strong></label
                      >
                      <input
                        :name="
                          questions.question.toLowerCase().replace(/ /g, '_')
                        "
                        :value="
                          fetchValue(
                            questions.question.toLowerCase().replace(/ /g, '_')
                          )
                        "
                        class="form-control question-input"
                        type="text"
                        v-if="questions.type == 'Textbox'"
                        :disabled="saveMode"
                      />
                      <textarea
                        class="form-control question-input"
                        :name="
                          questions.question.toLowerCase().replace(/ /g, '_')
                        "
                        size="20"
                        rows="5"
                        v-if="questions.type == 'Textarea'"
                        :disabled="saveMode"
                        >{{
                          fetchValue(
                            questions.question.toLowerCase().replace(/ /g, '_')
                          )
                        }}</textarea
                      >
                      <div
                        class="options"
                        v-for="(options, k) in questions.options"
                        v-if="questions.type == 'Radio'"
                      >
                        <label>
                          <input
                            type="radio"
                            :disabled="saveMode"
                            class="form-radio question-input"
                            :name="
                              questions.question
                                .toLowerCase()
                                .replace(/ /g, '_')
                            "
                            :value="options.option"
                            :checked="
                              radioOption(
                                questions.question
                                  .toLowerCase()
                                  .replace(/ /g, '_'),
                                options.option
                              )
                            "
                          />
                          <span class="f-18 text-muted">
                            {{ options.option }}
                          </span>
                        </label>
                      </div>
                      <div
                        class="options"
                        v-for="(options, k) in questions.options"
                        v-if="questions.type == 'Checkbox'"
                      >
                        <label>
                          <input
                            type="checkbox"
                            :disabled="saveMode"
                            class="form-checkbox question-input"
                            :name="
                              questions.question
                                .toLowerCase()
                                .replace(/ /g, '_')
                            "
                            :value="options.option"
                            :checked="
                              checkboxOption(
                                questions.question
                                  .toLowerCase()
                                  .replace(/ /g, '_'),
                                options.option
                              )
                            "
                          />
                          <span class="f-18 text-muted">
                            {{ options.option }}</span
                          >
                        </label>
                      </div>

                      <div id="upload-div" v-if="questions.type == 'Upload'">
                        <div
                          class="upload-div"
                          :id="'row-' + i"
                          v-bind:key="i"
                          v-for="(rows, i) in uploadInputs"
                        >
                          <input
                            v-for="input in rows.data"
                            :class="input.className"
                            :name="input.name"
                            :disabled="saveMode"
                            size="20"
                            :type="input.type"
                            ref="upload_file"
                            v-on:change="validate_file()"
                          />
                          <svg
                            @click.prevent="remove(i)"
                            v-bind:class="{ active: !rows.remove }"
                            xmlns="http://www.w3.org/2000/svg"
                            width="28"
                            height="28"
                            viewBox="0 0 28 28"
                          >
                            <g id="add-24px" transform="translate(-2 -2)">
                              <path
                                id="Контур_4599"
                                d="M2,2H30V30H2Z"
                                fill="none"
                              ></path>
                              <path
                                id="Контур_4600"
                                d="M24.2,17.2h-7v7H14.9v-7h-7V14.9h7v-7h2.3v7h7Z"
                              ></path>
                            </g>
                          </svg>
                        </div>
                      </div>
                      <button
                        class="btn add-more"
                        @click.prevent="clone()"
                        v-if="questions.type == 'Upload'"
                        :disabled="saveMode"
                      >
                        Add More
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div
                class="row files-div"
                v-if="
                  i + 1 == $config[0].questionnaire[0].section.length &&
                  filesData.length > 0
                "
              >
                <div
                  class="file-wrap"
                  :id="'file-' + files.id"
                  v-for="(files, m) in filesData"
                >
                  <div class="file">
                    <img
                      v-if="files.type == 'image/jpeg'"
                      :src="
                        'https://admin.supersites.io/assets/' +
                        files.id +
                        '?fit=contain&width=100&height=100'
                      "
                    />
                    <img
                      v-if="files.type != 'image/jpeg'"
                      src="https://via.placeholder.com/100x100.png?text=File"
                    />
                    <div class="filename">
                      <a
                        :href="
                          'https://admin.supersites.io/assets/' +
                          files.id +
                          '?download'
                        "
                        target="_blank"
                        >{{ files.name }}</a
                      >
                    </div>
                  </div>
                  <div class="remove">
                    <svg
                      @click.prevent="deleteFile(files.id, files.key, m)"
                      xmlns="http://www.w3.org/2000/svg"
                      width="28"
                      height="28"
                      viewBox="0 0 28 28"
                    >
                      <g id="add-24px" transform="translate(-2 -2)">
                        <path
                          id="Контур_4599"
                          d="M2,2H30V30H2Z"
                          fill="none"
                        ></path>
                        <path
                          id="Контур_4600"
                          d="M24.2,17.2h-7v7H14.9v-7h-7V14.9h7v-7h2.3v7h7Z"
                        ></path>
                      </g>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-lg-6 mt-3">
              <div class="d-flex">
                <div class="w-50 pr-1">
                  <button
                    type="button"
                    :disabled="submitStatus === 'PENDING'"
                    class="ss-btn ss-btn-auto ss-btn-gray ss-btn-large w-100"
                    @click.prevent="saveDraft()"
                    v-if="!editMode"
                  >
                    {{ draftMessage }}
                  </button>
                </div>
                <div class="w-50 pl-1">
                  <input
                    class="submitBnt ss-btn ss-btn-auto ss-btn-primary w-100"
                    v-bind:class="{ active: lastSection }"
                    type="submit"
                    name="submit"
                    :value="submitMessage"
                    :disabled="submitStatus === 'PENDING' || editMode"
                    v-if="!editMode"
                  />
                  <input
                    class="submitBnt ss-btn ss-btn-auto ss-btn-primary w-100"
                    value="Next step"
                    type="button"
                    name="next"
                    v-scroll-to="{ el: '#myform', offset: -100 }"
                    @click.prevent="next()"
                    v-bind:class="{ active: !lastSection }"
                    v-if="!editMode"
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div class="custom-form py-5 mb-5" v-if="!showForm">
        <div class="row">
          <div class="col-lg-6 mt-3">
            <h2 class="h2">
              Thank You, <span id="fname">{{ first_name }}</span
              >!<br />
              We'll be in touch soon.
            </h2>
            <div class="alert alert-success d-flex py-3 px-4" role="alert">
              <div>
                <svg
                  id="check_circle_outline_black_24dp"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    id="Path_1519"
                    data-name="Path 1519"
                    d="M0,0H24V24H0Z"
                    fill="none"
                  />
                  <path
                    id="Path_1520"
                    data-name="Path 1520"
                    d="M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8.011,8.011,0,0,1,12,20ZM15.88,8.29,10,14.17,8.12,12.29A1,1,0,0,0,6.71,13.7L9.3,16.29a1,1,0,0,0,1.41,0L17.3,9.7a1,1,0,0,0,0-1.41,1.008,1.008,0,0,0-1.42,0Z"
                    fill="#00c897"
                  />
                </svg>
              </div>
              <div class="pl-2">
                <span> Message has been sent</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
//import axios from 'axios'
import Vue from 'vue'
import Vuelidate from 'vuelidate'
import VueMask from 'v-mask'
const VueScrollTo = require('vue-scrollto')
Vue.use(VueScrollTo)
Vue.use(Vuelidate)
Vue.use(VueMask)
import {
  required,
  email,
  minLength,
  numeric,
  helpers,
} from 'vuelidate/lib/validators'
const phoneFormat = helpers.regex(
  'phoneFormat',
  /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/
)
export default {
  props: {
    project: [Array, Object],
  },
  data() {
    return {
      loading: true,
      briefs: [],
      filesData: [],
      breif_id: 0,
      pdf_id: 0,
      locked: -1,
      editMode: false,
      saveMode: false,
      draft: false,
      totalSection: 0,
      activeSection: 0,
      lastSection: false,
      showForm: true,
      submitStatus: null,
      company_name: '',
      project_name: this.$props.project.project_name,
      website_url: '',
      first_name: this.$store.state.currentUser.first_name,
      last_name: this.$store.state.currentUser.last_name,
      email: this.$store.state.currentUser.email,
      phone: '',
      status: 'draft',
      submitMessage: 'Submit',
      draftMessage: 'Save draft',
      saveMessage: 'Edit',
      answers: [],
      savedAnswers: [],
      stepsArr: [],
      stepData: [],
      checkboxes: {},
      uploadInputs: [
        {
          remove: false,
          data: [
            {
              type: 'text',
              name: 'file_name',
              className: 'form-control file-input file-name',
            },
            {
              type: 'file',
              name: 'files',
              className: 'form-control file-input file-upload',
            },
          ],
        },
      ],
    }
  },
  created() {
    this.totalSection = this.$config[0].questionnaire[0].section.length
    if (this.totalSection > 0) {
      for (
        let i = 0;
        i < this.$config[0].questionnaire[0].section.length;
        i++
      ) {
        this.stepsArr[i] = this.$config[0].questionnaire[0].section[i].title
      }
    }
    //console.log(this.stepsArr)
  },
  computed: {},
  mounted() {
    //console.log(this.$props.project)
  },
  async fetch() {
    console.log('fetch')
    let token = await this.getToken()
    const briefsRes = await fetch(
      'https://admin.supersites.io/items/questionnaire_submissions/?filter[project][_eq]=' +
        this.$route.params.slug +
        '&access_token=' +
        token
    )
    const br = await briefsRes.json()
    this.briefs = br.data
    //console.log(this.briefs);
    this.loading = false
    if (this.briefs.length) {
      if (this.briefs[0].status == 'completed') {
        this.editMode = true
        this.saveMode = true
        this.$emit('editMode', true)
      } else {
        this.$emit('editMode', false)
      }
      this.breif_id = this.briefs[0].id
      this.company_name = this.briefs[0].company_name
      //this.project_name =  this.briefs[0].project_name
      this.website_url = this.briefs[0].website_url
      this.phone = this.briefs[0].phone
      this.savedAnswers = this.briefs[0].questions
      this.status = this.briefs[0].status
      this.pdf_id = this.briefs[0].pdf_id
      this.showFiles()
    }
  },
  validations: {
    company_name: {
      required,
      minLength: minLength(2),
    },
    project_name: {
      required,
      minLength: minLength(2),
    },
    first_name: {
      required,
      minLength: minLength(2),
    },
    last_name: {
      required,
      minLength: minLength(2),
    },
    phone: {
      required,
      phoneFormat,
    },
    email: {
      required,
      email,
    },
  },
  methods: {
    editAction(index) {
      console.log(index)
      let section = document.getElementsByClassName('breif-section')
      for (let i = 0; i < section.length; i++) {
        section[i].classList.remove('editable')
      }
      let element = document.getElementById('section-' + index)
      element.classList.add('editable')

      let ebtn = document.getElementById('edit-' + index)
      ebtn.classList.remove('active')

      let btnEle = document.getElementById('save-' + index)
      btnEle.classList.add('active')
      //this.saveMode = false;
      let input = document
        .getElementById('section-' + index)
        .getElementsByTagName('input')
      if (input.length > 0) {
        for (let i = 0; i < input.length; i++) {
          input[i].disabled = false
        }
      }
      let textarea = document
        .getElementById('section-' + index)
        .getElementsByTagName('textarea')
      if (textarea.length > 0) {
        for (let i = 0; i < textarea.length; i++) {
          textarea[i].disabled = false
        }
      }
      let btns = document
        .getElementById('section-' + index)
        .getElementsByClassName('add-more')
      if (btns.length > 0) {
        for (let i = 0; i < btns.length; i++) {
          btns[i].disabled = false
        }
      }
    },
    saveAction(index) {
      this.$v.$touch()
      console.log(this.$v.$invalid)
      if (this.$v.$invalid) {
        return false
      }
      this.saveMessage = 'Please Wait...'
      this.submitStatus = 'PENDING'
      let section = document.getElementsByClassName('breif-section')
      for (let i = 0; i < section.length; i++) {
        section[i].classList.remove('editable')
      }
      let sbtn = document.getElementById('save-' + index)
      sbtn.classList.remove('active')

      let btnEle = document.getElementById('edit-' + index)
      btnEle.classList.add('active')
      //this.saveMode = true;
      let input = document
        .getElementById('section-' + index)
        .getElementsByTagName('input')
      if (input.length > 0) {
        for (let i = 0; i < input.length; i++) {
          input[i].disabled = true
        }
      }
      let textarea = document
        .getElementById('section-' + index)
        .getElementsByTagName('textarea')
      if (textarea.length > 0) {
        for (let i = 0; i < textarea.length; i++) {
          textarea[i].disabled = true
        }
      }
      let btns = document
        .getElementById('section-' + index)
        .getElementsByClassName('add-more')
      if (btns.length > 0) {
        for (let i = 0; i < btns.length; i++) {
          btns[i].disabled = true
        }
      }
      this.submit()
    },
    async deleteFile(id, key, index) {
      console.log(id, key, index)
      if (confirm('Are you sure want to delete file permanently?')) {
        let fileresponse = await this.deleteDirectusFile(id)
        console.log(this.filesData)
        this.filesData = this.filesData.filter((file) => file.id != id)
        console.log(this.filesData)
        this.showNotification('File is deleted permanently.', 'success')
      }
    },
    async showFiles() {
      for (var i = 0; i < this.savedAnswers.length; i += 1) {
        if (
          this.savedAnswers[i]['answer'].indexOf(
            'https://admin.supersites.io/assets/'
          ) != -1
        ) {
          let file_id = this.savedAnswers[i]['answer'].split(
            'https://admin.supersites.io/assets/'
          )[1]
          //console.log(this.savedAnswers[i]['question']+' -'+file_id);
          let filesRes = await fetch(
            'https://admin.supersites.io/files/' +
              file_id +
              '/?fields=id,type,filename_download'
          )
          let file = await filesRes.json()
          //console.log(file.data)
          if (file.data) {
            this.filesData.push({
              key: i,
              id: file_id,
              name: this.savedAnswers[i]['question'],
              fileName: file.data.filename_download,
              type: file.data.type,
            })
          }
        }
      }
      //console.log(this.filesData);
    },

    radioOption: function (vals, option) {
      //console.log(vals+'-'+option)
      let key = this.findWithAttr(
        this.savedAnswers,
        'question',
        this.filterName(vals)
      )
      //console.log(key)
      if (key != '-1') {
        return this.savedAnswers[key].answer == option ? true : false
      }
      return null
    },
    checkboxOption: function (vals, option) {
      //console.log(vals+'-'+option)
      let key = this.findWithAttr(
        this.savedAnswers,
        'question',
        this.filterName(vals)
      )
      //console.log(key)
      if (key != '-1') {
        let optionArr = this.savedAnswers[key].answer.split(',')
        optionArr = optionArr.map((str) => str.trim())
        //console.log(optionArr)
        return optionArr.includes(option) ? true : false
      }
      return null
    },
    fetchValue: function (vals) {
      let key = this.findWithAttr(
        this.savedAnswers,
        'question',
        this.filterName(vals)
      )
      //console.log(key)
      if (key != '-1') {
        return this.savedAnswers[key].answer
      }
      return null
    },
    remove(id) {
      console.log('remove ' + id)
      //console.log(this.uploadInputs);
      this.uploadInputs.splice(id, 1)
    },
    findWithAttr(array, attr, value) {
      for (var i = 0; i < array.length; i += 1) {
        if (array[i][attr] === value) {
          return i
        }
      }
      return -1
    },
    validate_file() {
      var fileInput = this.$refs.upload_file
      console.log(fileInput)
      //console.log(fileInput.length);
      for (var i = 0; i < fileInput.length; i++) {
        if (fileInput[i].files && fileInput[i].files.length > 0) {
          console.log(fileInput[i].files[0].size)
          if (fileInput[i].files[0].size >= 1024000) {
            fileInput[i].value = ''
            this.showNotification(
              'File size should not exceeded more than 1 MB.',
              'error'
            )
          }
        }
      }
    },
    clone() {
      console.log('clone')
      this.uploadInputs.push({
        remove: true,
        data: [
          {
            type: 'text',
            name: 'file_name',
            className: 'form-control file-input file-name',
          },
          {
            type: 'file',
            name: 'files',
            className: 'form-control file-input file-upload',
          },
        ],
      })
      if (this.editMode) {
        setTimeout(function () {
          let _files = document.getElementsByClassName('file-input')
          //console.log(_files.length);
          if (_files.length > 0) {
            for (let i = 0; i < _files.length; i++) {
              _files[i].disabled = false
            }
          }
        }, 1000)
      }
    },
    next() {
      let activeSection = this.activeSection
      console.log('next!')
      this.$v.$touch()
      console.log(this.$v.$invalid)
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
        console.log('ERROR')
      } else {
        if (this.activeSection < this.totalSection - 1) {
          this.activeSection = this.activeSection + 1
          this.$emit('transition', activeSection + 1)
          if (this.activeSection == this.totalSection - 1) {
            this.lastSection = true
          }
        }
      }
    },
    saveDraft() {
      console.log('saveDraft section! ' + this.stepsArr[this.activeSection])
      this.$v.$touch()
      console.log(this.$v.$invalid)
      if (this.$v.$invalid) {
        return false
      }
      this.draftMessage = 'Please Wait...'
      this.submitStatus = 'PENDING'
      this.draft = true
      this.stepData = []
      if (this.activeSection == '0') {
        for (let i = 0; i < this.stepsArr.length; i++) {
          this.stepData.push({
            title: this.stepsArr[i],
            status: 'pending',
          })
        }
      } else if (this.activeSection == '1') {
        let s = ['completed', 'pending', 'pending']
        for (let i = 0; i < this.stepsArr.length; i++) {
          this.stepData.push({
            title: this.stepsArr[i],
            status: s[i],
          })
        }
      } else {
        let s = ['completed', 'completed', 'pending']
        for (let i = 0; i < this.stepsArr.length; i++) {
          this.stepData.push({
            title: this.stepsArr[i],
            status: s[i],
          })
        }
      }
      console.log(this.stepData)
      this.submit()
    },

    async submit() {
      console.log('submit!')
      this.submitStatus = 'PENDING'
      this.submitMessage = 'Please Wait...'
      //this.answers =  [];
      if (!this.draft) {
        for (let i = 0; i < this.stepsArr.length; i++) {
          this.stepData.push({
            title: this.stepsArr[i],
            status: 'completed',
          })
        }
        this.status = 'completed'
      }
      var ele = document.getElementsByClassName('question-input')
      for (var i = 0; i < ele.length; i++) {
        if (ele[i].type == 'text' || ele[i].type == 'textarea') {
          if (ele[i].value != '') {
            this.answers.push({
              newItem: true,
              question: this.filterName(ele[i].name),
              answer: ele[i].value,
            })
          }
        } else if (ele[i].type == 'radio' && ele[i].checked) {
          this.answers.push({
            newItem: true,
            question: this.filterName(ele[i].name),
            answer: ele[i].value,
          })
        } else if (ele[i].type == 'checkbox' && ele[i].checked) {
          let key = this.findWithAttr(
            this.answers,
            'question',
            this.filterName(ele[i].name)
          )
          //console.log(key);
          if (key == '-1') {
            this.answers.push({
              newItem: true,
              question: this.filterName(ele[i].name),
              answer: ele[i].value,
            })
          } else {
            this.answers[key].answer =
              this.answers[key].answer + ', ' + ele[i].value
          }
        }
      }
      if (this.filesData.length > 0) {
        //console.log('files exist')
        //console.log(this.filesData)
        var _that = this
        this.filesData.map(function (d) {
          //console.log(d.id)
          _that.answers.push({
            newItem: true,
            question: d.name,
            answer: 'https://admin.supersites.io/assets/' + d.id,
          })
        })
      }
      var fileName = document.getElementsByClassName('file-name')
      var files = document.getElementsByClassName('file-upload')

      var requests = files.length
      for (
        var i = 0;
        i < document.getElementsByClassName('file-upload').length;
        i++
      ) {
        let formData = new FormData()
        //console.log(files[i].files[0]);
        //console.log(fileName[i].value);
        let filename = fileName[i].value
        if (files[i].files.length > 0) {
          //requests++;
          formData.append('file', files[i].files[0])
          let fileresponse = await this.uploadFiles(formData)
          console.log(fileresponse)
          if (fileresponse) {
            --requests
            this.answers.push({
              newItem: true,
              question: filename,
              answer: 'https://admin.supersites.io/assets/' + fileresponse.id,
            })
          }
        } else {
          //console.log("else send")
          --requests
        }
      }
      if (requests == '0') {
        console.log('send now')
        this.sendQuestionnaire()
      }
    },
    filterName(str) {
      str = str.replace(/_/g, ' ')
      return str.charAt(0).toUpperCase() + str.slice(1)
    },
    async sendQuestionnaire() {
      console.log('form is sending...')
      //console.log(this.answers)
      //return false;
      let payload = {
        full_name: this.first_name + ' ' + this.last_name,
        email: this.email,
        phone: this.phone,
        company_name: this.company_name,
        project_name: this.project_name,
        project: this.$props.project.id,
        website_url: this.website_url,
        questions: this.answers,
        user: this.$store.state.currentUser.id,
        steps: this.stepData,
        status: this.status,
        pdf_id: this.pdf_id,
      }
      if (this.breif_id == '0') {
        var ques = await this.postItem('questionnaire_submissions', payload)
      } else {
        var ques = await this.updateItem(
          'questionnaire_submissions',
          this.breif_id,
          payload
        )
      }
      //console.log(ques)
      if (ques) {
        this.updateProjects()
        //this.showForm = false
        this.showNotification('Brief is saved.', 'success')
      } else {
        console.log(ques.response)
        this.submitStatus = null
        this.submitMessage = 'Submit'
        this.draftMessage = 'Save draft'
        this.saveMessage = 'Save'
        this.showNotification(ques.response, 'error')
      }
    },
    async updateProjects() {
      console.log('project is updating...')
      if (this.status == 'draft') {
        var payload = {
          project_name: this.project_name,
          website_brief: 'completed',
          design_customization: 'in-progress',
        }
      } else {
        var payload = {
          project_name: this.project_name,
        }
      }
      let proj = await this.updateItem(
        'projects',
        this.$props.project.id,
        payload
      )
      //console.log(proj)
      this.$router.push('/my-account/website-briefs/')
    },
  },
}
</script>

<style lang="scss" scoped>
.form-questionnaire .breif-section,
.form-questionnaire .submitBnt,
.form-questionnaire .breif-section .toggleBtn {
  display: none;
}
.form-questionnaire .breif-section.active,
.form-questionnaire .submitBnt.active,
.form-questionnaire .breif-section .toggleBtn.active {
  display: block;
}
.breif-section.showAll {
  display: block !important;
}
.upload-div {
  display: inline-flex;
}
#upload-div svg.active {
  visibility: hidden;
}
#upload-div svg,
.files-div .file-wrap svg {
  transform: rotate(45deg);
  width: 7.75vw;
  height: 3.75vw;
  cursor: pointer;
}
button.add-more {
  background: #000;
  color: #fff;
  width: 100%;
}
.breif-section input[disabled],
.breif-section textarea[disabled],
.breif-section input[type='radio'],
.breif-section input[type='checkbox'] {
  pointer-events: none;
  background: #fcfcfd 0% 0% no-repeat padding-box;
}
button.btn-grey {
  background: #ffffff 0% 0% no-repeat padding-box;
  border: 1px solid #d9dbe1;
  border-radius: 4px;
}
.files-div {
  margin-bottom: 20px;
  width: 50%;
}
.files-div .file-wrap {
  display: inline-flex;
  margin-left: 10px;
  margin-bottom: 10px;
}
button.draftBtn {
  float: left;
  margin-right: 10px;
  width: 48%;
}
.breif-section.showAll .files-div .remove {
  pointer-events: none;
  opacity: 0.5;
}
.breif-section.editable .files-div .remove {
  pointer-events: auto;
  opacity: 1;
}
</style>